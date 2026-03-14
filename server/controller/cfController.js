const  jwt = require('jsonwebtoken');
const CF = require('../model/cfModel');
const bcrypt = require('bcrypt');
const Chat = require('../model/chatModel')

const generateToken = (id)=>{

    return jwt.sign({id}, 'cf', {
        expiresIn: "30d"
    })

}


const registerUser = async(req, res)=>{
    const { name, email, password} = req.body;
    try{
        const isUser = await CF.findOne({email})

        if(isUser){
           return res.status(409).send({message: "User already exists"}) // check
        }

        const hashedPass = await bcrypt.hash(password, 10)

        const cfUser = await CF.create({name, email, password : hashedPass})

        await Chat.create({
            userId: cfUser._id,
            userName: cfUser.name,
            name: "New Chat",
            messages: [],

        })

        const token = generateToken(cfUser._id)

        return res.status(201).json({success: true, token});

    }catch(error){
        return res.status(500).json({message: error.message})

    }
}

const loginUser = async (req, res)=>{

    const {email, password} = req.body;

    try{

        const isUser = await CF.findOne({email})

        if(!isUser){
            return res.status(400).json({message: "Invalid email"})
        }

        const isCheck = await bcrypt.compare(password, isUser.password)

        if(!isCheck){
            return res.status(400).json({message: "Invalid password"})
        }

        const token = generateToken(isUser._id)

        return res.status(200).json({sucess: true, token })


    }catch(error){
        return res.status(500).json({message: error.message})

    }

}


const getUser = async(req, res)=>{
    try{
        const user = req.user;

        return res.status(200).json({success: true, user})
    }catch(error){
        return res.status(500).json({message: error.message})
    }
}


module.exports = {registerUser, loginUser, getUser}