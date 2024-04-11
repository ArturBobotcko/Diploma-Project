import React from "react";
import { styled } from "@mui/system";

const FooterStyled = styled('footer')({
  marginTop: "auto",
  boxSizing: "border-box",
  position: "absolute",
  bottom: "0",
  width: "100%"
});

const FooterContainer = styled('div')({
  height: "260px",
  backgroundColor: "#2c3e50",
  paddingTop: "51px",
  paddingBottom: "51px",
  boxSizing: "inherit",
  paddingLeft: "10%",
  paddingRight: "10%",
  display: "flex",
  justifyContent: "space-between",
  textDecoration: "none"
});

const FooterContainerLinks = styled('div')({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  "& > p": {
    margin: "0",
    marginBottom: "15px",
    fontSize: "20px",
    fontWeight: "200",
    color: "#ffffff"
  },
  "& > a": {
    marginBottom: "15px",
    textDecoration: "none",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "200",
    transition: "color 0.3s",
    "&:hover": {
      color: "#007bff"
    }
  },
  "& > a:last-of-type": {
    marginBottom: "0",
  }
});

const Footer = () => {
  return (
    <FooterStyled>
      <FooterContainer>
        <FooterContainerLinks>
          <p>О компании</p>
           <a href="">О нас</a>
           <a href="">Как это работает</a>
           <a href="">Преимущества</a>
        </FooterContainerLinks>
        <FooterContainerLinks>
          <p>Возможности</p>
          <a href="">Преподавателям</a>
          <a href="">Родителям</a>
          <a href="">Учащимся</a>
        </FooterContainerLinks>
        <FooterContainerLinks>
          <p>Поддержка</p>
          <a href="">Портал службы поддержки</a>
        </FooterContainerLinks>
      </FooterContainer>
    </FooterStyled>
  );
};

export default Footer;
