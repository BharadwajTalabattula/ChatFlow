const express = require('express');
const {createChat, getChat, deleteChat} = require('../controller/chatController')
const auth = require('../middleware/auth');


const chatRouter = express.Router();

// create a chat
chatRouter.post('/create',auth, createChat )

// get the chat
chatRouter.get('/get',auth, getChat )


// delete chat
chatRouter.delete('/delete',auth, deleteChat )





module.exports = chatRouter;