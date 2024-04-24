const express = require("express");
const app=express()
const server = require("http").createServer(app);
const {Server}=require("socket.io");
const { addUser, getUser, removeUser, getUsersInRoom } = require("./utils/user");
const io=new Server(server)

app.get("/", (req, res) => {
  res.send("server");
});
let imgURLGlobal, roomIdGlobal;
io.on("connection",(socket)=>{
  //console.log("cdbjhbdjcb");
  socket.on("userJoined",(data)=>{
    const{name,userId,roomId,host,presenter}=data;
    roomIdGlobal=roomId
    socket.join(roomId)
    //console.log(roomId);
    const users=addUser({name,userId,roomId,host,presenter,socketId:socket.id})
    //console.log(users);
    socket.emit("userIsJoined",{success:true,users});
    socket.broadcast.to(roomId).emit("userJoinedMessageBroadcasted",name)
    socket.broadcast.to(roomId).emit("allUsers",users)
      socket.broadcast.to(roomId).emit("whiteBoardDataResponse",{
       imgURL:imgURLGlobal,
      })
  });

  socket.on("whiteboardData",(data)=>{
   imgURLGlobal=data;
   socket.broadcast.to(roomIdGlobal).emit("whiteBoardDataResponse",{
    imgURL:data,
   });

  });
  //console.log(socket.id);

  socket.on("disconnect",()=>{
    const user=getUser(socket.id)
    //console.log(data);
    if(user){
      const removedUser=removeUser(socket.id)
      socket.broadcast.to(roomIdGlobal).emit("userLeftMessageBroadcasted",user.name);
      socket.broadcast.to(roomIdGlobal).emit("allUsers", getUsersInRoom(roomIdGlobal));
    }
  })

});

const PORT = 5000;
server.listen(PORT, () =>
  console.log(`server is listening on http://localhost:${PORT}`)
)