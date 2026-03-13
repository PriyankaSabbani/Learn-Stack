import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar({ onSearch }) {

  const [searchTerm, setSearchTerm] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const [isAdmin, setIsAdmin] = useState(
    !!localStorage.getItem("adminToken")
  );

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {

    const checkLogin = () => {

      setIsLoggedIn(
        !!localStorage.getItem("token")
      );

      setIsAdmin(
        !!localStorage.getItem("adminToken")
      );

    };

    checkLogin();

    window.addEventListener("storage", checkLogin);

    return () =>
      window.removeEventListener("storage", checkLogin);

  }, []);

  const handleSearch = (e) => {

    e.preventDefault();

    if (onSearch)
      onSearch(searchTerm.trim());

  };

  const resetSearch = () => {

    setSearchTerm("");

    if (onSearch)
      onSearch("");

    setMenuOpen(false);

  };

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);

    setMenuOpen(false);

  };

  const handleAdminLogout = () => {

    localStorage.removeItem("adminToken");

    setIsAdmin(false);

    setMenuOpen(false);

  };

  return (

    <nav className="navbar navbar-expand-lg bg-white shadow-sm">

      <div className="container">

        <Link
          className="navbar-brand fw-bold text-primary fs-4"
          to="/"
          onClick={resetSearch}
        >
          LEARN STACK
        </Link>

        {/* HAMBURGER BUTTON */}

        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
        >

          {menuOpen ? (

            <span style={{fontSize:"22px"}}>✕</span>

          ) : (

            <span className="navbar-toggler-icon"></span>

          )}

        </button>

        {/* NAVBAR CONTENT */}

        <div
          className={`collapse navbar-collapse ${
            menuOpen ? "show" : ""
          }`}
        >

          <ul className="navbar-nav me-auto">

            <li className="nav-item">

              <Link
                className="nav-link active"
                to="/courses"
                onClick={resetSearch}
              >
                Home
              </Link>

            </li>

            {isLoggedIn && (

              <li className="nav-item">

                <Link
                  className="nav-link"
                  to="/my-courses"
                  onClick={() => setMenuOpen(false)}
                >
                  My Courses
                </Link>

              </li>

            )}

          </ul>

          {/* SEARCH */}

          <form
            className="d-flex me-3 my-3 my-lg-0"
            onSubmit={handleSearch}
          >

            <input
              className="form-control me-2"
              type="search"
              placeholder="Search courses"
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
            />

            <button
              className="btn btn-primary"
              type="submit"
            >
              Search
            </button>

          </form>

          {/* AUTH BUTTONS */}

          <div className="d-flex flex-column flex-lg-row">

            {/* ADMIN */}

            {isAdmin ? (

              <>
                <Link
                  to="/admin/dashboard"
                  className="btn btn-dark me-lg-2 mb-2 mb-lg-0"
                  onClick={() => setMenuOpen(false)}
                >
                  Admin Dashboard
                </Link>

                <button
                  className="btn btn-outline-danger me-lg-2 mb-2 mb-lg-0"
                  onClick={handleAdminLogout}
                >
                  Admin Logout
                </button>
              </>

            ) : (

              !isLoggedIn && (

                <Link
                  to="/admin-login"
                  className="btn btn-dark me-lg-2 mb-2 mb-lg-0"
                  onClick={() => setMenuOpen(false)}
                >
                  Admin
                </Link>

              )

            )}

            {/* USER */}

            {isLoggedIn ? (

              <button
                className="btn btn-outline-danger"
                onClick={handleLogout}
              >
                Logout
              </button>

            ) : (

              <>
                <Link
                  to="/login"
                  className="btn btn-outline-primary me-lg-2 mb-2 mb-lg-0"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="btn btn-primary"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>

            )}

          </div>

        </div>

      </div>

    </nav>

  );

}

export default Navbar;