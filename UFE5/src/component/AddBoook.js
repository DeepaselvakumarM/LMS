
import { useState } from "react";
import axios from "axios";
import Adminnav from "./Adminnav";

const AddBook = () => {
  const [bookData, setBookData] = useState({
    Bookid: "",
    Department: "",
    Bookname: "",
    Author: "",
    Discription: "",
    Availability: "",
    Rack: "", // ✅ New Rack field
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:9000/books/addbook", bookData);
      if (res.status === 201) {
        alert("📘 Book added successfully!");
        setBookData({
          Bookid: "",
          Department: "",
          Bookname: "",
          Author: "",
          Discription: "",
          Availability: "",
          Rack: "", // ✅ Clear Rack after submit
        });
      } else {
        alert("⚠️ Book already exists!");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong while adding the book.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Adminnav />
      <div className="pt-32">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 py-10 bg-white shadow-xl rounded-2xl">
          <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">
            Add New Book
          </h1>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Book ID */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Book ID
              </label>
              <input
                type="text"
                name="Bookid"
                value={bookData.Bookid}
                onChange={handleChange}
                placeholder="e.g. B123"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Department */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Department
              </label>
              <input
                type="text"
                name="Department"
                value={bookData.Department}
                onChange={handleChange}
                placeholder="e.g. Computer Science"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Book Name */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Book Name
              </label>
              <input
                type="text"
                name="Bookname"
                value={bookData.Bookname}
                onChange={handleChange}
                placeholder="e.g. Data Structures"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Author */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Author
              </label>
              <input
                type="text"
                name="Author"
                value={bookData.Author}
                onChange={handleChange}
                placeholder="e.g. Mark Allen Weiss"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="Discription"
                value={bookData.Discription}
                onChange={handleChange}
                placeholder="Write a brief description of the book"
                required
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Rack No */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Rack No
              </label>
              <input
                type="text"
                name="Rack"
                value={bookData.Rack}
                onChange={handleChange}
                placeholder="e.g. R5"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Availability */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Availability
              </label>
              <input
                type="text"
                name="Availability"
                value={bookData.Availability}
                onChange={handleChange}
                placeholder="e.g. Available / Not Available"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <div className="sm:col-span-2 text-center mt-4">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-200"
              >
                Add Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBook;


