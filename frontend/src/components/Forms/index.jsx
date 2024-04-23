import React, { useState } from "react";
import "./index.css";
import Header from "./Header";
import CreateRoomForm from "./CreateRoomForm";

const Forms = ({ uuid, socket, setUser }) => {
  const [activeTab, setActiveTab] = useState("login");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="maindiv ">
      <Header />
      <div className="form-container">
        <div className="main-form-wrapper">
          <div className="form-left">
            <div
              className="col-md-4 form-box p-5 mx-auto d-flex flex-column align-items-center" style={{width: '85%'}}
            >
              <h1 className="text-primary fw bold">Create Room</h1>
              <CreateRoomForm uuid={uuid} socket={socket} setuser={setUser} />
            </div>
          </div>
          <div className="form-right"></div>
        </div>
      </div>
    </div>
  );
};

export default Forms;
