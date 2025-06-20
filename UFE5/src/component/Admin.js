
// import React, { useEffect, useState } from "react";
// import Adminnav from "./Adminnav";
// import axios from "axios";
// import Modal from "react-modal";

// const Admin = () => {
//   const [books, setBooks] = useState([]);
//   const [selectedInstitution, setSelectedInstitution] = useState(null);
//   const [selectedDepartment, setSelectedDepartment] = useState("");
//   const [editBook, setEditBook] = useState(null); // State to store the book being edited
//   const [isModalOpen, setIsModalOpen] = useState(false); // Modal open/close state

//   const institutions = {
//     engineering: ["Common","CSE", "IT","AIDS","Cyber security","ECE","Mechanical","Bio medical", "Agri"],
//   };

//   const fetchBooks = async () => {
//     if (!selectedInstitution) return;
//     try {
//       const res = await axios.get(`http://localhost:9000/books/getbook`);
//       const filteredBooks = res.data.message
//         .filter((book) => book.Department === selectedDepartment)
//         .sort((a, b) => a.Rack - b.Rack);
//       setBooks(filteredBooks);
//     } catch (error) {
//       console.error("Error fetching books:", error);
//     }
//   };

//   useEffect(() => {
//     fetchBooks();
//   }, [selectedInstitution, selectedDepartment]);

//   const handleInstitutionSelect = (institution) => {
//     setSelectedInstitution(institution);
//     setSelectedDepartment(institutions[institution][0]);
//   };

//   const handleDelete = async (bookId) => {
//     try {
//       await axios.delete(`http://localhost:9000/books/deletebook/${bookId}`);
//       setBooks(books.filter((book) => book.Bookid !== bookId));
//       alert("Book deleted successfully");
//     } catch (error) {
//       console.error("Error deleting book:", error);
//       alert("Failed to delete the book.");
//     }
//   };

//   const handleEdit = (book) => {
//     setEditBook(book);
//     setIsModalOpen(true); // Open the modal when editing a book
//   };

//   const handleSaveEdit = async () => {
//     try {
//       const res = await axios.put(
//         `http://localhost:9000/books/updatebook/${editBook._id}`,
//         editBook
//       );
//       setBooks(
//         books.map((book) =>
//           book._id === editBook._id ? res.data.updatedBook : book
//         )
//       );
//       setIsModalOpen(false); // Close the modal after saving
//       alert("Book updated successfully");
//     } catch (error) {
//       console.error("Error saving edit:", error);
//       alert("Failed to update the book.");
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditBook({ ...editBook, [name]: value });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 pt-20 px-4 md:px-10">
//       <Adminnav onInstitutionSelect={handleInstitutionSelect} />
//       <h1 className="text-3xl font-bold text-center text-[#001f3f] mb-8">
//         Books for {selectedInstitution ? selectedInstitution : "Select an Institution"}
//       </h1>

//       {selectedInstitution && (
//         <div className="mb-10">
//           <h2 className="text-2xl font-semibold text-[#003366] mb-4">
//             Departments in {selectedInstitution.charAt(0).toUpperCase() + selectedInstitution.slice(1)}
//           </h2>
//           <div className="flex gap-4 mb-6 flex-wrap">
//             {institutions[selectedInstitution].map((dept) => (
//               <button
//                 key={dept}
//                 onClick={() => setSelectedDepartment(dept)}
//                 className={`px-4 py-2 rounded-md ${
//                   selectedDepartment === dept ? "bg-blue-500 text-white" : "bg-gray-200"
//                 }`}
//               >
//                 {dept}
//               </button>
//             ))}
//           </div>

//           <h3 className="text-xl font-semibold mb-4">
//             Books in {selectedDepartment}
//           </h3>
//           <div className="overflow-x-auto">
//             <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
//               <thead className="bg-[#003366] text-white">
//                 <tr>
//                   <th className="px-4 py-3">Book ID</th>
//                   <th className="px-4 py-3">Book Name</th>
//                   <th className="px-4 py-3">Description</th>
//                   <th className="px-4 py-3">Availability</th>
//                   <th className="px-4 py-3">Rack No</th>
//                   <th className="px-4 py-3">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {books.map((book) => (
//                   <tr key={book.Bookid} className="text-center border-t hover:bg-gray-50">
//                     <td className="px-4 py-2">{book.Bookid}</td>
//                     <td className="px-4 py-2">{book.Bookname}</td>
//                     <td className="px-4 py-2">{book.Discription}</td>
//                     <td className="px-4 py-2">{book.Availability}</td>
//                     <td className="px-4 py-2">{book.Rack || "N/A"}</td>
//                     <td className="px-4 py-2">
//                       <button
//                         onClick={() => handleEdit(book)}
//                         className="px-4 py-2 bg-yellow-500 text-white rounded-md mx-2"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(book.Bookid)}
//                         className="px-4 py-2 bg-red-500 text-white rounded-md"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {/* Edit Book Modal */}
//       {editBook && (
//         <Modal
//           isOpen={isModalOpen}
//           onRequestClose={() => setIsModalOpen(false)}
//           contentLabel="Edit Book"
//           ariaHideApp={false}
//         >
//           <h2 className="text-2xl font-semibold mb-4">Edit Book Details</h2>
//           <form className="space-y-4">
//             <div>
//               <label className="block mb-2">Book Name</label>
//               <input
//                 type="text"
//                 name="Bookname"
//                 value={editBook.Bookname}
//                 onChange={handleChange}
//                 className="px-4 py-2 border border-gray-300 rounded-md w-full"
//               />
//             </div>
//             <div>
//               <label className="block mb-2">Description</label>
//               <textarea
//                 name="Discription"
//                 value={editBook.Discription}
//                 onChange={handleChange}
//                 className="px-4 py-2 border border-gray-300 rounded-md w-full"
//               />
//             </div>
//             <div>
//               <label className="block mb-2">Availability</label>
//               <input
//                 type="text"
//                 name="Availability"
//                 value={editBook.Availability}
//                 onChange={handleChange}
//                 className="px-4 py-2 border border-gray-300 rounded-md w-full"
//               />
//             </div>
//             <div>
//               <label className="block mb-2">Rack No</label>
//               <input
//                 type="text"
//                 name="Rack"
//                 value={editBook.Rack}
//                 onChange={handleChange}
//                 className="px-4 py-2 border border-gray-300 rounded-md w-full"
//               />
//             </div>
//             <div className="mt-4 flex gap-4">
//               <button
//                 type="button"
//                 onClick={handleSaveEdit}
//                 className="px-6 py-2 bg-blue-500 text-white rounded-md"
//               >
//                 Save
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setIsModalOpen(false)}
//                 className="px-6 py-2 bg-gray-300 rounded-md"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default Admin;



import React, { useEffect, useState } from "react";
import Adminnav from "./Adminnav";
import axios from "axios";
import Modal from "react-modal";

const Admin = () => {
  const [books, setBooks] = useState([]);
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [editBook, setEditBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const institutions = {
    engineering: [
      "Tamil",
    "English",
    "Maths",
    "Physics",
    "Chemistry",
    "First-Year Common Course",
    "BE-CSE",
    "BTech-IT",
    "BTech-AIDS",
    "BE-Cyber Security",
    "BE-ECE",
    "BE-Mechanical",
    "BTech-Agriculture Engineering",
    "BE-Biomedical",],
  };

  const fetchBooks = async () => {
    if (!selectedInstitution) return;
    try {
      const res = await axios.get("http://localhost:9000/books/getbook");
      const filteredBooks = res.data.message
        .filter((book) => book.Department === selectedDepartment)
        .sort((a, b) => a.Rack - b.Rack);
      setBooks(filteredBooks);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [selectedInstitution, selectedDepartment]);

  const handleInstitutionSelect = (institution) => {
    setSelectedInstitution(institution);
    setSelectedDepartment(institutions[institution][0]);
  };

  const handleDelete = async (bookId) => {
    try {
      await axios.delete(`http://localhost:9000/books/deletebook/${bookId}`);
      setBooks(books.filter((book) => book.Bookid !== bookId));
      alert("Book deleted successfully");
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Failed to delete the book.");
    }
  };

  const handleEdit = (book) => {
    setEditBook(book);
    setIsModalOpen(true);
  };

  const handleSaveEdit = async () => {
    try {
      const res = await axios.put(`http://localhost:9000/books/updatebook/${editBook._id}`, editBook);
      setBooks(
        books.map((book) =>
          book._id === editBook._id ? res.data.updatedBook : book
        )
      );
      setIsModalOpen(false);
      alert("Book updated successfully");
    } catch (error) {
      console.error("Error saving edit:", error);
      alert("Failed to update the book.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditBook({ ...editBook, [name]: value });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4 md:px-10">
      <Adminnav onInstitutionSelect={handleInstitutionSelect} />
      <h1 className="text-3xl font-bold text-center text-[#001f3f] mb-8">
        Books for {selectedInstitution ? selectedInstitution : "Select an Institution"}
      </h1>

      {selectedInstitution && (
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-[#003366] mb-4">
            Departments in {selectedInstitution.charAt(0).toUpperCase() + selectedInstitution.slice(1)}
          </h2>
          <div className="flex gap-4 mb-6 flex-wrap">
            {institutions[selectedInstitution].map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                className={`px-4 py-2 rounded-md ${selectedDepartment === dept ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              >
                {dept}
              </button>
            ))}
          </div>

          <h3 className="text-xl font-semibold mb-4">
            Books in {selectedDepartment}
          </h3>
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
        </div>
      )}

      {editBook && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="Edit Book"
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
  );
};

export default Admin;
