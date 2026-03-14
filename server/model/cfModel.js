const mongoose = require('mongoose');

const cfSchema = new mongoose.Schema({
    name:{type: String, required:true},
    email:{type: String, required:true, unique: true},
    password:{type: String, required:true},
    credits:{type: Number, default:100}, 
  
})

const CF = mongoose.model('ChatFlow', cfSchema)

module.exports = CF;