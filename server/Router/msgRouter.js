const express = require('express');

const Auth = require('../middleware/auth');

const {testMessage} = require('../controller/msgController');

const messageRouter = express.Router();

messageRouter.post('/text', Auth, testMessage);


module.exports = messageRouter;