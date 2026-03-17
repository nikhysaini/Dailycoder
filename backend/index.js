require('dotenv').config()
const express = require('express')
const app = express();
const main = require('./model/db.js')
const cookieParser = require('cookie-parser')
const userrouter = require('./Routes/user.js')
const problemRouter = require('./Routes/problemroute.js')
const submitRouter = require('./Routes/submit.js')
const cors = require("cors");

const jwt = require('jsonwebtoken');
const redisclient = require('./model/redis.js')

app.use(express.json());
app.use(cors({origin: "http://localhost:5173",credentials: true}));// To share data from website safely
app.use(cookieParser())

app.use('/user',userrouter)
app.use('/problem',problemRouter)
app.use('/submission',submitRouter)

async function run(){
main();

  try {
    redisclient.on("error", (err) => {
  console.log("Redis Error:", err);
   });
    await redisclient.connect();
    console.log("Redis connected");
  } catch (error) {
    console.log("Connection failed:", error);
  }
console.log(`DB connected`)
app.listen(process.env.PORT,()=>{
    console.log(process.env.PORT);
})
}

run();
