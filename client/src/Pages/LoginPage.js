import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const API_URL = "http://localhost:8000/api/login";
      const response = await axios.post(API_URL, {
        email: email,
        password: password,
      });
      console.log(response.data);
      Cookies.set("token", response.data.token);
      navigate("/home");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrors(error.response.data.errors);
      }
    }
  };

  const handleInputClick = () => {
    setErrors({});
  };

  return (
    <div
      className="modal fade"
      id="loginModal"
      aria-labelledby="loginModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-fullscreen-md-down">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="loginModalLabel">
              Авторизация
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3 text-start">
                <label className="mb-1">Email</label>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  onClick={handleInputClick}
                  value={email}
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  placeholder="Введите ваш адрес электронной почты"
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email[0]}</div>
                )}
              </div>
              <div className="form-group mb-3 text-start">
                <label className="mb-1">Пароль</label>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  onClick={handleInputClick}
                  value={password}
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  placeholder="Введите ваш пароль"
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email[0]}</div>
                )}
              </div>
              <div className="container-fluid p-0 d-flex flex-row align-items-center mb-3">
                <div className="form-check text-start me-auto">
                  <input type="checkbox" className="form-check-input"></input>
                  <label className="form-check-label">Запомнить меня</label>
                </div>
                <p className="m-0">
                  <a class="link-opacity-75-hover" href="#">
                    Забыли пароль?
                  </a>
                </p>
              </div>
              <button type="submit" className="btn btn-primary d-flex ms-auto">
                Войти
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
