import React from "react";
import logo from "../Assets/logo.svg";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="nav-logo-container">
        <a href="">
          <img src={logo} alt="" />
        </a>
      </div>
      <div className="nav-links-container">
        <a href="">О нас</a>
        <a href="">Возможности</a>
        <a href="">Новости</a>
        <a href="">Контакты</a>
      </div>
    </div>
  );
};

export default Navbar;
