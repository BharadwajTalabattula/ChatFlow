const Chat = require('../model/chatModel')
const CF = require('../model/cfModel');
const openai = require('../database/openai')


const testMessage = async (req, res) => {
    try {

        const userId = req.user._id;
        if (req.user.credits < 1) {
            return res.status(403).json({ success: false, message: "Not enough credits" })
        }

        const { chatId, prompt } = req.body;

        const chat = await Chat.findOne({ _id: chatId, userId })

        if (!chat) {
            return res.status(404).json({ success: false, message: "Chat not found" });
        }


        chat.messages.push({
            role: "user",
            content: prompt,
            timestamp: Date.now(),
            isImage: false
        })


        const response = await openai.chat.completions.create({
            model: "gemini-3-flash-preview",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });



        const reply = {
            ...response.choices[0].message,
            timestamp: Date.now(),
            isImage: false,


        }


        chat.messages.push(reply)
        await chat.save();

        await CF.updateOne({ _id: userId }, { $inc: { credits: -1 } });

        return res.status(200).json({
            success: true,
            reply: chat.messages[chat.messages.length - 1]
        });



    } catch (error) {

        return res.status(500).json({ success: false, message: error.message })


    }

}



module.exports = { testMessage }