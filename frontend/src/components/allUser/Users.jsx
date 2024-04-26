import React from "react";

const Users = ({ users, setOpenedUserTab }) => {
  return (
    <div
      className="position-fixed top-5 h-100 text-white bg-dark mr-10 rounded-top"
      style={{ width: "189px", right: "0%" }}
    >
      <button
        type="button"
        className="btn btn-light btn-block w-100 mt-5"
        onClick={() => setOpenedUserTab(false)}
      >
        Close
      </button>
      <div className="w-90 mt-5 pt-5">
        {users.map((user, index) => (
          <p key={index * 999} className="my-2 w-100 text-center ">
            {user.name} {user && user.userId === user.userId && "(You)"}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Users;
