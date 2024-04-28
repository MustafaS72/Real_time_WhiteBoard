import React from "react";

const Modal = ({ showUserModal, setShowUserModal }) => {
  return (
    <div
      className={`modal ${showUserModal ? "show" : ""}`}
      tabIndex="-1"
      role="dialog"
      style={{ display: `${showUserModal ? "block" : "none"}` }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Users</h5>
            <button
              type="button"
              className="close"
              onClick={() => setShowUserModal(false)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body"></div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
