const User = require('../model/user.model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


exports.getalldata=(req,res)=>{
    res.send({message:"Messages from get all data api"})
}

exports.register=async(req,res)=>{
const {name,email,password,password_confirmation} = req.body;

const data = await User.findOne({email});
if(data){
    res.send({message:"user already Existed"})
}else{
   if(name&& email && password && password_confirmation){
    if(password == password_confirmation){
        try{

            const salt =await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password,salt)
            const doc = new User({
                name:name,
                email:email,
                password:hashPassword
            })

            await doc.save();

            const saved_user = User.findOne({email});

            const token = jwt.sign({userID:saved_user?._id},process.env.JWT_SECRET,{expiresIn:'5d'})

            res.send({message:'User Created',token:token,status:'success',statusCode:201})

        }catch(error){
            console.log(error.stack)
            res.send({message:error.message})
        }

    }else{
        res.send({message:"Password And Confirm Password Not Matched"})
    }

   }else{
    res.send({message:"All Fields Are Required"})
   }
}
}