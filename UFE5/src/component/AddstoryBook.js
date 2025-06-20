// import React, { useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { PlusCircle } from "lucide-react";
// import Adminnav from "./Adminnav";

// const AddStoryBook = () => {
//   const [formData, setFormData] = useState({
//     Bookid: "",
//     Bookname: "",
//     Author: "",
//     Description: "",
//     Availability: "",
//     RackNumber: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:9000/storybook/add", formData);
//       alert("Story book added successfully!");
//       setFormData({
//         Bookid: "",
//         Bookname: "",
//         Author: "",
//         Description: "",
//         Availability: "",
//         RackNumber: "",
//       });
//     } 

//      catch (err) {
//       console.error(err);
//       alert("❌ Something went wrong while adding the book.");
//     }
  
//   };

//   return (
//     <div className="max-w-xl mx-auto px-6 py-10">
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
//                   <Adminnav />
//       <motion.h2
//         className="text-3xl font-bold text-indigo-700 mb-6 text-center flex justify-center items-center gap-2"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <PlusCircle className="w-7 h-7" />
//         Non Academic Books
//       </motion.h2>

//       <motion.form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-md rounded-2xl p-6 space-y-4 border border-gray-100"
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.2 }}
//       >
//         {[
//           { label: "Book ID", name: "Bookid" },
//           { label: "Book Name", name: "Bookname" },
//           { label: "Author", name: "Author" },
//           { label: "Description", name: "Description" },
//           { label: "Availability", name: "Availability" },
//           { label: "Rack Number", name: "RackNumber" },
//         ].map((field, index) => (
//           <div key={index}>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               {field.label}
//             </label>
//             <input
//               type="text"
//               name={field.name}
//               value={formData[field.name]}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//               required
//             />
//           </div>
//         ))}

//         <motion.button
//           type="submit"
//           className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-all duration-300"
//           whileHover={{ scale: 1.03 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           Add Book
//         </motion.button>
//       </motion.form>
//     </div>
//     </div>
//   );
// };

// export default AddStoryBook;




import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";
import Adminnav from "./Adminnav";

const AddStoryBook = () => {
  const [formData, setFormData] = useState({
    Bookid: "",
    Bookname: "",
    Author: "",
    Description: "",
    Availability: "",
    RackNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:9000/storybook/add", formData);
      alert("📚 Story book added successfully!");
      setFormData({
        Bookid: "",
        Bookname: "",
        Author: "",
        Description: "",
        Availability: "",
        RackNumber: "",
      });
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong while adding the book.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Adminnav />
      <div className="flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="w-full max-w-2xl bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-gray-200"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-4xl font-bold text-indigo-700 mb-8 text-center flex justify-center items-center gap-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <PlusCircle className="w-8 h-8" />
            Add Non-Academic Book
          </motion.h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              { label: "Book ID", name: "Bookid" },
              { label: "Book Name", name: "Bookname" },
              { label: "Author", name: "Author" },
              { label: "Description", name: "Description" },
              { label: "Availability", name: "Availability" },
              { label: "Rack Number", name: "RackNumber" },
            ].map((field, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <label className="block text-sm font-semibold text-gray-800 mb-1">
                  {field.label}
                </label>
                <input
                  type="text"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  className="w-full px-4 py-2 border rounded-xl shadow-sm bg-white/80 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                  required
                />
              </motion.div>
            ))}

            <motion.button
              type="submit"
              className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-xl transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
            >
              Add Book
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddStoryBook;

