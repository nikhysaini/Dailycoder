require('dotenv').config()
const express = require('express')
const app = express();

const http = require("http");                
const { Server } = require("socket.io");      

const server = http.createServer(app);        
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
        credentials: true
  }
});

const main = require('./model/db.js')
const cookieParser = require('cookie-parser')
const userrouter = require('./Routes/user.js')
const problemRouter = require('./Routes/problemroute.js')
const submitRouter = require('./Routes/submit.js')
const cors = require("cors");
const Problem = require('./model/problem')

const jwt = require('jsonwebtoken');
const redisclient = require('./model/redis.js')

app.use(express.json());
app.use(cors({origin: "http://localhost:5173",credentials: true}));
app.use(cookieParser())


app.use('/user',userrouter)
app.use('/problem',problemRouter)
app.use('/submission',submitRouter)

const leaderboard = {}; 

try{
io.on("connection", (socket) => {

  socket.on("check_room", async(roomId) => {
    const room = io.sockets.adapter.rooms.get(roomId);
    console.log(roomId,room);
    const exists = await redisclient.exists(`room:${roomId}`);
    if (room && exists) {
      socket.emit("room_exists", { exists: true });
    } else {
      socket.emit("room_exists", { exists: false });
    }
  });

  socket.on("create_room", async({ roomId , user ,problemtitle,minutes}) => {
    const now = Math.floor(Date.now() / 1000);
    const expiryTime = now + (Number(minutes) * 60);
    const getProblem = await Problem.findOne({title:problemtitle}).select('_id');
    if(getProblem){
    await redisclient.set( `room:${roomId}`,
    JSON.stringify({ starttime:Date.now(),problemId: getProblem._id,leaderboard: {}  }),
    { EXAT: expiryTime }
    );
    socket.join(roomId);
    const problemid = getProblem._id;
    socket.emit("join_results", { status:"accepted",problemid });
    }
    else{
      socket.emit("join_results", { status:"rejected"});
    }
  });
 
  socket.on("join_room", async({ roomId , user}) => {
    const data = JSON.parse(await redisclient.get(`room:${roomId}`));
    if(data){
    socket.join(roomId);
    const problemid = data.problemId;
    socket.emit("join_results", { status:"accepted",problemid });
    }
    else
      socket.emit("join_results", { status:"rejected"});
  });

  socket.on("leave_room", ({ roomId,user }) => {
  socket.leave(roomId);
  console.log(`User left ${roomId} , ${user}`);
  
  });

  socket.on("add_point", async({ roomId, user, time }) => {
  let sorted ;
  const data = JSON.parse(await redisclient.get(`room:${roomId}`));
    if(data){
    time = (Number(time) - data.starttime)/1000;
  if (!leaderboard[roomId]) leaderboard[roomId] = {};

  if(!leaderboard[roomId][user] || time < leaderboard[roomId][user]) 
       leaderboard[roomId][user] = time;
  
    sorted = Object.entries(leaderboard[roomId])
    .map(([user, time]) => ({ user, time }))
    .sort((a, b) => a.time - b.time);
    console.log(sorted);
    
   }
   io.to(roomId).emit("leaderboard_update", sorted);
  });

  socket.on("update", async({ roomId}) => {
 
  const data = JSON.parse(await redisclient.get(`room:${roomId}`));
    if(data && leaderboard[roomId]){
   const sorted = Object.entries(leaderboard[roomId])
    .map(([user, time]) => ({ user, time }))
    .sort((a, b) => a.time - b.time);
     io.to(roomId).emit("ld_update", sorted);
   }
   
  });

  // send message
  socket.on("send_message", ({ roomId, message ,user }) => {

    io.to(roomId).emit("receive_message", {
      message,
      sender: user
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });

});
}
catch(e){
  console.log(e);
}

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

  console.log(`DB connected`);

    server.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
}

run();
