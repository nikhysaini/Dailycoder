const validator = require('validator')
const user = require('../model/user')
const Submission = require('../model/submission.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const redisclient = require('../model/redis.js')

const register = async(req,res)=>{
    try{
      
      const firstname = req.body.firstname;
      const lastname = req.body.lastname;
      const email = req.body.email;
      const password = req.body.password;
      const first = validator.isEmpty(firstname);
      const last = validator.isEmpty(lastname);
      const emai = validator.isEmail(email);
      const pass = validator.isStrongPassword(password);
      if(first || last || !emai || !pass )
        throw new Error("Type valid details")
      
      const isemailexist = await user.findOne({email:email})
      if(isemailexist) 
        throw new Error("Email already exist")
      else{
        const hash_password = await bcrypt.hash(password,10)
        await user.create({firstname:firstname,lastname:lastname,email:email,password:hash_password});
        res.status(200).send("Account created successfully");
      }
    }
    catch(e){
      res.status(404).send(e.message);
    }
}

const login = async(req,res)=>{
    try{ 
      const email = req.body.email;
      const password = req.body.password;
      const isuser = await user.findOne({email:email})
      if(isuser){
       const db_password = isuser.password;
       const auth = await bcrypt.compare(password,db_password)
       if(!auth)
         throw new Error("Password is Incorrect");
       else{ 
        const token = jwt.sign({email:isuser.email,id:isuser._id},process.env.JWT_TOKEN_KEY,{expiresIn:'7d'});
        res.cookie("token", token);
        res.json({user:{"name":isuser.firstname,"email":isuser.email,"role":isuser.role},token:token});
       }
      }
      else
        throw new Error("email not exists");
    }
    catch(e){
     res.status(404).send(e.message);
    }
}

const logout = async(req,res)=>{
    try{
     const token = req.headers.token;
     const verify = jwt.verify(token,process.env.JWT_TOKEN_KEY);
     if(token && verify)
     {
      await redisclient.set(`token:${token}`,`expire`)
      await redisclient.expireAt(`token:${token}`,verify.exp)
      res.clearCookie("token");
      res.status(200).send("Logout successfully")
     }
    }
    catch(e){
     res.status(404).send(e.message);
    }
}

const get = async(req,res)=>{
  try{
 const token = req.headers.token;
  const tokenexists = await redisclient.exists(`token:${token}`);
  if(!tokenexists)
  {
    const verify = jwt.verify(token,process.env.JWT_TOKEN_KEY)
    if(verify)
     res.status(200).send("Token verify");
    else 
      throw new Error("login please")
  }
  else
     throw new Error("login please")
  }
  catch(e){
   res.status(404).send(e.message);
  }
}

const deleteprofile = async(req,res)=>{
  try{
 const token = req.headers.token;
 const payload = jwt.verify(token,process.env.JWT_TOKEN_KEY)
 await user.findByIdAndDelete(payload.id);
 await Submission.deleteMany({userId:payload.id})

 // Logout , pushing his token in redis , so he can't login using JWT
 await redisclient.set(`token:${token}`,`expire`)
 await redisclient.expireAt(`token:${token}`,payload.exp)
 res.clearCookie("token");

 res.status(200).send("Account deleted Successfully");
  }
  catch(e){
   res.status(404).send(e.message);
  }
}
module.exports = { register,deleteprofile,login,logout,get}