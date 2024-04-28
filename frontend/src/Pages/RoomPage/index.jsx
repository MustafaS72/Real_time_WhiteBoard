import "./index.css";
import React, { useState, useRef, useEffect } from "react";
import Whiteboard from "../../components/Whiteboard";
import Chat from "../../components/ChatBar";
import Header from "../../components/Forms/Header";
import Users from "../../components/allUser/Users";

const RoomPage = ({ user, socket, users }) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const [tool, setTool] = useState("pencil");
  const [color, setColor] = useState("#000000");
  const [elements, setElements] = useState([]);
  const [history, setHistory] = useState([]);
  const [openedUserTab, setOpenedUserTab] = useState(false);
  const [openedChatTab, setOpenedChatTab] = useState(false);

  useEffect(() => {
    return () => {
      socket.emit("userLeft", user);
    };
  }, []);

  const undo = () => {
    setHistory((prevHistory) => [
      ...prevHistory,
      elements[elements.length - 1],
    ]);
    setElements((prevElements) =>
      prevElements.slice(0, prevElements.length - 1)
    );
  };

  const redo = () => {
    setElements((prevElements) => [
      ...prevElements,
      history[history.length - 1],
    ]);
    setHistory((prevHistory) => prevHistory.slice(0, prevHistory.length - 1));
  };
  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillRect = "white";
    ctxRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    setElements([]);
  };
  return (
    <div className="row">
      {/* <button type="button" className="button-35"
     style={{
      display:"block",
      position:"absolute",
      top:"5%",
      left:"5%",
      height:"40px",
      width:"100px",
      padding:"1px"
     }}
    onClick={()=>setOpenedUserTab(true)}
    >Users</button> */}
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          position: "absolute",
          top: "3%",
        }}
      >
        <div>
          <button
            className="button-35"
            type="button"
            style={{
              height: "40px",
              width: "100px",
              padding: "1px",
              margin: "10px",
            }}
            onClick={() => setOpenedUserTab(true)}
          >
            Users
          </button>

          <button
            className="button-35"
            type="button"
            style={{
              height: "40px",
              width: "100px",
              padding: "1px",
            }}
            onClick={() => setOpenedChatTab(true)}
          >
            Chats
          </button>
        </div>
      </div>

      {openedUserTab && (
        <Users users={users} setOpenedUserTab={setOpenedUserTab} user={user}/>
      )}

      {openedChatTab && (
        <Chat setOpenedChatTab={setOpenedChatTab} socket={socket} />
      )}
      {/* <h1 className="text-center py-4 ">CollaborateBoard <span className="text-primary">[Users Online:{users.length}]</span></h1> */}

      {user && user.presenter && (
        <div className="col-md-9 mx-auto px-5 mb-3 d-flex align-items-center justify-content-around">
          <div className="d-flex col-md-2 justify-content-center gap-1">
            <div className="d-flex gap-1">
              <label htmlFor="pencil">Pencil</label>
              <input
                type="radio"
                name="tool"
                value="pencil"
                id="pencil"
                checked={tool === "pencil"}
                onChange={(e) => setTool(e.target.value)}
              />
            </div>

            <div className="d-flex gap-1">
              <label htmlFor="line">Line</label>
              <input
                type="radio"
                name="tool"
                value="line"
                id="line"
                checked={tool === "line"}
                onChange={(e) => setTool(e.target.value)}
              />
            </div>

            <div className="d-flex gap-1">
              <label htmlFor="rect">Rectangle</label>
              <input
                type="radio"
                name="tool"
                value="rect"
                id="rect"
                checked={tool === "rect"}
                onChange={(e) => setTool(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-2 mx-auto">
            <div className="d-flex align-items-center justify-content-center">
              <label htmlFor="color">Select Color:</label>
              <input
                type="color"
                id="color"
                className="mt-1 ms-3"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
          </div>

          <div className="col-md-3 d-flex gap-2">
            <button
              className="btn btn-primary mt-1"
              disabled={elements.length === 0}
              onClick={() => undo()}
            >
              Undo
            </button>
            <button
              className="btn btn-outline-primary mt-1"
              disabled={history.length < 1}
              onClick={() => redo()}
            >
              Redo
            </button>
          </div>

          <div className="col-md-2">
            <button className="btn btn-danger" onClick={handleClearCanvas}>
              Clear Canvas
            </button>
          </div>
        </div>
      )}

      <div className="col-md-9 mx-auto mt-3 canvas-box">
        <Whiteboard
          canvasRef={canvasRef}
          ctxRef={ctxRef}
          elements={elements}
          setElements={setElements}
          tool={tool}
          color={color}
          user={user}
          socket={socket}
        />
      </div>
    </div>
  );
};
export default RoomPage;

/* CSS */
