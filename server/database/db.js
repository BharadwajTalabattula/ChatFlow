const mongoose = require('mongoose');

const connectDB = async()=>{
    try{
        await mongoose.connect('mongodb+srv://bharadwajtalabattula_db_user:SUPAF8braTqGDqeg@cluster0.ksn2tas.mongodb.net/ChatFlow')
        console.log("DB connected")

    }catch(error){
        console.log('DB not connected')

    }

}

module.exports = connectDB