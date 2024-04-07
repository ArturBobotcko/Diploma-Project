import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography } from "@mui/material";

const LoginPage = ({ onToggleForm }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = document.querySelector(".auth-form");
    try {
      const repsponse = await fetch("", {
        // php скрипт на сервере
        method: "POST",
        body: new FormData(form),
      });

      if (repsponse.ok) {
        navigate("/another-page"); // Перейти на главную страницу сайта после логина
      } else {
        // Обработка ошибки
      }
    } catch (error) {
      console.error("Ошибка при отправке запроса: ", error);
    }
  };

  return (
    <form
      action="" // php скрипт на сервере
      method="post"
      onSubmit={handleSubmit}
      className="auth-form"
    >
      <Typography
        variant="h1"
        fontSize={30}
        color={"rgba(0, 0, 0, 0.6)"}
        textAlign="center"
      >
        Авторизация
      </Typography>
      <TextField
        name="email"
        type="email"
        fullWidth={true}
        margin="normal"
        label="Email"
        variant="outlined"
        placeholder="Введите адрес вашей электронной почты"
      />
      <TextField
        name="password"
        fullWidth={true}
        margin="normal"
        label="Пароль"
        variant="outlined"
        type="password"
        placeholder="Введите ваш пароль"
      />
      <Button
        sx={{
          marginTop: 2,
          marginBottom: 2,
          width: "40%",
        }}
        variant="contained"
        onClick={handleSubmit}
        type="submit"
      >
        Войти
      </Button>
      <Typography
        variant="body1"
        color={"rgba(0, 0, 0, 0.6)"}
        textAlign="center"
      >
        У вас нет аккаунта?
        <span className="register-btn" onClick={onToggleForm}>
          Регистрация
        </span>
      </Typography>
    </form>
  );
};

export default LoginPage;
