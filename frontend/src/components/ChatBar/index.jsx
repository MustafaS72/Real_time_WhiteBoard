import { useEffect, useRef, useState } from "react";

const Chat = ({setOpenedChatTab,socket}) => {
  const[chat,setChat]=useState([])
  const [message,setMessage]=useState("");


  useEffect(()=>{
    socket.on("messageResponsesent",(data)=>{
      //alert("jisna mess bheja uska nmae")
     // console.log("jisna mess bheja uska nmae",data.name)
      setChat((prevChats)=>[...prevChats,data]);
      //console.log(chat);
    })
  },[])

  const handlesubmit=(e)=>{
    // alert("yha agya he")
    e.preventDefault();
    if(message.trim()!== ""){
      // alert("2 tak aya")
      console.log(message);
      setChat((prevChats)=>[...prevChats,{message,name:"You"}])
      socket.emit("message",{message})
      setMessage("")
      //console.log(message);
      
      //setChat((prevChats)=>[...prevChats,{message,name:"You"}])
    }
    
  }
  return (
    <div
        className="position-fixed top-5 h-100 text-white bg-dark mr-10 rounded-top"
        style={{width:"250px",left:"0%"}}
        >
          <button type="button" className="btn btn-light btn-block w-100 mt-5" onClick={()=>setOpenedChatTab(false)}>Close</button>
          <div className="w-90 mt-5 p-2 border border-1 border-white rounded-3" style={{height:"70%"}}>
          {
            chat.map((msg, index) => {
              return (
                <p key={index * 999} className="my-2 text-center w-100 py-2 border border-left-0 border-right-0">
                  {msg.name}: {msg.message}
                </p>
              );
            })
          }
          </div  >
         <form  onSubmit={handlesubmit} className="w-90 mt-4 d-flex rounded-3">
         <input type="text" placeholder="Enter message" className="h-100 border-0 rounded-0 py-2 px-4"
         style={{
          width:"90%",
         }}
           value={message}
           onChange={(e)=>setMessage(e.target.value)}
         />
         <button type="submit" className="btn btn-success rounded-0">
          Send
         </button>
         </form>
     </div>
  );
}

export default Chat;
