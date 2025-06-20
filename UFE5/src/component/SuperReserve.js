
// import React, { useState, useEffect } from "react"; 
// import axios from "axios";
// import SuperNav from "./SuperNav";
// // import Adminnav from "./Adminnav";

// const Adminreserve = () => {
//   const [reserveBooks, setReserveBooks] = useState([]);
//   const [searchQuery, setSearchQuery] = useState(""); // For the search input
//   const URL = "http://localhost:9000/reserve/getreserve";

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(URL);
//         setReserveBooks(res.data.message);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleDelete = async (_id, bookname) => {
//     if (!_id || !bookname) return;

//     try {
//       const res = await axios.delete(
//         `http://localhost:9000/reserve/deletereserve/${_id}`
//       );
//       if (res.status === 200) {
//         // Call to update the book availability
//         await axios.put("http://localhost:9000/reserve/decreaseAvailability", {
//           Bookname: bookname,
//         });
        
//         alert("Book Deleted Successfully");
//         setReserveBooks(reserveBooks.filter((book) => book._id !== _id));
//       }
//     } catch (error) {
//       console.error("Error deleting book:", error);
//     }
//   };

//   const filteredBooks = reserveBooks.filter((reserve) => {
//     return (
//       reserve.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       reserve.StudentID.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       reserve.Bookname.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       reserve.Feedback.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//   });

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
//       {/* <Adminnav /> */}
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
//                   <SuperNav />  
//       <div className="px-6 mt-20">
//         <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">Reserved Books</h1>

//         <div className="mb-4 flex justify-center">
//           <input
//             type="text"
//             placeholder="Search by Name, Student ID, Book Name, or Feedback"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="px-4 py-2 border rounded-lg w-1/3"
//           />
//         </div>

//         <div className="overflow-x-auto bg-white shadow-xl rounded-2xl p-4">
//           <table className="min-w-full table-auto border border-gray-300">
//             <thead className="bg-blue-100">
//               <tr>
//                 <th className="px-4 py-2 border">Name</th>
//                 <th className="px-4 py-2 border">Student ID</th>
//                 <th className="px-4 py-2 border">Book Name</th>
//                 <th className="px-4 py-2 border">Description</th>
//                 <th className="px-4 py-2 border">Reserved Date</th>
//                 <th className="px-4 py-2 border">Return Date</th>
               
//               </tr>
//             </thead>
//             <tbody className="text-center">
//               {filteredBooks.length > 0 ? (
//                 filteredBooks.map((reserve, index) => (
//                   <tr key={index} className="hover:bg-blue-50">
//                     <td className="px-4 py-2 border">{reserve.Name}</td>
//                     <td className="px-4 py-2 border">{reserve.StudentID}</td>
//                     <td className="px-4 py-2 border">{reserve.Bookname}</td>
//                     <td className="px-4 py-2 border">{reserve.Description}</td>
//                     <td className="px-4 py-2 border">{reserve.ReserveDate}</td>
//                     <td className="px-4 py-2 border">{reserve.ReturnDate}</td>
//                     <td className="px-4 py-2 border">
//                       {/* <button
//                         className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
//                         onClick={() => handleDelete(reserve._id, reserve.Bookname)}
//                       >
//                         Delete
//                       </button> */}
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="7" className="py-4 text-gray-500">
//                     No reserved books found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//     </div>
  
//   );
// };

// export default Adminreserve;


import React, { useState, useEffect } from "react";
import axios from "axios";
import SuperNav from "./SuperNav";
import { FiSearch, FiTrash2, FiCalendar, FiBook, FiUser, FiInfo } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Adminreserve = () => {
  const [reserveBooks, setReserveBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const URL = "http://localhost:9000/reserve/getreserve";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(URL);
        setReserveBooks(res.data.message);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load reserved books");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (_id, bookname) => {
    if (!_id || !bookname) return;

    if (!window.confirm("Are you sure you want to delete this reservation?")) {
      return;
    }

    try {
      const res = await axios.delete(
        `http://localhost:9000/reserve/deletereserve/${_id}`
      );
      if (res.status === 200) {
        await axios.put("http://localhost:9000/reserve/decreaseAvailability", {
          Bookname: bookname,
        });
        
        toast.success("Reservation deleted successfully");
        setReserveBooks(reserveBooks.filter((book) => book._id !== _id));
      }
    } catch (error) {
      console.error("Error deleting book:", error);
      toast.error("Failed to delete reservation");
    }
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedBooks = [...reserveBooks].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const filteredBooks = sortedBooks.filter((reserve) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      reserve.Name.toLowerCase().includes(searchLower) ||
      reserve.StudentID.toLowerCase().includes(searchLower) ||
      reserve.Bookname.toLowerCase().includes(searchLower) ||
      (reserve.Description && reserve.Description.toLowerCase().includes(searchLower))
    );
  });

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? '↑' : '↓';
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <SuperNav />
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="container mx-auto px-4 py-8  mt-99 ">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 ">
            <h1 className="text-3xl font-bold text-blue-800 mb-4 md:mb-0 ">
              Book Reservations Management
            </h1>
            
            <div className="relative w-full md:w-1/3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search reservations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {isLoading ? (
              <div className="flex justify-center items-center p-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-blue-600 text-white">
                    <tr>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort('Name')}
                      >
                        <div className="flex items-center">
                          <FiUser className="mr-2" />
                          Student {getSortIndicator('Name')}
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort('StudentID')}
                      >
                        Student ID {getSortIndicator('StudentID')}
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort('Bookname')}
                      >
                        <div className="flex items-center">
                          <FiBook className="mr-2" />
                          Book {getSortIndicator('Bookname')}
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort('Description')}
                      >
                        <div className="flex items-center">
                          <FiInfo className="mr-2" />
                          Description {getSortIndicator('Description')}
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort('ReserveDate')}
                      >
                        <div className="flex items-center">
                          <FiCalendar className="mr-2" />
                          Reserved {getSortIndicator('ReserveDate')}
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort('ReturnDate')}
                      >
                        <div className="flex items-center">
                          <FiCalendar className="mr-2" />
                          Due {getSortIndicator('ReturnDate')}
                        </div>
                      </th>
                      
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredBooks.length > 0 ? (
                      filteredBooks.map((reserve, index) => (
                        <tr key={index} className="hover:bg-blue-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{reserve.Name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                            {reserve.StudentID}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-blue-600">{reserve.Bookname}</div>
                          </td>
                          <td className="px-6 py-4 max-w-xs">
                            <div className="text-sm text-gray-500 truncate" title={reserve.Description}>
                              {reserve.Description || "N/A"}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(reserve.ReserveDate)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(reserve.ReturnDate)}
                          </td>

                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                          {searchQuery ? "No matching reservations found" : "No reservations available"}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {!isLoading && (
            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredBooks.length} of {reserveBooks.length} reservations
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Adminreserve;