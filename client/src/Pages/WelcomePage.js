import React, { useEffect, useState } from "react";
import "../App.css";
import Footer from "../Components/Footer";
import NavbarWelcome from "../Components/NavbarWelcome";
import { useNavigate } from "react-router-dom";
import LoginPage from "./LoginPage";

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid p-0 d-flex flex-column min-vh-100">
      <NavbarWelcome />
      <div className="container-fluid bg-white text-secondary my-5" style={{ flex: "1 0 auto" }}>
        <div className="container d-flex flex-column gap-3 text-center text-md-start">
          <h1 className="display-6">
            Цифровая
            <br />
            образовательная платформа
            <br />
            «Название»
          </h1>
          <p className="lead">
            Откройте дверь в мир музыки с нашим электронным дневником.
            <br />
            Присоединяйтесь прямо сейчас!
          </p>
          <div class="d-flex flex-column flex-md-row gap-3 justify-content-center justify-content-md-start">
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#loginModal">
              Войти
            </button>
            <button type="button" className="btn btn-outline-primary" onClick={() => navigate("/register")}>
              Регистрация
            </button>
          </div>
          <LoginPage />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WelcomePage;
