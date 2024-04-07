import React, { useState } from "react";
import { TextField, Button, Typography, MenuItem } from "@mui/material";

const RegisterPage = ({ onToggleForm }) => {
  const [email, setEmail] = useState("");
  const [surname, setSurname] = useState("");
  const [name, setName] = useState("");
  const [patronym, setPatronym] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [surnameError, setSurnameError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [roleError, setRoleError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const roles = [
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

    if (!email || !surname || !name || !role || !password || !confirmPassword) {
      // Если одно из обязательных полей пустое, устанавливаем соответствующее состояние ошибки
      setEmailError(!email);
      setSurnameError(!surname);
      setNameError(!name);
      setRoleError(!role);
      setPasswordError(!password);
      setConfirmPasswordError(!confirmPassword);
      return; // Останавливаем процесс отправки формы
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      return;
    }

    setEmailError(false);
    setSurnameError(false);
    setNameError(false);
    setPasswordError(false);
    setConfirmPasswordError(false);

    let user = {email, surname, name, patronym, role, password};
  };

  return (
    <form
      action="" // php скрипт на сервере
      method="post"
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
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth={true}
        margin="normal"
        label="Email"
        variant="outlined"
        placeholder="Введите адрес вашей электронной почты"
        required
        error={emailError}
      />
      <TextField
        name="surname"
        type="text"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
        fullWidth={true}
        margin="normal"
        label="Фамилия"
        variant="outlined"
        placeholder="Введите вашу фамилию"
        required
        error={surnameError}
      />
      <TextField
        name="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth={true}
        margin="normal"
        label="Имя"
        variant="outlined"
        placeholder="Введите ваше имя"
        required
        error={nameError}
      />
      <TextField
        name="patronym"
        type="text"
        value={patronym}
        onChange={(e) => setPatronym(e.target.value)}
        fullWidth={true}
        margin="normal"
        label="Отчество"
        variant="outlined"
        placeholder="Введите ваше отчество (необязательно)"
      />
      <TextField
        name="role"
        type=""
        value={role}
        onChange={(e) => setRole(e.target.value)}
        fullWidth={true}
        margin="normal"
        label="Роль"
        variant="outlined"
        select
        helperText="Выберите вашу роль"
        required
        error={roleError}
      >
        {roles.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth={true}
        margin="normal"
        label="Пароль"
        variant="outlined"
        placeholder="Введите ваш пароль"
        required
        error={passwordError}
      />
      <TextField
        name="confirmPassword"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth={true}
        margin="normal"
        label="Подтвердите пароль"
        variant="outlined"
        placeholder="Подтвердите ваш пароль"
        required
        error={confirmPasswordError}
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
