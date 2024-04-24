import React, { useState,useEffect } from 'react';
import Forms from './components/Forms';
import {Route,Routes} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import io from "socket.io-client"
import RoomPage from './Pages/RoomPage';

const server="http://localhost:5000";
const connectionOptions={
  "force new connection":true,
  reconnectionAttempts:"Infinity",
  timeout:10000,
  transports:["websocket"],
}
const socket=io(server,connectionOptions)
const App = () => {
   const[user,setuser]=useState(null);
   const[users,setUsers]=useState([])
   useEffect(()=>{

    socket.on("userIsJoined",(data)=>{
      if(data.success){
        console.log("userJoined");
        setUsers(data.users)
      }
      else{
        console.log("userJoined error");
      }
    });
    socket.on("allUsers",data=>{
      setUsers(data)
    })

   socket.on("userJoinedMessageBroadcasted",(data)=>{
    //console.log(object);
    toast.info(`${data} joined room`)
   })
   
   socket.on("userLeftMessageBroadcasted",(data)=>{
    console.log(`${data} left the room`);
    toast.info(`${data} left the room`); 
   });
    
   socket.on("allUsers", (users) => {
    // Update user data UI or perform necessary actions
    setUsers(users)
  });

  

   },[]);

   
  const uuid = () => {
    var S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      S4() +
      S4()
    );
  };
 
  return (
    <div className="appcompo" >
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Forms uuid={uuid} socket={socket} setuser={setuser}/>}/>
        <Route path="/:roomId" element={<RoomPage user={user} socket={socket} users={users}/>}/>
      </Routes>
    </div>
  );
}

export default App;
