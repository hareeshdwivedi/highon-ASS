import React from "react";
import ReactDom from "react-dom";

import "./modal.css";

function Modal({ open, onClose, logout }) {
  const logoutHandler = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin + "/login",
      },
    });
    localStorage.removeItem("chat-user");
  };
  if (!open) return null;
  return ReactDom.createPortal(
    <>
      <div className="modal-overlay-container" />
      <div className="modal">
        <div className="modal-content">
          <div className="modal-details-container">
            <p>Do you want to LOGOUT</p>
            <div className="modal-buttons-container">
              <button onClick={() => logoutHandler()}>Yes</button>
              <button onClick={() => onClose()}>No</button>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("modal")
  );
}

export default Modal;
