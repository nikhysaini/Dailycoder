const jwt = require('jsonwebtoken')
const user = require('../model/user')


const adminMiddleware = async(req,res,next)=>{
 try{
  const token = req.headers.token;
  if(token)
  {
    const verify = jwt.verify(token,process.env.JWT_TOKEN_KEY)
    const email = verify.email;
    const isuser = await user.findOne({email:email})
    const role = isuser.role;
    console.log(role);
    if(role===admin)
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

module.exports = adminMiddleware;