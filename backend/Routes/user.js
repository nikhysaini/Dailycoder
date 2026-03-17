const express = require('express')
const userrouter = express.Router();
const { register,deleteprofile,login,logout,get} = require('../Controller/user')
const usermiddleware = require('../Middleware/authmiddleware')
const adminMiddleware = require('../Middleware/adminMiddleware')

userrouter.post('/register',register)
userrouter.get('/delete',usermiddleware,deleteprofile)
userrouter.post('/login',login)
userrouter.get('/logout',logout)
userrouter.get('/get',usermiddleware,get)

module.exports = userrouter 
