import React, { useState } from "react";
import "./index.css";
import Header from "./Header";
import CreateRoomForm from "./CreateRoomForm";
import JoinRoomForm from "./JoinRoomForm";
const Forms = ({ uuid, socket, setuser }) => {
  return (
    <div className="maindiv ">
      <Header />
      <div className="form-container">
        <div className="main-form-wrapper">
          <div className="form-left">
            <div
              className="col-md-4 form-box p-5 mt-2 mx-auto d-flex flex-column align-items-center"
              style={{ width: "85%" }}
            >
              <h1 className="text-primary fw bold">Create Room</h1>
              <CreateRoomForm uuid={uuid} socket={socket} setuser={setuser} />
            </div>
          </div>
          <div className="form-right">
            <div
              className="col-md-4 mt-2 form-box p-5  mx-auto d-flex flex-column align-items-center"
              style={{ width: "85%" }}
              id="forms"
            >
              <h1 className="text-white fw bold">Join Room</h1>
              <JoinRoomForm uuid={uuid} socket={socket} setuser={setuser} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forms;
