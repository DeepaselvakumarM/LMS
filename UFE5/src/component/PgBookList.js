import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import Adminnav from "./Adminnav";

const PgBookList = () => {
  const [books, setBooks] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("ME Industrial Safety Engineering");
  const [editBook, setEditBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const departments = ["ME Computer Science and Engineering", "ME Industrial Safety Engineering"];

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:9000/books/getbook");
        const filtered = res.data.message
          .filter((book) => book.Department === selectedDepartment)
          .sort((a, b) => (a.Rack || "").localeCompare(b.Rack || ""));
        setBooks(filtered);
      } catch (error) {
        console.error("Error fetching PG books:", error);
      }
    };

    fetchBooks();
  }, [selectedDepartment]);

  const handleDelete = async (bookId) => {
    try {
      await axios.delete(`http://localhost:9000/books/deletebook/${bookId}`);
      setBooks(books.filter((book) => book.Bookid !== bookId));
      alert("Book deleted successfully");
    } catch (error) {
      console.error("Error deleting PG book:", error);
      alert("Failed to delete the book.");
    }
  };

  const handleEdit = (book) => {
    setEditBook(book);
    setIsModalOpen(true);
  };

  const handleSaveEdit = async () => {
    try {
      const res = await axios.put(
        `http://localhost:9000/books/updatebook/${editBook._id}`,
        editBook
      );
      setBooks(
        books.map((book) =>
          book._id === editBook._id ? res.data.updatedBook : book
        )
      );
      setIsModalOpen(false);
      alert("Book updated successfully");
    } catch (error) {
      console.error("Error updating PG book:", error);
      alert("Failed to update the book.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditBook({ ...editBook, [name]: value });
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <Adminnav />

      <div className="p-4">
        <h1 className="text-3xl font-bold text-center mb-6 text-[#001f3f]">
          PG Book Management
        </h1>

        <div className="flex justify-center gap-4 mb-6 flex-wrap">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDepartment(dept)}
              className={`px-4 py-2 rounded-md ${
                selectedDepartment === dept ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-[#003366] text-white">
              <tr>
                <th className="px-4 py-3">Book ID</th>
                <th className="px-4 py-3">Book Name</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Availability</th>
                <th className="px-4 py-3">Rack No</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.Bookid} className="text-center border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{book.Bookid}</td>
                  <td className="px-4 py-2">{book.Bookname}</td>
                  <td className="px-4 py-2">{book.Discription}</td>
                  <td className="px-4 py-2">{book.Availability}</td>
                  <td className="px-4 py-2">{book.Rack || "N/A"}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleEdit(book)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-md mx-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(book.Bookid)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Modal */}
        {editBook && (
          <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            contentLabel="Edit PG Book"
            ariaHideApp={false}
          >
            <h2 className="text-2xl font-semibold mb-4">Edit Book Details</h2>
            <form className="space-y-4">
              <div>
                <label className="block mb-2">Book Name</label>
                <input
                  type="text"
                  name="Bookname"
                  value={editBook.Bookname}
                  onChange={handleChange}
                  className="px-4 py-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div>
                <label className="block mb-2">Description</label>
                <textarea
                  name="Discription"
                  value={editBook.Discription}
                  onChange={handleChange}
                  className="px-4 py-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div>
                <label className="block mb-2">Availability</label>
                <input
                  type="text"
                  name="Availability"
                  value={editBook.Availability}
                  onChange={handleChange}
                  className="px-4 py-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div>
                <label className="block mb-2">Rack No</label>
                <input
                  type="text"
                  name="Rack"
                  value={editBook.Rack}
                  onChange={handleChange}
                  className="px-4 py-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div className="mt-4 flex gap-4">
                <button
                  type="button"
                  onClick={handleSaveEdit}
                  className="px-6 py-2 bg-blue-500 text-white rounded-md"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 bg-gray-300 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default PgBookList;
