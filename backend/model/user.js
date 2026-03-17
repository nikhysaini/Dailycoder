const mongoose = require('mongoose')

const userschema = new mongoose.Schema({
   firstname:{
    type:String, required:true, minLength:3, maxLength:20
   },
   lastname:{
     type:String, required:true, minLength:3, maxLength:20
   },
   email:{
    type:String, required:true,unique:true, minLength:3, maxLength:50
   },
   password:{
     type : String,required:true
   },
   age:{
    type : Number,min:5, max:80
   },
   role:{
     type : String,enum:['user','admin'],default:'user'
   },
   problemsolved:{
     type : [String]
   }
  },{
   timestamps:true
})

const user = mongoose.model('user',userschema);
module.exports = user;