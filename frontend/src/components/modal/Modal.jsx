import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
const Modal = ({ showUserModal, setShowUserModal, users, user }) => {
  return (
    <div
      className={`modal ${showUserModal ? "show" : ""}`}
      tabIndex="-1"
      role="dialog"
      style={{ display: `${showUserModal ? "block" : "none"}` }}
    >
      <div className="modal-dialog " role="document">
        <div
          className="modal-content w-75"
          style={{
            marginLeft: "15px",
            boxShadow:
              "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
          }}
        >
          <div className="modal-header flex justify-content-between">
            <h5 className="modal-title">
              Users Online <GoDotFill style={{ color: "green" }} />
            </h5>
            <button
              type="button"
              className="btn"
              onClick={() => setShowUserModal(false)}
            >
              <IoCloseSharp />
            </button>
          </div>
          <div
            className="modal-body"
            style={{ maxHeight: "220px", overflowY: "scroll" }}
          >
            {users.map((usr, index) => (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "15px 7px",
                }}
              >
                <img
                  src="https://xsgames.co/randomusers/avatar.php?g=male"
                  width={50}
                  style={{ borderRadius: "50%" }}
                />

                <p
                  key={index * 999}
                  className="my-2 w-100"
                  style={{
                    fontWeight: "500",
                    fontSize: "18px",
                    marginLeft: "15px",
                  }}
                >
                  {user && user.userId === usr.userId ? "You" : usr.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
