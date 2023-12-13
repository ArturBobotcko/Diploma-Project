import React from "react";
import "../Modal.css";
import RegisterPage from "../Pages/RegisterPage";

const Modal = ({ onClose, onToggleForm }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={"modal-content auth-page"}
        onClick={(e) => e.stopPropagation()}
      >
        <RegisterPage onToggleForm={onToggleForm} />
        <button className="closing-modal-btn" onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
};

export default Modal;
