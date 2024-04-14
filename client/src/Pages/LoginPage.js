import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Link,
  Container,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <form
      action="" // php скрипт на сервере
      method="post"
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography
        variant="h2"
        fontSize={30}
        color={"#696b6e"}
        textAlign="center"
        fontFamily="inherit"
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
        type={showPassword ? "text" : "password"}
        placeholder="Введите ваш пароль"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={togglePasswordVisibility} edge="end">
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Container
        sx={{
          padding: 0,
          "@media (min-width: 600px)": {
            padding: "0",
          },
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <FormControlLabel
          control={<Checkbox />}
          label="Запомнить меня"
          sx={{
            "& .MuiTypography-root": {
              fontFamily: '"News Cycle", sans-serif',
              color: "#696b6e",
            },
          }}
        />
        <Link
          component={RouterLink}
          to="/forgot-password"
          underline="hover"
          sx={{ alignSelf: "center", paddingBottom: "5px" }}
        >
          Забыли пароль?
        </Link>
      </Container>
      <Button
        sx={{
          marginTop: 1,
          marginBottom: 1,
          width: "100%",
          maxWidth: "220px",
          alignSelf: "center",
          justifySelf: "center",
        }}
        variant="contained"
        onClick={handleSubmit}
        type="submit"
      >
        Войти
      </Button>
      <Typography
        variant="body1"
        color={"#696b6e"}
        textAlign="center"
        sx={{
          font: "inherit",
        }}
      >
        У вас нет аккаунта?{" "}
        <Link component={RouterLink} to="/register" underline="hover">
          Регистрация
        </Link>
      </Typography>
    </form>
  );
};

export default LoginPage;
