import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar is-link" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <strong>Bridge Buddy</strong>
          </Link>

          <a
            role="button"
            className={`navbar-burger ${isActive ? 'is-active' : ''}`}
            aria-label="menu"
            aria-expanded="false"
            onClick={toggleMenu}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
          <div className="navbar-end">
            <Link 
              className={`navbar-item ${isActiveRoute('/') ? 'is-active' : ''}`}
              to="/"
              onClick={() => setIsActive(false)}
            >
              Home
            </Link>
            <Link 
              className={`navbar-item ${isActiveRoute('/fact-checker') ? 'is-active' : ''}`}
              to="/fact-checker"
              onClick={() => setIsActive(false)}
            >
              Fact Checker
            </Link>
            <Link 
              className={`navbar-item ${isActiveRoute('/resources') ? 'is-active' : ''}`}
              to="/resources"
              onClick={() => setIsActive(false)}
            >
              Resources
            </Link>
            <Link 
              className={`navbar-item ${isActiveRoute('/about') ? 'is-active' : ''}`}
              to="/about"
              onClick={() => setIsActive(false)}
            >
              About
            </Link>
            <Link 
              className={`navbar-item ${isActiveRoute('/analytics') ? 'is-active' : ''}`}
              to="/analytics"
              onClick={() => setIsActive(false)}
            >
              Analytics
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
