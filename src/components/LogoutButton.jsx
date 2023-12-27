import React from "react";
import PropTypes from "prop-types";
import { RiLoginBoxLine } from "react-icons/ri";

function LogoutButton({ userName, logout }) {
  return (
    <button className="button-logout" type="button" onClick={logout}>
      <RiLoginBoxLine />
      {userName}
    </button>
  );
}

LogoutButton.propTypes = {
  userName: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
};

export default LogoutButton;
