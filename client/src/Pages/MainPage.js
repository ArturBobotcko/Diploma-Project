import React, { useEffect, useState } from "react";
import "../App.css";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import ModalLogin from "../Components/ModalLogin";
import RegisterModal from "../Components/RegisterModal";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { styled } from "@mui/system";

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
  height: "45px"
});

const MainPage = () => {
  const navigate = useNavigate();

  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoginForm, setLoginForm] = useState(true);

  useEffect(() => {
    if (isModalOpen) {
      navigate(isLoginForm ? "/login" : "/register", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }, [isModalOpen, isLoginForm]);

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
    // <div className="app-container">
    //   <div className="main-container">
    //     <Navbar />
    //     <div className="intro-section-container">
    //       <Typography variant="h1">
    //         Цифровая
    //         <br />
    //         образовательная платформа
    //         <br />
    //         «Название»
    //       </Typography>
    //       {/* <p>
    //         Откройте дверь в мир музыки с нашим электронным дневником.
    //         <br />
    //         Присоединяйтесь прямо сейчас!
    //       </p> */}
    //       <Typography variant="subtitle1">
    //         Откройте дверь в мир музыки с нашим электронным дневником.
    //         <br />
    //         Присоединяйтесь прямо сейчас!
    //       </Typography>
    //       <div className="intro-buttons-container">
    //         {/* <Button color="button-primary" label="Войти" onClick={authorize} /> */}
    //         <Button variant="outlined" size="large" onClick={authorize}>Войти</Button>
    //       </div>
    //     </div>
    //     {isModalOpen &&
    //       (isLoginForm ? (
    //         <ModalLogin onToggleForm={toggleForm} onClose={closeModal} />
    //       ) : (
    //         <RegisterModal onToggleForm={toggleForm} onClose={closeModal} />
    //       ))
    //     }
    //   </div>
    //   <Footer />
    // </div>
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
            <IntroButton variant="contained" size="large">
              Войти
            </IntroButton>
          </IntroSection>
        </IntroSectionContainer>
        <Footer />
        {/* TODO: Make modal window with registration and authorization
          * PS: Make registration form as a page (or mb leave it modal) */}
      </MainContainer>
    </AppContainer>
  );
};

export default MainPage;
