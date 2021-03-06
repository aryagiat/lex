/**
 * Navbar.jsx
 *
 * The navigation bar component for the landing and dashboard page
 */

import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import "./misc.css";
import dashboardNavData from "./nav-data/dashboard";
import landingNavData from "./nav-data/landing";

function Navbar() {
  // State
  const [click, setClick] = useState(false);
  const { currentUser, logout } = useAuth(); // Authentication Context
  const history = useHistory(); // redirect page

  function handleClick() {
    setClick(!click);
  }

  async function handleLogout() {
    // Logout
    try {
      await logout();
      history.push("/");
    } catch {
      console.log("Failed to log out");
    }
  }

  function getNavData(currentUser) {
    // Check which navbar to use
    return currentUser ? dashboardNavData : landingNavData;
  }

  return (
    <div>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            LEX
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {getNavData(currentUser).map((item, index) => {
              return (
                <li className="nav-item" key={index}>
                  {item.title === "Profile" ? (
                    <NavLink
                      key={index}
                      exact
                      to={`${item.path}/${currentUser.uid}`}
                      activeClassName="active"
                      className="nav-links"
                      onClick={handleClick}
                    >
                      {item.title}
                    </NavLink>
                  ) : (
                    <NavLink
                      key={index}
                      exact
                      to={item.path}
                      activeClassName="active"
                      className="nav-links"
                      onClick={handleClick}
                    >
                      {item.title}
                    </NavLink>
                  )}
                </li>
              );
            })}

            {currentUser ? (
              <li className="nav-item">
                <NavLink
                  onClick={handleLogout}
                  activeClassName="active"
                  className="nav-links"
                  exact
                  to="/landing"
                >
                  Logout
                </NavLink>
              </li>
            ) : (
              <div></div>
            )}
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
