// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import SuperNav from "./SuperNav";
// const SuperPg = () => {
//   const [books, setBooks] = useState([]);
//   const [selectedDepartment, setSelectedDepartment] = useState("ME Industrial Safety Engineering");

//   const departments = ["ME Computer Science and Engineering", "ME Industrial Safety Engineering"];

//   const fetchBooks = async () => {
//     try {
//       const res = await axios.get("http://localhost:9000/books/getbook");
//       const filtered = res.data.message
//         .filter((book) => book.Department === selectedDepartment)
//         .sort((a, b) => a.Rack - b.Rack);
//       setBooks(filtered);
//     } catch (error) {
//       console.error("Error fetching PG books:", error);
//     }
//   };

//   useEffect(() => {
//     fetchBooks();
//   }, [selectedDepartment]);

//   return (
//     <div className="min-h-screen bg-gray-100 p-4 pt-20">
//         <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
//                     <SuperNav />
//       <h1 className="text-3xl font-bold text-center mb-6 text-[#001f3f]">
//         PG Book Collection
//       </h1>

//       <div className="flex justify-center gap-4 mb-6 flex-wrap">
//         {departments.map((dept) => (
//           <button
//             key={dept}
//             onClick={() => setSelectedDepartment(dept)}
//             className={`px-4 py-2 rounded-md ${
//               selectedDepartment === dept ? "bg-blue-600 text-white" : "bg-gray-200"
//             }`}
//           >
//             {dept}
//           </button>
//         ))}
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
//           <thead className="bg-[#003366] text-white">
//             <tr>
//               <th className="px-4 py-3">Book ID</th>
//               <th className="px-4 py-3">Book Name</th>
//               <th className="px-4 py-3">Discription</th>
//               <th className="px-4 py-3">Availability</th>
//               <th className="px-4 py-3">Rack No</th>
//             </tr>
//           </thead>
//           <tbody>
//             {books.map((book) => (
//               <tr key={book.Bookid} className="text-center border-t hover:bg-gray-50">
//                 <td className="px-4 py-2">{book.Bookid}</td>
//                 <td className="px-4 py-2">{book.Bookname}</td>
//                 <td className="px-4 py-2">{book.Discription}</td>
//                 <td className="px-4 py-2">{book.Availability}</td>
//                 <td className="px-4 py-2">{book.Rack}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default SuperPg;





import React, { useEffect, useState } from "react";
import axios from "axios";
import SuperNav from "./SuperNav";
import { FiBook, FiSearch, FiLoader, FiAlertCircle } from "react-icons/fi";

const SuperPg = () => {
  const [books, setBooks] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("ME Industrial Safety Engineering");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const departments = [
    "ME Computer Science and Engineering", 
    "ME Industrial Safety Engineering"
  ];

  const fetchBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("http://localhost:9000/books/getbook");
      const filtered = res.data.message
        .filter((book) => book.Department === selectedDepartment)
        .sort((a, b) => a.Rack - b.Rack);
      setBooks(filtered);
    } catch (error) {
      console.error("Error fetching PG books:", error);
      setError("Failed to fetch books. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [selectedDepartment]);

  const filteredBooks = books.filter(book => 
    book.Bookname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.Bookid.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.Discription.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 pt-20">
      <SuperNav />
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              <FiBook className="text-blue-600" />
              PG Book Collection
            </h1>
            <p className="text-gray-600 mt-1">
              Browse and manage postgraduate books by department
            </p>
          </div>
          
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search books..."
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDepartment(dept)}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                selectedDepartment === dept 
                  ? "bg-blue-600 text-white shadow-md" 
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <FiLoader className="animate-spin text-blue-600 text-4xl" />
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
            <div className="flex items-center">
              <FiAlertCircle className="text-red-500 mr-2" />
              <span className="text-red-700">{error}</span>
            </div>
            <button 
              onClick={fetchBooks}
              className="mt-2 px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-medium">Book ID</th>
                    <th className="px-6 py-4 text-left font-medium">Book Name</th>
                    <th className="px-6 py-4 text-left font-medium">Description</th>
                    <th className="px-6 py-4 text-center font-medium">Availability</th>
                    <th className="px-6 py-4 text-center font-medium">Rack No</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredBooks.length > 0 ? (
                    filteredBooks.map((book) => (
                      <tr 
                        key={book.Bookid} 
                        className="hover:bg-blue-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                          {book.Bookid}
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-800">{book.Bookname}</div>
                        </td>
                        <td className="px-6 py-4 text-gray-600 max-w-xs">
                          {book.Discription}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            book.Availability === 'Available' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {book.Availability}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center font-medium text-blue-600">
                          {book.Rack}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                        {searchTerm ? 'No books match your search' : 'No books found for this department'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuperPg;