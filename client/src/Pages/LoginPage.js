import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";

const LoginPage = ({ onToggleForm }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (event) => {
    // Обработка входа
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <Typography
        variant="h1"
        fontSize={30}
        color={"rgba(0, 0, 0, 0.6)"}
        textAlign="center"
      >
        Авторизация
      </Typography>
      <TextField
        fullWidth={true}
        margin="normal"
        label="Логин"
        variant="outlined"
        placeholder="Введите ваш логин"
      />
      <TextField
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
