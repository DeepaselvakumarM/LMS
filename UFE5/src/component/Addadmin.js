
import React, { useState } from "react";
import Adminnav from "./Adminnav";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Addadmin = () => {
  const navigate = useNavigate();
  const [regData, setRegData] = useState({
    Name: "",
    Password: "",
  });

  const handleChange = (e) => {
    setRegData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAdminData = async (e) => {
    e.preventDefault();
    const URL = "http://localhost:9000/adminlog/addadmin";

    try {
      const response = await axios.post(URL, regData);

      if (response.status === 201) {
        alert("Admin Registered Successfully");
        navigate("/admin");
      }
    } catch (error) {
      console.error(error.response?.data);
      alert(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <Adminnav />
      <div className="max-w-4xl mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-semibold text-center text-blue-600">
          Sri Shanmugha Insitutions
        </h1>
        <h2 className="text-2xl font-medium text-center text-blue-500 mt-1">
          Library Management
        </h2>
        <h3 className="text-xl font-bold text-center text-gray-700 mt-6">
          Add Admin
        </h3>

        <form
          onSubmit={handleAdminData}
          className="bg-white shadow-xl rounded-xl p-6 mt-8 max-w-md mx-auto transition duration-300"
        >
          <div className="mb-5">
            <label
              htmlFor="Name"
              className="block text-lg font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              name="Name"
              id="Name"
              placeholder="Enter admin username"
              required
              onChange={handleChange}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="Password"
              className="block text-lg font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="Password"
              id="Password"
              placeholder="Enter admin password"
              required
              onChange={handleChange}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Add Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addadmin;
