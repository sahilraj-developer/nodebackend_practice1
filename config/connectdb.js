const mongoose = require('mongoose');

const connectdb = async()=>{
    try{
        await mongoose.connect(`mongodb://localhost:27017/testingdatas`)

        console.log("DB connection Success")
    }catch(error){
        console.log("DB connection Failed")
        console.log("error",error.stack)
    }

}

module.exports = connectdb;