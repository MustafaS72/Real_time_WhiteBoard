import { memo, useEffect, useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { LuSend } from "react-icons/lu";

const Chat = ({ setOpenedChatTab, socket }) => {
  const [chat, setChat] = useState(() => {
    const storedChat = sessionStorage.getItem("chat");
    return storedChat ? JSON.parse(storedChat) : [];
  });
   const [message, setMessage] = useState("");
  // console.log("local storage", localStorage.getItem("chats"));
  // console.log("chat", chat);
  



  
 //console.log("Chat component");
  useEffect(() => {
    socket.on("messageResponsesent", (data) => {
      //alert("jisna mess bheja uska nmae")
      // console.log("jisna mess bheja uska nmae",data.name)
      setChat((prevChats) => [...prevChats, data]);
      //console.log(chat);
    });
  }, []);

  useEffect(() => {
    sessionStorage.setItem("chat", JSON.stringify(chat));
  }, [chat]);

  const handlesubmit = (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      setChat((prevChats) => [...prevChats, { message, name: "You" }]); // Update chat state
      socket.emit("message",{message})
      setMessage(""); // Clear message input
    }
  };

  
  return (
    <div
      className="position-fixed top-5 h-100 text-white bg-dark mr-10 rounded-top"
      style={{ width: "320px", right: "0%" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          marginTop: "15px",
        }}
      >
        <div>
          <h5>Group Chats</h5>
        </div>
        <div>
          <IoCloseSharp
            onClick={() => setOpenedChatTab(false)}
            style={{ fontSize: "24px", cursor: "pointer" }}
          />
        </div>
      </div>

      <div
        className="w-90 mt-2 p-2  rounded-3"
        style={{ height: "85%", overflowY: "scroll" }}
      >
        {chat.map((msg, index) => {
          return (
            <div
              style={{
                display: "flex",
                textAlign: msg.name == "You" ? "right" : "left",
                width: "100%",
                padding: "0 5px",
              }}
              key={index}
            >
              <p className={`my-2 w-100 py-2`} style={{}}>
                <h5>{msg.name}</h5>
                {msg.message}
              </p>
            </div>
          );
        })}
      </div>
      <form onSubmit={handlesubmit} className="w-90 mt-4 d-flex rounded-3">
        <input
          type="text"
          placeholder="Enter message"
          className="h-100 border-0 rounded-0 py-2 px-4"
          style={{
            width: "90%",
          }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="btn btn-primary rounded-0">
          <LuSend />
        </button>
      </form>
    </div>
  );
};

export default Chat;
