const {registerUser, loginUser, getUser} = require('../controller/cfController')

const auth = require('../middleware/auth');
const express = require('express');


const cfRouter = express.Router();

//registering a account
cfRouter.post('/register', registerUser)


// user login 
cfRouter.post("/login", loginUser)

// get user
cfRouter.get('/data',auth ,getUser)


module.exports = cfRouter;