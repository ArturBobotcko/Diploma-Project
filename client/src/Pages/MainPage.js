import React, { useState } from "react";
import "../App.css";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Button from "../Components/Button";
import ModalLogin from "../Components/ModalLogin";
import RegisterModal from "../Components/RegisterModal";

const MainPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoginForm, setLoginForm] = useState(true);

  function authorize() {
    setModalOpen(true);
    setLoginForm(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  function toggleForm() {
    setLoginForm((prev) => !prev);
  }

  return (
    <div className="app-container">
      <div className="main-container">
        <Navbar />
        <div className="intro-section-container">
          <h1>
            Цифровая
            <br />
            образовательная платформа
            <br />
            “Название не придумал”
          </h1>
          <p>
            Откройте дверь в мир музыки с нашим электронным дневником.
            <br />
            Присоединяйтесь прямо сейчас!
          </p>
          <div className="intro-buttons-container">
            <Button color="button-primary" label="Войти" onClick={authorize} />
            <Button color="button-outlined" label="Подключить школу" />
          </div>
        </div>
        {isModalOpen &&
          (isLoginForm ? (
            <ModalLogin onToggleForm={toggleForm} onClose={closeModal} />
          ) : (
            <RegisterModal onToggleForm={toggleForm} onClose={closeModal} />
          ))
        }
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;
