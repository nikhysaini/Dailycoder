const redisclient = require('../model/redis.js')
const jwt = require('jsonwebtoken')

const usermiddleware = async(req,res,next)=>{
 try{
  const token = req.headers.token;
  //const {token} = req.cookies;
  const tokenexists = await redisclient.exists(`token:${token}`);
  if(!tokenexists)
  {
    const verify = jwt.verify(token,process.env.JWT_TOKEN_KEY)
    if(verify)
     next();
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

module.exports = usermiddleware;