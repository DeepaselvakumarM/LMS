
import React, { useState, useEffect } from "react";
import axios from "axios";
import Adminnav from "./Adminnav";

const Adminsuggest = () => {
  const [suggestions, setSuggestions] = useState([]);

  const URL = "http://localhost:9000/suggest/all";

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await axios.get(URL);
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    fetchSuggestions();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Adminnav />

      <div className="px-6 mt-20">
        <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">Suggestions</h1>

        {suggestions.length === 0 ? (
          <p className="text-xl text-gray-500 text-center">No suggestions found</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow-xl rounded-2xl p-4">
            <table className="min-w-full table-auto border border-gray-300">
              <thead className="bg-blue-100">
                <tr>
                  <th className="px-4 py-2 border">#</th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Suggestion</th>
                  <th className="px-4 py-2 border">Date</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {suggestions.map((suggestion, index) => (
                  <tr key={suggestion._id} className="hover:bg-blue-50">
                    <td className="px-4 py-2 border">{index + 1}</td>
                    <td className="px-4 py-2 border">{suggestion.name}</td>
                    <td className="px-4 py-2 border">{suggestion.email}</td>
                    <td className="px-4 py-2 border">{suggestion.message}</td>
                    <td className="px-4 py-2 border">
                      {new Date(suggestion.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Adminsuggest;
