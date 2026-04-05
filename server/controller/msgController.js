const Chat = require('../model/chatModel');
const CF = require('../model/cfModel');
const axios = require('axios');

require("dotenv").config();

const testMessage = async (req, res) => {
  try {
    const userId = req.user._id; // ✅ FIXED

    if (req.user.credits < 1) {
      return res.status(403).json({
        success: false,
        message: "Not enough credits"
      });
    }

    const { chatId, prompt } = req.body;


    const chat = await Chat.findOne({ _id: chatId, userId });



    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found"
      });
    }

    // ✅ Save user message
    chat.messages.push({
      role: "user",
      content: prompt,
      timestamp: Date.now(),
      isImage: false
    });



 // 🔥 Groq API
 const response = await axios.post(
  "https://api.groq.com/openai/v1/chat/completions",
  {
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 1024
  },
  {
    headers: {
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json"
    },
    timeout: 30000
  }
);

const aiText = response.data.choices?.[0]?.message?.content || "No response";
      


    const reply = {
      role: "assistant",
      content: aiText,
      timestamp: Date.now(),
      isImage: false
    };

    // ✅ Save AI reply
    chat.messages.push(reply);
    await chat.save();

    // ✅ Deduct credits
    await CF.updateOne({ _id: userId }, { $inc: { credits: -1 } });

    return res.status(200).json({
      success: true,
      reply
    });

  }  catch (error) {
    console.log("FULL ERROR:", error.response?.data || error.message || error);
    return res.status(500).json({
      success: false,
      message: error.response?.data || error.message
    });
  }
}
module.exports = { testMessage };