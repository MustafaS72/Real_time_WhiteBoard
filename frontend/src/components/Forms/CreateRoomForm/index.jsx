import React, { useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { FaCopy } from "react-icons/fa";
const CreateRoomForm = ({ uuid, socket, setuser }) => {
  const [roomId, setRoomId] = useState(uuid());
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const handleCreateRoom = (e) => {
    e.preventDefault();
    const roomData = {
      name,
      roomId,
      userId: uuid(),
      host: true,
      presenter: true,
    };
    setuser(roomData);
    navigate(`/${roomId}`);
    console.log(roomData);
    socket.emit("userJoined", roomData);
  };

  //console.log("uid", uuid());
  return (
    <form className="form col-md-12 mt-5">
      <div className="form-group">
        <input
          type="text"
          className="form-control my-4"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group border bg-gray">
        <div className="input-group d-flex align-items-center justify-content-center">
          <input
            type="text"
            value={roomId}
            className="form-control my-2 border-0 bg-white"
            disabled
            placeholder="Generate Room code"
          />
          <div className="input-group-append">
            <button className="me-2" style={{ border: "none" }} type="button">
              <FaCopy />
            </button>
          </div>
        </div>
      </div>
      <br />

      <button
        type="submit"
        onClick={handleCreateRoom}
        className="button-34 w-100"
      >
        Generate Room
      </button>
    </form>
  );
};

export default CreateRoomForm;
