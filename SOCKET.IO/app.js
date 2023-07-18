const express=require("express");
const { Server }=require("socket.io");
const app=express();
const http=require("http");
const cors=require("cors");
require("dotenv").config();
const PORT=process.env.PORT;
app.use(cors());

const server=http.createServer(app);

const io=new Server(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"],
    },
});

var activeUsers=[];

io.on("connection",(socket)=>{
    console.log("User Connected",socket.id);
    
    console.log("User"+socket.id+"Connected");
    //add new online user
    socket.on("new-user",(data)=>{
        if(!activeUsers.some((user)=>user.id_user===data.id_user)){
            activeUsers.push({
                id_user:data.id_user,
                username:data.username,
                socketId:socket.id,
            })
        }
        io.emit("get-users",activeUsers)
    })
    //user disconnected 
    socket.on("disconnect",()=>{
        activeUsers=activeUsers.filter((user)=>user.socketId!==socket.id);
        io.emit("get-users",activeUsers);
        console.log('User Disconnected', socket.id);
    })

    //Join room
    socket.on('join_room',(data)=>{
        socket.join(data);
        console.log("User with Id "+socket.id+" joinded room "+data);
    })
    //Send Price
    socket.on("send_price",(data)=>{
        socket.to(data.room).emit("receive_price",data);
    });
    //Send Message
    socket.on("send_message",(data)=>{
        socket.to(data.room).emit("receive_message",data);
    });
      
});

server.listen(PORT,()=>{
    console.log("SERVER IS RUNNING ON PORT "+PORT);
})