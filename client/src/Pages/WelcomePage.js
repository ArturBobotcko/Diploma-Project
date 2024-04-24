import React, { useEffect, useState } from "react";
import "../App.css";
import Footer from "../Components/Footer";
import Navbar from "../Components/NavbarComponent";
import { useNavigate, useLocation } from "react-router-dom";
import LoginPage from "./LoginPage";
import { Button, Col, Container, Row } from "react-bootstrap";
import NavbarComponent from "../Components/NavbarComponent";

const MainPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(location.pathname === "/login");

  useEffect(() => {
    setOpen(location.pathname === "/login");
  }, [location.pathname]);

  useEffect(() => {
    const loginModal = document.getElementById('loginModal');
    const handleModalHidden = (event) => {
      handleClose();
    };
    loginModal.addEventListener('hidden.bs.modal', handleModalHidden);
    return () => {
      loginModal.removeEventListener('hidden.bs.modal', handleModalHidden);
    };
  }, []);

  const handleOpen = () => {
    setOpen(true);
    navigate("/login");
  };

  const handleClose = () => {
    setOpen(false);
    navigate("/");
  };

  return (
    <div className="container-fluid p-0 d-flex flex-column min-vh-100">
      <NavbarComponent />
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
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#loginModal" onClick={handleOpen}>
              Войти
            </button>
            <button type="button" className="btn btn-outline-primary" onClick={() => navigate("/register")}>
              Регистрация
            </button>
          </div>
          <div className="modal fade" id="loginModal" aria-labelledby="loginModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-fullscreen-md-down">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="loginModalLabel">
                    Авторизация
                  </h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <LoginPage />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;
