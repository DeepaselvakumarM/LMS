import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.jpg";

const SuperNav = () => {
  const [isOpen, setIsOpen] = useState(false); // Manage Inventory
  const [isHomeOpen, setIsHomeOpen] = useState(false); // Home dropdown

  return (
    
    <nav className="bg-[#001f3f] text-white px-6 py-3 fixed top-0 left-0 w-full shadow-md z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="College Logo" className="h-12 w-auto" />
        </div>

        <div className="flex items-center space-x-6">
          {/* Home Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsHomeOpen(!isHomeOpen)}
              className="flex items-center gap-1 px-3 py-2 hover:bg-white/10 rounded-md"
            >
              Home <span className="text-sm">▼</span>
            </button>
            {isHomeOpen && (
              <div className="absolute mt-2 bg-[#003366] rounded-md shadow-lg w-48 z-50">
                {/* <Link to="/intro" className="block px-4 py-2 hover:bg-white/10">
                  Intro Section
                </Link> */}
                <Link to="/superef" className="block px-4 py-2 hover:bg-white/10">
                  ReferenceBooks
                </Link>
                <Link to="/superna" className="block px-4 py-2 hover:bg-white/10">
                  Non-Academic
                </Link>
                <Link to="/superpg" className="block px-4 py-2 hover:bg-white/10">
                  PG Books
                </Link>
                <Link to="/superebook" className="block px-4 py-2 hover:bg-white/10">
                  Engineering
                </Link>
              </div>
            )}
          </div>

          {/* Manage Inventory Dropdown */}
          <div className="relative">
            <button
              className="flex items-center gap-1 px-3 py-2 hover:bg-white/10 rounded-md"
              onClick={() => setIsOpen(!isOpen)}
            >
              Manage Inventory <span className="text-sm">▼</span>
            </button>
            {isOpen && (
              <div className="absolute mt-2 bg-[#003366] rounded-md shadow-lg w-48 z-50">
                <Link to="/superReserve" className="block px-4 py-2 hover:bg-white/10">
                  Reserved Book
                </Link>
                <Link to="/member-dashboard" className="block px-4 py-2 hover:bg-white/10">
                  Dashboard
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      
      

    </nav>
    
  );
};


export default SuperNav;



