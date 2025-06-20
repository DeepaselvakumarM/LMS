// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import SuperNav from "./SuperNav";

// const engineeringDepartments = ["Common","CSE", "IT", "AIDS","Cyber security","ECE", "Mechanical", "Agri","Bio medical"];

// const SuperEBook = () => {
//   const [selectedDepartment, setSelectedDepartment] = useState("CSE");
//   const [books, setBooks] = useState([]);

//   const fetchBooks = async () => {
//     try {
//       const res = await axios.get("http://localhost:9000/books/getbook");
//       const filteredBooks = res.data.message
//         .filter((book) => book.Department === selectedDepartment)
//         .sort((a, b) => a.Rack - b.Rack);
//       setBooks(filteredBooks);
//     } catch (error) {
//       console.error("Error fetching engineering books:", error);
//     }
//   };

//   useEffect(() => {
//     fetchBooks();
//   }, [selectedDepartment]);

//   return (
            
//     <div className="min-h-screen bg-gray-100 pt-24 px-6 md:px-12">
//        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
//             <SuperNav />
//       <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
//         Engineering Books
//       </h1>

//       <div className="flex flex-wrap justify-center gap-4 mb-8">
//         {engineeringDepartments.map((dept) => (
//           <button
//             key={dept}
//             onClick={() => setSelectedDepartment(dept)}
//             className={`px-4 py-2 rounded-md text-white ${
//               selectedDepartment === dept ? "bg-blue-600" : "bg-gray-400"
//             }`}
//           >
//             {dept}
//           </button>
//         ))}
//       </div>

//       <div className="overflow-x-auto shadow-md rounded-lg bg-white">
//         <table className="w-full text-center">
//           <thead className="bg-blue-800 text-white">
//             <tr>
//               <th className="px-4 py-3">Book ID</th>
//               <th className="px-4 py-3">Book Name</th>
//               <th className="px-4 py-3">Description</th>
//               <th className="px-4 py-3">Availability</th>
//               <th className="px-4 py-3">Rack No</th>
//             </tr>
//           </thead>
//           <tbody>
//             {books.map((book) => (
//               <tr key={book.Bookid} className="border-b hover:bg-gray-100">
//                 <td className="px-4 py-2">{book.Bookid}</td>
//                 <td className="px-4 py-2">{book.Bookname}</td>
//                 <td className="px-4 py-2">{book.Discription || book.Description}</td>
//                 <td className="px-4 py-2">{book.Availability}</td>
//                 <td className="px-4 py-2">{book.Rack}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         {books.length === 0 && (
//           <p className="text-center p-4 text-gray-500">No books found in this department.</p>
//         )}
//       </div>
//     </div>
//     </div>
//   );
// };

// export default SuperEBook;



import React, { useEffect, useState } from "react";
import axios from "axios";
import SuperNav from "./SuperNav";
import { FiBook, FiSearch, FiFilter, FiInfo } from "react-icons/fi";

const engineeringDepartments = [
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
    "BE-Biomedical",
];

const availabilityOptions = ["All", "Available", "Checked Out"];

const SuperEBook = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("CSE");
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAvailability, setSelectedAvailability] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBooks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.get("http://localhost:9000/books/getbook");
      let filteredBooks = res.data.message
        .filter((book) => book.Department === selectedDepartment);
      
      if (selectedAvailability !== "All") {
        filteredBooks = filteredBooks.filter(
          (book) => book.Availability === selectedAvailability
        );
      }
      
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filteredBooks = filteredBooks.filter(
          (book) =>
            book.Bookname.toLowerCase().includes(term) ||
            (book.Discription && book.Discription.toLowerCase().includes(term)) ||
            (book.Description && book.Description.toLowerCase().includes(term)) ||
            book.Bookid.toString().includes(term)
        );
      }
      
      filteredBooks = filteredBooks.sort((a, b) => a.Rack - b.Rack);
      setBooks(filteredBooks);
    } catch (error) {
      console.error("Error fetching engineering books:", error);
      setError("Failed to fetch books. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [selectedDepartment, selectedAvailability]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBooks();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <SuperNav />
      
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <FiBook className="text-blue-600 text-3xl mr-3 mt-28" />
            <h1 className="text-3xl font-bold text-gray-800">
              Engineering Books
            </h1>
          </div>
          
          <div className="w-full md:w-auto">
            <form onSubmit={handleSearch} className="flex">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search books..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg transition duration-200"
              >
                Search
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-8">
          {/* Department Filter */}
          <div className="w-full md:w-1/2">
            <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
              <FiFilter className="mr-2" /> Departments
            </h2>
            <div className="flex flex-wrap gap-2">
              {engineeringDepartments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedDepartment === dept
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>
          
          Availability Filter
          <div className="w-full md:w-1/2">
            <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
              <FiInfo className="mr-2" /> Availability
            </h2>
            <div className="flex flex-wrap gap-2">
              {availabilityOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setSelectedAvailability(option)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedAvailability === option
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            <p>{error}</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Book ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Book Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Availability
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rack No
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {books.length > 0 ? (
                    books.map((book) => (
                      <tr key={book.Bookid} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {book.Bookid}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold">
                          {book.Bookname}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">
                          {book.Discription || book.Description || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              book.Availability === "Available"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {book.Availability}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {book.Rack}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                        No books found matching your criteria.
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

export default SuperEBook;