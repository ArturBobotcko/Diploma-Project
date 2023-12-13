import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-links-container">
          <p>О компании</p>
          <a href="">О нас</a>
          <a href="">Как это работает</a>
          <a href="">Преимущества</a>
        </div>
        <div className="footer-links-container">
          <p>Возможности</p>
          <a href="">Преподавателям</a>
          <a href="">Родителям</a>
          <a href="">Учащимся</a>
        </div>
        <div className="footer-links-container">
          <p>Поддержка</p>
          <a href="">Портал службы поддержки</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
