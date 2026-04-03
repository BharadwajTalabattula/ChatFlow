const express = require('express');
const {createChat, getChat, deleteChat, getSingleChat} = require('../controller/chatController')
const auth = require('../middleware/auth');


const chatRouter = express.Router();

// create a chat
chatRouter.post('/create',auth, createChat )

// get the chat
chatRouter.get('/get',auth, getChat )

// get single chat
chatRouter.get('/get/:chatId', auth, getSingleChat);


// delete chat
chatRouter.delete('/delete',auth, deleteChat )





module.exports = chatRouter;