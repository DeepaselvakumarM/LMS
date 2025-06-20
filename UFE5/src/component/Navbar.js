import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.jpg";
import "../styles/Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const closeMenus = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 w-full bg-blue-600 text-white shadow-md z-50"
      style={{ backgroundColor: "#001f3f" }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:px-8">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <Link to="/home">
            <img src={logo} alt="College Logo" className="h-12 w-auto" />
          </Link>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Navigation Items */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } md:flex md:items-center md:space-x-8 mt-4 md:mt-0 w-full md:w-auto`}
        >
          <Link
            to="/home"
            className="block md:inline-block text-lg px-3 py-2 hover:text-yellow-300 transition duration-300"
            onClick={closeMenus}
          >
            Home
          </Link>

          {/* Clickable Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="block text-left w-full md:inline-block text-lg px-3 py-2 hover:text-yellow-300 transition duration-300"
            >
              Books ▾
            </button>
            {dropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-50">
                <Link
                  to="/institutions/engineering"
                  className="block px-4 py-2 hover:bg-blue-100 hover:text-blue-800"
                  onClick={closeMenus}
                >
                  UG Books
                </Link>

                <Link
                  to="/pgcourse"
                  className="block px-4 py-2 hover:bg-blue-100 hover:text-blue-800"
                  onClick={closeMenus}
                >
                  PG Books
                </Link>


                <Link
                  to="/referencebooks"
                  className="block px-4 py-2 hover:bg-blue-100 hover:text-blue-800"
                  onClick={closeMenus}
                >
                  Reference Books
                </Link>
                <Link
                  to="/storybook"
                  className="block px-4 py-2 hover:bg-blue-100 hover:text-blue-800"
                  onClick={closeMenus}
                >
                  Non-Academic	
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/article"
            className="block md:inline-block text-lg px-3 py-2 hover:text-yellow-300 transition duration-300"
            onClick={closeMenus}
          >
            Article
          </Link>

          <Link
            to="/suggest"
            className="block md:inline-block text-lg px-3 py-2 hover:text-yellow-300 transition duration-300"
            onClick={closeMenus}
          >
            Suggestion
          </Link>

          <Link
            to="/profile"
            className="block md:inline-block text-lg px-3 py-2 hover:text-yellow-300 transition duration-300"
            onClick={closeMenus}
          >
            User
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

