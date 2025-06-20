
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const AdminLogin = () => {
  const [logData, setLogData] = useState({ Name: "", Password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLogData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:9000/adminlog/logadmin",
        logData
      );

      if (response.status === 200) {
        navigate("/admin");
      } else {
        alert(response.data.message || "Login failed");
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Server not responding");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 Login">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Sri Shanmugha College
        </h1>
        <h2 className="text-lg font-semibold text-center text-gray-600">
          Library Management
        </h2>
        <h3 className="text-md font-medium text-center text-gray-500 mt-2 text-blue">
          Admin Login
        </h3>

        <form onSubmit={handleSubmit} className="mt-6">
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            name="Name"
            onChange={handleChange}
            placeholder="Enter your username"
            required
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="block text-gray-700 mt-4">Password:</label>
          <input
            type="password"
            name="Password"
            onChange={handleChange}
            placeholder="Enter your password"
            required
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
            } text-white font-semibold py-2 mt-6 rounded-md transition duration-200`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
