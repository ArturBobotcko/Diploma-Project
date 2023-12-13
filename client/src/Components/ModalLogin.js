import React from "react";
import "../Modal.css";
import LoginPage from "../Pages/LoginPage";

const Modal = ({ onClose, onToggleForm }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={"modal-content auth-page"}
        onClick={(e) => e.stopPropagation()}
      >
        <LoginPage onToggleForm={onToggleForm} />
        <button className="closing-modal-btn" onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
};

export default Modal;
