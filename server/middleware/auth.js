const JWT = require('jsonwebtoken');
const CF = require('../model/cfModel');

const auth = async(req, res, next)=>{
    try{
        const token = req.headers.authorization?.split(" ")[1]

        if(!token){
            return  res.status(400).json({message: "Provide token"})
        }

        let payload = JWT.verify(token, 'cf')

        const userId = payload.id;

        const isUser = await CF.findById(userId)

        if(!isUser){
            return  res.status(400).json({message: "Not authorized, user not found"})
        }

        req.user = isUser
        next();

    }catch(error){
        return res.status(500).json({message: error.message})
    }

}

module.exports = auth;