// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   List,
//   ListItem,
//   Paper,
//   CircularProgress,
// } from "@mui/material";
// import Navbar from "./Navbar";

// const InstitutionCourses = () => {
//   const [bookCount, setBookCount] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const engineeringCourses = [
//     "Tamil",
//     "English",
//     "Maths",
//     "Physics",
//     "Chemistry",
//     "First-Year Common Course",
//     "BE-CSE",
//     "BTech-IT",
//     "BTech-AIDS",
//     "BE-Cyber Security",
//     "BE-ECE",
//     "BE-Mechanical",
//     "BTech-Agriculture Engineering",
//     "BE-Biomedical",
//   ];

//   useEffect(() => {
//     const fetchBookCount = async () => {
//       try {
//         const response = await axios.get("http://localhost:9000/books/count");
//         setBookCount(response.data.count); // This gets the valid count
//       } catch (error) {
//         console.error("Error fetching book count:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchBookCount();
//   }, []);

//   return (
//     <div style={{ backgroundColor: "#f2f6fa", minHeight: "100vh" }}>
//       <Navbar />
//       <Box
//         sx={{
//           padding: { xs: "20px", md: "40px" },
//           maxWidth: "900px",
//           margin: "0 auto",
//         }}
//       >
//         <Typography
//           variant="h4"
//           align="center"
//           sx={{
//             color: "#003366",
//             fontWeight: "bold",
//             mb: 4,
//             mt: 10,
//           }}
//         >
//           ENGINEERING COURSES
//         </Typography>

//         {/* 📚 Text Book Count Box
//         <Paper
//           elevation={3}
//           sx={{
//             backgroundColor: "#dff0ff",
//             borderLeft: "6px solid #007acc",
//             padding: "20px",
//             mb: 4,
//             borderRadius: "8px",
//             textAlign: "center",
//           }}
//         >
//           {loading ? (
//             <CircularProgress size={25} />
//           ) : (
//             <Typography
//               variant="h6"
//               sx={{ color: "#003366", fontWeight: 500 }}
//             >
//               Total Text Books: {bookCount}
//             </Typography>
//           )}
//         </Paper> */}

//         {/* 📘 Course List */}
//         <List sx={{ padding: 0 }}>
//           {engineeringCourses.map((course, index) => (
//             <ListItem
//               key={index}
//               component={Paper}
//               sx={{
//                 padding: "15px",
//                 marginBottom: "15px",
//                 backgroundColor: "#e6efff",
//                 borderLeft: "6px solid #005b96",
//                 borderRadius: "6px",
//                 boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
//                 transition: "all 0.3s ease",
//                 "&:hover": {
//                   backgroundColor: "#cce0ff",
//                   transform: "translateY(-3px)",
//                 },
//               }}
//             >
//               <Link
//                 to={`/courses/engineering/${course
//                   .toLowerCase()
//                   .replace(/ /g, "-")}`}
//                 style={{
//                   textDecoration: "none",
//                   color: "#002244",
//                   fontSize: "18px",
//                   fontWeight: "500",
//                   width: "100%",
//                   textAlign: "center",
//                 }}
//               >
//                 {course}
//               </Link>
//             </ListItem>
//           ))}
//         </List>
//       </Box>
//     </div>
//   );
// };

// export default InstitutionCourses;




import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { 
  Box, 
  Typography, 
  Paper, 
  CircularProgress,
  Chip,
  Avatar,
  useMediaQuery,
  useTheme
} from "@mui/material";
import Navbar from "./Navbar";
import { motion } from "framer-motion";
import { 
  School,
  Science,
  Calculate,
  Language,
  Computer,
  Security,
  Engineering,
  LocalLibrary,
  Biotech,
  Agriculture
} from "@mui/icons-material";

const InstitutionCourses = () => {
  const [bookCount, setBookCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const engineeringCourses = [
    { name: "Tamil", icon: <Language /> },
    { name: "English", icon: <Language /> },
    { name: "Maths", icon: <Calculate /> },
    { name: "Physics", icon: <Science /> },
    { name: "Chemistry", icon: <Science /> },
    { name: "First-Year Common Course", icon: <School /> },
    { name: "BE-CSE", icon: <Computer /> },
    { name: "BTech-IT", icon: <Computer /> },
    { name: "BTech-AIDS", icon: <Computer /> },
    { name: "BE-Cyber Security", icon: <Security /> },
    { name: "BE-ECE", icon: <Engineering /> },
    { name: "BE-Mechanical", icon: <Engineering /> },
    { name: "BTech-Agriculture Engineering", icon: <Agriculture /> },
    { name: "BE-Biomedical", icon: <Biotech /> },
  ];

  useEffect(() => {
    const fetchBookCount = async () => {
      try {
        const response = await axios.get("http://localhost:9000/books/count");
        setBookCount(response.data.count);
      } catch (error) {
        console.error("Error fetching book count:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchBookCount();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div style={{ 
      backgroundColor: "#f8fafc", 
      minHeight: "100vh",
      backgroundImage: "radial-gradient(#e2e8f0 1px, transparent 1px)",
      backgroundSize: "20px 20px"
    }}>
      <Navbar />
      <Box
        sx={{
          padding: isMobile ? "16px" : "32px",
          maxWidth: "900px",
          margin: "0 auto",
          pt: 12
        }}
      >
        {/* Header Section */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant={isMobile ? "h4" : "h3"}
            align="center"
            sx={{
              color: "#1e3a8a",
              fontWeight: "bold",
              mb: 2,
              background: "linear-gradient(90deg, #1e40af, #3b82f6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            Engineering Courses
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Explore our comprehensive range of engineering programs and resources
          </Typography>
        </motion.div>

        {/* Book Count Card */}
        {bookCount !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Paper
              elevation={0}
              sx={{
                backgroundColor: "#e0f2fe",
                p: 3,
                mb: 4,
                borderRadius: 3,
                textAlign: "center",
                borderLeft: "4px solid #0369a1",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)"
              }}
            >
              {loading ? (
                <CircularProgress size={25} color="primary" />
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <LocalLibrary sx={{ mr: 2, color: "#0369a1", fontSize: "2rem" }} />
                  <Typography
                    variant="h6"
                    sx={{ 
                      color: "#075985",
                      fontWeight: 600,
                      "& span": {
                        fontWeight: 700,
                        color: "#1e40af"
                      }
                    }}
                  >
                    Total Text Books: <span>{bookCount}</span>
                  </Typography>
                </Box>
              )}
            </Paper>
          </motion.div>
        )}

        {/* Courses List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          sx={{ width: '100%' }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: 2
            }}
          >
            {engineeringCourses.map((course, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <Paper
                  component={Link}
                  to={`/courses/engineering/${course.name
                    .toLowerCase()
                    .replace(/ /g, "-")}`}
                  elevation={2}
                  sx={{
                    p: 3,
                    display: 'flex',
                    alignItems: 'center',
                    textDecoration: 'none',
                    borderRadius: 2,
                    backgroundColor: "#ffffff",
                    transition: 'all 0.3s ease',
                    borderLeft: "4px solid #3b82f6",
                    "&:hover": {
                      backgroundColor: "#f0f9ff",
                      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                      transform: "translateY(-3px)"
                    }
                  }}
                >
                  <Avatar sx={{ 
                    mr: 2, 
                    bgcolor: "#dbeafe",
                    color: "#1e40af",
                    width: 40, 
                    height: 40 
                  }}>
                    {course.icon}
                  </Avatar>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#1e3a8a",
                      fontWeight: 600,
                      flexGrow: 1
                    }}
                  >
                    {course.name}
                  </Typography>
                  <Chip 
                    label="View" 
                    size="small" 
                    color="primary"
                    sx={{ 
                      fontWeight: 600,
                      borderRadius: 1
                    }}
                  />
                </Paper>
              </motion.div>
            ))}
          </Box>
        </motion.div>
      </Box>
    </div>
  );
};

export default InstitutionCourses;