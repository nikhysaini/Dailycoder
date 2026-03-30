const express = require('express')
const userrouter = express.Router();
const { register,deleteprofile,login,logout,editprofile,getprofile} = require('../Controller/user')
const usermiddleware = require('../Middleware/authmiddleware')
const adminMiddleware = require('../Middleware/adminMiddleware')

userrouter.post('/register',register)
userrouter.get('/delete',usermiddleware,deleteprofile)
userrouter.post('/login',login)
userrouter.get('/getprofile',getprofile)
userrouter.get('/logout',logout)
userrouter.post('/editprofile',editprofile)

module.exports = userrouter 
