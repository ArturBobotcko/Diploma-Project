import React from "react";
import logo from "../Assets/logo.svg";

const NavbarComponent = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <div className="container">
        <a className="navbar-brand" href="/">
          <img src={logo} width="55" />
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end">
          <div className="navbar-nav">
            <a className="nav-link fs-5" href="#">О нас</a>
            <a className="nav-link fs-5 ms-4" href="#">Возможности</a>
            <a className="nav-link fs-5 ms-4" href="#">Новости</a>
            <a className="nav-link fs-5 ms-4" href="#">Контакты</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
