import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
  };

  return (
    <form>
      <div className="form-group mb-3 text-start">
        <label className="mb-1">Email</label>
        <input type="email" className="form-control" placeholder="Введите ваш адрес электронной почты"></input>
      </div>
      <div className="form-group mb-3 text-start">
        <label className="mb-1">Пароль</label>
        <input type="password" className="form-control" placeholder="Введите ваш пароль"></input>
      </div>
      <div className="container-fluid p-0 d-flex flex-row align-items-center">
        <div className="form-check text-start me-auto">
          <input type="checkbox" className="form-check-input">
          </input>
          <label className="form-check-label">Запомнить меня</label>
        </div>
        <p className="m-0"><a class="link-opacity-75-hover" href="#">Забыли пароль?</a></p>
      </div>
    </form>

  );
};

export default LoginPage;
