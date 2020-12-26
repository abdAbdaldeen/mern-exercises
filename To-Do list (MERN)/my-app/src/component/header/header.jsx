import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
function Header(x) {
  return (
    <header>
      <div className="webName">Todoey</div>
      <nav>
        <ul>
          {x.isLogin && (
            <>
              <Link to="/">
                <li
                  onClick={() => {
                    sessionStorage.clear();
                  }}
                >
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
