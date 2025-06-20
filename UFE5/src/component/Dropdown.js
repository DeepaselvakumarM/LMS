import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Menu, MenuItem } from "@mui/material"; // Import MUI components
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"; // Icon for dropdown button
import { blue } from "@mui/material/colors";

const Dropdown = () => {
  const [anchorEl, setAnchorEl] = useState(null); // Menu state to handle opening and closing
  const navigate = useNavigate(); // For navigation after menu item click

  // List of menu items with their respective paths
  const menuItems = [
    { name: "Engineering", path: "engineering" },
    { name: "Pharmacy", path: "pharmacy" },
    { name: "Nursing", path: "nursing" },
    { name: "AHS", path: "ahs" },
    { name: "Health Inspector", path: "health-inspector" },
  ];

  // Opens the menu when button is clicked
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Closes the menu when clicked outside
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Handles item selection and navigation
  const handleItemClick = (path) => {
    navigate(`/institutions/${path}`);
    handleMenuClose(); // Close the menu after selection
  };

  return (
    <div>
      <Button
        aria-controls={anchorEl ? "institutions-menu" : undefined}
        aria-haspopup="true"
        onClick={handleMenuOpen}
        variant="contained"
        endIcon={<ArrowDropDownIcon />} // Dropdown icon
        sx={{
          color: "white", // Text color
          backgroundColor: "transparent", // Primary button color
          "&:hover": { backgroundColor: "" }, // Button hover color
          padding: "8px 16px", // Button padding
        }} // Custom button styles
      >
        Institutions
      </Button>
      <Menu
        id="institutions-menu"
        anchorEl={anchorEl} // Position of the menu
        keepMounted
        open={Boolean(anchorEl)} // Menu visibility based on anchorEl state
        onClose={handleMenuClose}
        style={{ backgroundColor: "navyblue" }}
       // Close the menu when clicked outside
      >
        {menuItems.map((item, index) => (
          <MenuItem key={index} onClick={() => handleItemClick(item.path)}  >
            {item.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default Dropdown;
