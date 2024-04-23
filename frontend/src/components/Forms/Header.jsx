import React from "react";
import "./header.css";
import logo from "../../assets/images/logo2.jpg";
const Header = () => {
  return (
    <div className="header-container">
      <div className="header-logo">
        <img src={logo} alt="logo" width={130} />
      </div>
    </div>
  );
};
export default Header;
