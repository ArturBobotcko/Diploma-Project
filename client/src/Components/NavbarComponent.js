import React from "react";
import logo from "../Assets/logo.svg";

const NavbarComponent = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <div className="container">
        <a className="navbar-brand" href="/">
          <img src={logo} width="36" />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <div className="navbar-nav text-end">
            <a className="nav-link" href="#">О нас</a>
            <a className="nav-link" href="#">Возможности</a>
            <a className="nav-link" href="#">Новости</a>
            <a className="nav-link" href="#">Контакты</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
