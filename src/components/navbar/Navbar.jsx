import React from "react";
import "./navbar.css";
import sunIcon from "../../../images/icon-sun.svg";
import moonIcon from "../../../images/icon-moon.svg";
import { FaRegUserCircle } from "react-icons/fa";

const Navbar = ({ darkTheme, setDarkTheme, setIsOpen }) => {
  return (
    <div className="navbar">
      <div className="nav__header_container">
        <h1 className="nav__header_container_primary-heading">T O D O</h1>
        <div className="flex gap">
          <button
            className="nav__toggle"
            onClick={() => setDarkTheme((value) => !value)}
          >
            <img src={`${darkTheme ? sunIcon : moonIcon}`} alt="theme-toggle" />
          </button>
          <button className="nav__toggle" onClick={() => setIsOpen(true)}>
            <FaRegUserCircle color="#FFF" size={32} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;