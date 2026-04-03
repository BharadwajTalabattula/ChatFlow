const Chat  = require('../model/chatModel')


const createChat = async(req, res)=>{
    try{

        const userId = req.user._id
        const chatData ={
            userId,
            messages: [],
            name:"New Chat",
            userName: req.user.name, 
        }

        const chat = await Chat.create(chatData)
       return res.status(201).json({success: true, message:"Chat created successfully", chat})

    }catch(error){
        return res.status(500).json({success:false, message: error.message})

    }

}

const getChat = async (req, res)=>{
    try{
        const userId = req.user._id;
        const chats = await Chat.find({ userId }).sort({ updatedAt: -1 });
        return res.status(200).json({success:true, chats })

    }catch(error){
        return res.status(500).json({success:false, message: error.message})
    }

}

const getSingleChat = async (req, res) => {
    try {
        const userId = req.user._id;
        const { chatId } = req.params;

        const chat = await Chat.findOne({ _id: chatId, userId });

        if (!chat) {
            return res.status(404).json({
                success: false,
                message: "Chat not found"
            });
        }

        return res.status(200).json({
            success: true,
            messages: chat.messages,
            chatId: chat._id,
            name: chat.name
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteChat = async(req, res)=>{

    try{
        const userId = req.user._id;
        const { chatId } = req.body;
        await Chat.deleteOne({ _id:chatId , userId})
        return res.status(200).json({
            success: true,
           message: "Chat deleted sucessfully"
        });


    }catch(error){
        return res.status(500).json({success:false, message: error.message})
    }

}


module.exports = {createChat, getChat, deleteChat, getSingleChat}


