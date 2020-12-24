import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { LogingContext } from "../../UserContext";
function Header(x) {
  return (
    <header>
      <div className="webName">Todoey</div>
      <nav>
        <ul>
          {x.isLogin && (
            <>
              <Link to="/">
                <li>
                  <i className="fas fa-sign-out-alt"></i>
                </li>
              </Link>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
