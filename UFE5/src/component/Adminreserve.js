
// import React, { useState, useEffect } from "react"; 
// import axios from "axios";
// import Adminnav from "./Adminnav";

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
//       reserve.Course.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//   });

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
//       <Adminnav />
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
//                 <th className="px-4 py-2 border">Course</th>
//                 <th className="px-4 py-2 border">Reserved Date</th>
//                 <th className="px-4 py-2 border">Return Date</th>
//                 <th className="px-4 py-2 border">Action</th>
//               </tr>
//             </thead>
//             <tbody className="text-center">
//               {filteredBooks.length > 0 ? (
//                 filteredBooks.map((reserve, index) => (
//                   <tr key={index} className="hover:bg-blue-50">
//                     <td className="px-4 py-2 border">{reserve.Name}</td>
//                     <td className="px-4 py-2 border">{reserve.StudentID}</td>
//                     <td className="px-4 py-2 border">{reserve.Bookname}</td>
//                     <td className="px-4 py-2 border">{reserve.Course}</td>
//                     <td className="px-4 py-2 border">{reserve.ReserveDate}</td>
//                     <td className="px-4 py-2 border">{reserve.ReturnDate}</td>
//                     <td className="px-4 py-2 border">
//                       <button
//                         className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
//                         onClick={() => handleDelete(reserve._id, reserve.Bookname)}
//                       >
//                         Delete
//                       </button>
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
//   );
// };

// export default Adminreserve;





import React, { useState, useEffect } from "react";
import axios from "axios";
import Adminnav from "./Adminnav";

const Adminreserve = () => {
  const [reserveBooks, setReserveBooks] = useState([]);

  const URL = "http://localhost:9000/reserve/getreserve";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(URL);
        setReserveBooks(res.data.message);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (_id) => {
    if (!_id) return;

    try {
      const res = await axios.delete(
        `http://localhost:9000/reserve/deletereserve/${_id}`
      );
      if (res.status === 200) {
        alert("Book Deleted Successfully");
        setReserveBooks(reserveBooks.filter((book) => book._id !== _id));
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Adminnav />

      {/* Top spacing & layout */}
      <div className="px-6 mt-20">
        <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">Reserved Books</h1>

        <div className="overflow-x-auto bg-white shadow-xl rounded-2xl p-4">
          <table className="min-w-full table-auto border border-gray-300">
            <thead className="bg-blue-100">
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Student ID</th>
                <th className="px-4 py-2 border">Book Name</th>
                {/* <th className="px-4 py-2 border">Feedback</th> */}
                <th className="px-4 py-2 border">Reserved Date</th>
                <th className="px-4 py-2 border">Return Date</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {reserveBooks.length > 0 ? (
                reserveBooks.map((reserve, index) => (
                  <tr key={index} className="hover:bg-blue-50">
                    <td className="px-4 py-2 border">{reserve.Name}</td>
                    <td className="px-4 py-2 border">{reserve.StudentID}</td>
                    <td className="px-4 py-2 border">{reserve.Bookname}</td>
                    {/* <td className="px-4 py-2 border">{reserve.Feedback}</td> */}
                    <td className="px-4 py-2 border">{reserve.ReserveDate}</td>
                    <td className="px-4 py-2 border">{reserve.ReturnDate}</td>
                    <td className="px-4 py-2 border">
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        onClick={() => handleDelete(reserve._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-4 text-gray-500">
                    No reserved books found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Adminreserve;
