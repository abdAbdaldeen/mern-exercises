import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
function Header() {
  return (
    <header>
      <div className="header-container">
        <img
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />

        <input type="text" placeholder="Search..." />

        <nav>
          <ul>
            <Link to="/home">
              <li>
                <i className="fas fa-home"></i>
              </li>
            </Link>

            <li>
              <i className="far fa-paper-plane"></i>
            </li>
            <li>
              <i className="far fa-compass"></i>
            </li>
            <li>
              <i className="far fa-heart"></i>
            </li>
            <Link to="/profile">
              <li>
                <i className="far fa-user-circle"></i>
              </li>
            </Link>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
