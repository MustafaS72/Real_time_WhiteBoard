import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./index.css"
const JoinRoomForm = ({uuid,socket,setuser}) => {
  const[roomId,setroomId]=useState("")
  const[name,setName]=useState("")
  const navigate=useNavigate();
  const handleRoomJoin=(e)=>{
    e.preventDefault();
    const roomData={
      name,
      roomId,
      userId:uuid(),
      host:false,
      presenter:false
    };
    setuser(roomData)
    navigate(`/${roomId}`);
    // console.log(roomData);
    socket.emit("userJoined",roomData)
  }
  return (
    <form className="form col-md-12 mt-5" >
    <div className="form-group">
       <input
       type="text"
       className="form-control my-2"
       placeholder="Enter your name"
       value={name}
       onChange={(e)=>setName(e.target.value)}
       />
    </div>
    <div className="form-group">
     <input
     type="text"
     className="form-control my-2"
     placeholder="Enter Room code"
     value={roomId}
     onChange={(e)=>setroomId(e.target.value)}
     />
    </div>
    <br/>
    <button type="submit"  className="button-85" onClick={handleRoomJoin}>
     Join Room
    </button>
   </form>
  );
}



/* CSS */




export default JoinRoomForm;
