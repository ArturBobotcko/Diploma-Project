import React, { useEffect, useState } from "react";
import "../App.css";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Typography, Modal, Box, Container } from "@mui/material";
import { styled } from "@mui/system";
import LoginPage from "./LoginPage";

const AppContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  color: "#696b6e",
  backgroundColor: "#f3f4f6",
});

const MainContainer = styled("div")({
  color: "#696b6e",
  flex: "1",
});

const IntroSectionContainer = styled("div")({
  display: "flex",
  marginLeft: "10%",
  marginRight: "10%",
  justifyContent: "space-between",
});

const IntroSection = styled("div")({
  display: "flex",
  flexDirection: "column",
  marginTop: "140px",
});

const IntroText = styled(Typography)({
  marginBottom: "30px",
});

const IntroLoginButton = styled(Button)({
  maxWidth: "110px",
  height: "45px",
});

const IntroRegisterButton = styled(Button)({
  // maxWidth: "110px",
  height: "45px",
});

const StyledBoxForModal = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "552px",
  backgroundColor: "white",
  boxShadow: 24,
  padding: 30,
  borderRadius: 10,
});

const MainPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(location.pathname === "/login");

  useEffect(() => {
    setOpen(location.pathname === "/login");
  }, [location.pathname]);

  const handleOpen = () => {
    setOpen(true);
    navigate("/login");
  };

  const handleClose = () => {
    setOpen(false);
    navigate("/");
  };

  return (
    <AppContainer>
      <MainContainer>
        <Navbar />
        <IntroSectionContainer>
          <IntroSection>
            <IntroText variant="h1" sx={{ fontSize: "40px" }}>
              Цифровая
              <br />
              образовательная платформа
              <br />
              «Название»
            </IntroText>
            <IntroText variant="subtitle1" sx={{ fontSize: "20px" }}>
              Откройте дверь в мир музыки с нашим электронным дневником.
              <br />
              Присоединяйтесь прямо сейчас!
            </IntroText>
            <Container
              sx={{
                "@media (min-width: 600px)": {
                  padding: 0,
                },
              }}
            >
              <IntroLoginButton
                variant="contained"
                size="large"
                onClick={handleOpen}
                sx={{
                  marginRight: 2,
                }}
              >
                Войти
              </IntroLoginButton>
              <IntroRegisterButton
                variant="outlined"
                size="large"
                onClick={() => {
                  navigate("/register");
                }}
              >
                Регистрация
              </IntroRegisterButton>
            </Container>
          </IntroSection>
        </IntroSectionContainer>
        <Footer />
        <Modal open={open} onClose={handleClose}>
          <StyledBoxForModal>
            <LoginPage />
          </StyledBoxForModal>
        </Modal>
      </MainContainer>
    </AppContainer>
  );
};

export default MainPage;
