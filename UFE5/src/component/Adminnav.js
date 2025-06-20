import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.jpg";

const Adminnav = ({ onInstitutionSelect }) => {
  const [isOpen, setIsOpen] = useState(false); // Manage Inventory
  const [isAdminOpen, setAdminIsOpen] = useState(false); // Admin dropdown
  const [isHomeOpen, setIsHomeOpen] = useState(false); // Home dropdown
  const [isAddOpen, setIsAddOpen] = useState(false); // Add dropdown

  const institutions = {
    engineering: ["CSE", "IT", "ECE", "Mechanical", "Electronics"],
  };

  const handleInstitutionSelect = (institution) => {
    if (onInstitutionSelect && typeof onInstitutionSelect === "function") {
      onInstitutionSelect(institution);
    } else {
      console.error("onInstitutionSelect is not a function");
    }
    setIsHomeOpen(false);
  };

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
                <Link to="/admin" className="block px-4 py-2 hover:bg-white/10">
                  Dashboard
                </Link>
                <Link to="/reference" className="block px-4 py-2 hover:bg-white/10">
                  ReferenceBooks
                </Link>
                <Link to="/adminstory" className="block px-4 py-2 hover:bg-white/10">
                  Non-Academic
                </Link>
                {/* ✅ New PG Books Link */}
                <Link to="/pgbooks" className="block px-4 py-2 hover:bg-white/10">
                  PG Books
                </Link>
                <div className="border-t border-white/20 my-1"></div>
                {Object.keys(institutions).map((institution) => (
                  <button
                    key={institution}
                    onClick={() => handleInstitutionSelect(institution)}
                    className="block w-full text-left px-4 py-2 hover:bg-white/10"
                  >
                    {institution.charAt(0).toUpperCase() + institution.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Admin Dropdown */}
          <div className="relative">
            <button
              className="flex items-center gap-1 px-3 py-2 hover:bg-white/10 rounded-md"
              onClick={() => setAdminIsOpen(!isAdminOpen)}
            >
              Admin <span className="text-sm">▼</span>
            </button>
            {isAdminOpen && (
              <div className="absolute mt-2 bg-[#003366] rounded-md shadow-lg w-48 z-50">
                <Link to="/addadmin" className="block px-4 py-2 hover:bg-white/10">
                  Add Admin
                </Link>
                <Link to="/memberlist" className="block px-4 py-2 hover:bg-white/10">
                  Members List
                </Link>
              </div>
            )}
          </div>

          {/* Add Dropdown */}
          <div className="relative">
            <button
              className="flex items-center gap-1 px-3 py-2 hover:bg-white/10 rounded-md"
              onClick={() => setIsAddOpen(!isAddOpen)}
            >
              Add <span className="text-sm">▼</span>
            </button>
            {isAddOpen && (
              <div className="absolute mt-2 bg-[#003366] rounded-md shadow-lg w-48 z-50">
                <Link to="/addbook" className="block px-4 py-2 hover:bg-white/10">
                  Add UG/PG Books
                </Link>
                <Link to="/addreferencebook" className="block px-4 py-2 hover:bg-white/10">
                  Add Reference Book
                </Link>
                <Link to="/addstorybook" className="block px-4 py-2 hover:bg-white/10">
                  Non-Academic
                </Link>
                {/* <Link to="/pgaddbook" className="block px-4 py-2 hover:bg-white/10">
                  Add PG Book
                </Link> */}
              </div>
            )}
          </div>

          {/* Manage Inventory */}
          <div className="relative">
            <button
              className="flex items-center gap-1 px-3 py-2 hover:bg-white/10 rounded-md"
              onClick={() => setIsOpen(!isOpen)}
            >
              Manage Inventory <span className="text-sm">▼</span>
            </button>
            {isOpen && (
              <div className="absolute mt-2 bg-[#003366] rounded-md shadow-lg w-48 z-50">
                <Link to="/reserve" className="block px-4 py-2 hover:bg-white/10">
                  Reserved Book
                </Link>
                <Link to="/adminsuggest" className="block px-4 py-2 hover:bg-white/10">
                  Suggestion
                </Link>
                <Link to="/mail" className="block px-4 py-2 hover:bg-white/10">
                  Due Intimation
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

export default Adminnav;
