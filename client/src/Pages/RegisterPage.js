import React from "react";
import { TextField, Button, Typography, MenuItem } from "@mui/material";

const RegisterPage = ({ onToggleForm }) => {
  const role = [
    {
      value: "teacher",
      label: "Я - Преподаватель",
    },
    {
      value: "student",
      label: "Я - Ученик",
    },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = document.querySelector('.auth-form');
    try {
      const repsponse = await fetch("", { // php скрипт на сервере
        method: "POST",
        body: new FormData(form)
      });
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
        Регистрация
      </Typography>
      <TextField
        name="login"
        fullWidth={true}
        margin="normal"
        label="Логин"
        variant="outlined"
        placeholder="Введите ваш логин"
      />
      <TextField
        name="email"
        fullWidth={true}
        margin="normal"
        label="Email"
        variant="outlined"
        placeholder="Введите адрес вашей электронной почты"
      />
      <TextField
        name="surname"
        fullWidth={true}
        margin="normal"
        label="Фамилия"
        variant="outlined"
        placeholder="Введите вашу фамилию"
      />
      <TextField
        name="name"
        fullWidth={true}
        margin="normal"
        label="Имя"
        variant="outlined"
        placeholder="Введите ваше имя"
      />
      <TextField
        name="patronym"
        fullWidth={true}
        margin="normal"
        label="Отчество"
        variant="outlined"
        placeholder="Введите ваше отчество (необязательно)"
      />
      <TextField
        name="roll"
        fullWidth={true}
        margin="normal"
        label="Роль"
        variant="outlined"
        select
        helperText="Выберите вашу роль"
      >
        {role.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        name="password"
        fullWidth={true}
        margin="normal"
        label="Пароль"
        variant="outlined"
        type="password"
        placeholder="Введите ваш пароль"
      />
      <TextField
        name="confirmPassword"
        fullWidth={true}
        margin="normal"
        label="Подтвердите пароль"
        variant="outlined"
        type="password"
        placeholder="Подтвердите ваш пароль"
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
        Регистрация
      </Button>
      <Typography
        variant="body1"
        color={"rgba(0, 0, 0, 0.6)"}
        textAlign="center"
      >
        У вас есть аккаунт?
        <span className="register-btn" onClick={onToggleForm}>
          Войти
        </span>
      </Typography>
    </form>
  );
};

export default RegisterPage;
