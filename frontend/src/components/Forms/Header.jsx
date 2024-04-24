import React from "react";
import "./header.css";
import logo from "../../assets/images/logo7.png";
const Header = () => {
  return (
    <div className="header-container">
      <div className="header-logo">
        <img src={logo} alt="logo" width={170} />
      </div>
      <div className="heading">CollaborativeBoard</div>
    </div>
  );
};
export default Header;
