import React, { useEffect, useState } from "react";
import "../App.css";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Modal, Box } from "@mui/material";
import { styled } from "@mui/system";
import LoginPage from "./LoginPage";

const AppContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  color: "#696b6e",
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
});

const IntroText = styled(Typography)({
  marginBottom: "30px",
});

const IntroButton = styled(Button)({
  maxWidth: "110px",
  height: "45px",
});

const StyledBoxForModal = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "white",
  boxShadow: 24,
  padding: 30,
  borderRadius: 10,
});

const MainPage = () => {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
            <IntroButton variant="contained" size="large" onClick={handleOpen}>
              Войти
            </IntroButton>
          </IntroSection>
        </IntroSectionContainer>
        <Footer />
        <Modal open={open} onClose={handleClose}>
          <StyledBoxForModal>
            <LoginPage />
          </StyledBoxForModal>
        </Modal>
        {/* TODO: Make modal window with registration and authorization
         * PS: Make registration form as a page (or mb leave it modal) */}
      </MainContainer>
    </AppContainer>
  );
};

export default MainPage;
