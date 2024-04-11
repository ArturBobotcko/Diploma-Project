import React from "react";
import { styled } from "@mui/system";
import { AppBar, Toolbar } from "@mui/material";
import logo from "../Assets/logo.svg";

const NavbarContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  marginLeft: "10%",
  marginRight: "10%",
  marginTop: "15px",
  marginBottom: "15px",
});

const NavLinksContainer = styled("div")(({ theme }) => ({
  "& > a": {
    marginLeft: theme.spacing(5),
    textDecoration: "none",
    color: "inherit",
    fontSize: "20px",
    transition: "color 0.3s",
    "&:hover": {
      color: "#3774CD",
    },
  },
}));

const StyledToolbar = styled(Toolbar)({
  backgroundColor: "#ffffff",
  color: "#696b6e", 
  padding: "0",
  "@media (min-width: 600px)": {
    padding: "0",
  },
});

const Navbar = () => {
  return (
    <AppBar position="" elevation={3} sx={{marginBottom: '140px'}}>
      <StyledToolbar>
        <NavbarContainer>
          <div className="nav-logo-container">
            <a href="/">
              <img src={logo} alt="Logo" id="logo" />
            </a>
          </div>
          <NavLinksContainer>
            <a href="/">О нас</a>
            <a href="/">Возможности</a>
            <a href="/">Новости</a>
            <a href="/">Контакты</a>
          </NavLinksContainer>
        </NavbarContainer>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
