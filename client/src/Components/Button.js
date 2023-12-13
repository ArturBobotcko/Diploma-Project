import React from "react";

const Button = ({ onClick, label, color }) => {
  return <button className={color} onClick={onClick}>{label}</button>;
};

export default Button;
