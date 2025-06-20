
// import React, { useContext, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   Box,
//   Typography,
//   List,
//   ListItem,
//   Paper,
//   TextField,
// } from "@mui/material";
// import Navbar from "./Navbar";
// import { AllDataContext } from "../context/AllDataContext";

// const CourseBooks = () => {
//   const { course } = useParams();
//   const { bookData } = useContext(AllDataContext);
//   const navigate = useNavigate();
//   const [searchQuery, setSearchQuery] = useState("");

//   const books =
//     bookData?.filter(
//       (book) =>
//         book.Department?.toLowerCase().replace(/\s+/g, "-") === course
//     ) || [];

//   const filteredBooks = books
//     .filter(
//       (book) =>
//         book.Bookname.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         book.Author.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//     .sort((a, b) => {
//       const aMatches =
//         a.Bookname.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         a.Author.toLowerCase().includes(searchQuery.toLowerCase());
//       const bMatches =
//         b.Bookname.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         b.Author.toLowerCase().includes(searchQuery.toLowerCase());

//       if (aMatches && !bMatches) return -1;
//       if (!aMatches && bMatches) return 1;
//       return 0;
//     });

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
//             mt: 9,
//           }}
//         >
//           {course ? course.replace(/-/g, " ").toUpperCase() : "Books"}
//         </Typography>

//         <Typography
//           variant="h6"
//           align="center"
//           sx={{
//             backgroundColor: "#cce0ff",
//             padding: "10px",
//             borderRadius: "8px",
//             mb: 3,
//             color: "#003366",
//           }}
//         >
//           Total Books: {filteredBooks.length}
//         </Typography>

//         <TextField
//           label="Search Books"
//           variant="outlined"
//           fullWidth
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           sx={{
//             marginBottom: "30px",
//             backgroundColor: "white",
//             borderRadius: "5px",
//           }}
//         />

//         <List sx={{ padding: 0 }}>
//           {filteredBooks.length > 0 ? (
//             filteredBooks.map((book) => (
//               <ListItem
//                 key={book.Bookid}
//                 component={Paper}
//                 sx={{
//                   padding: "15px",
//                   marginBottom: "15px",
//                   backgroundColor: "#e6efff",
//                   borderLeft: "6px solid #005b96",
//                   borderRadius: "6px",
//                   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
//                   transition: "all 0.3s ease",
//                   cursor: "pointer",
//                   fontWeight: 500,
//                   "&:hover": {
//                     backgroundColor: "#cce0ff",
//                     transform: "translateY(-3px)",
//                     color: "#002244",
//                   },
//                 }}
//                 onClick={() =>
//                   navigate(
//                     `/book-details/${book.Bookname.replace(/\s+/g, "-").toLowerCase()}`
//                   )
//                 }
//               >
//                 <Box>
//                   <Typography variant="h6" sx={{ color: "#003366" }}>
//                     {book.Bookname}
//                   </Typography>
//                   <Typography variant="body2" sx={{ color: "#333" }}>
//                     Author: {book.Author}
//                   </Typography>
//                   <Typography variant="body2" sx={{ color: "#333" }}>
//                     Book ID: {book.Bookid}
//                   </Typography>
//                   {/* ✅ Corrected: Display Rack */}
//                   {book.Rack ? (
//                     <Typography variant="body2" sx={{ color: "#333" }}>
//                       Rack Number: {book.Rack}
//                     </Typography>
//                   ) : (
//                     <Typography variant="body2" sx={{ color: "#999" }}>
//                       Rack Number: Not available
//                     </Typography>
//                   )}
//                 </Box>
//               </ListItem>
//             ))
//           ) : (
//             <ListItem>
//               <Typography
//                 variant="body1"
//                 align="center"
//                 sx={{ width: "100%", color: "#555" }}
//               >
//                 No books found.
//               </Typography>
//             </ListItem>
//           )}
//         </List>
//       </Box>
//     </div>
//   );
// };

// export default CourseBooks;




import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  List,
  ListItem,
  Paper,
  TextField,
  Chip,
  Container,
  useTheme,
  useMediaQuery,
  Avatar,
  IconButton,
  InputAdornment,
  CircularProgress,
  Badge
} from "@mui/material";
import Navbar from "./Navbar";
import { AllDataContext } from "../context/AllDataContext";
import {
  Search,
  MenuBook,
  Person,
  Numbers,
  LocationOn,
  FilterList,
  Sort
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const BookCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderLeft: `4px solid ${theme.palette.primary.main}`,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  transition: theme.transitions.create(['transform', 'box-shadow'], {
    duration: theme.transitions.duration.standard,
  }),
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: theme.shadows[4],
    backgroundColor: theme.palette.action.hover,
    cursor: 'pointer'
  },
}));

const CourseBooks = () => {
  const { course } = useParams();
  const { bookData } = useContext(AllDataContext);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const books =
    bookData?.filter(
      (book) =>
        book.Department?.toLowerCase().replace(/\s+/g, "-") === course
    ) || [];

  const filteredBooks = books
    .filter(
      (book) =>
        book.Bookname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.Author.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      // Search relevance sorting
      const aMatches =
        a.Bookname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.Author.toLowerCase().includes(searchQuery.toLowerCase());
      const bMatches =
        b.Bookname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.Author.toLowerCase().includes(searchQuery.toLowerCase());

      if (aMatches && !bMatches) return -1;
      if (!aMatches && bMatches) return 1;
      
      // Additional sorting
      if (sortBy === "title") {
        return a.Bookname.localeCompare(b.Bookname);
      } else if (sortBy === "author") {
        return a.Author.localeCompare(b.Author);
      }
      return 0;
    });

  const courseName = course ? course.replace(/-/g, " ") : "Books";

  return (
    <Box sx={{ 
      backgroundColor: theme.palette.grey[50], 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Navbar />
      
      <Container maxWidth="md" sx={{ 
        flex: 1,
        py: { xs: 3, md: 4 },
        px: { xs: 2, sm: 3 }
      }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          mb: 4
        }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              color: theme.palette.primary.dark,
              fontWeight: 700,
              mb: 1,
              mt: { xs: 2, md: 13 },
              textAlign: 'center'
            }}
          >
            {courseName}
          </Typography>
          
          <Badge 
            badgeContent={filteredBooks.length} 
            color="primary"
            sx={{ mb: 3 }}
          >
            <Chip
              icon={<MenuBook />}
              label="Available Books"
              variant="outlined"
              color="primary"
              sx={{ 
                fontSize: isMobile ? '0.875rem' : '1rem',
                padding: isMobile ? '4px 8px' : '6px 12px'
              }}
            />
          </Badge>
        </Box>

        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          mb: 3,
          flexDirection: isMobile ? 'column' : 'row'
        }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search by title or author"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="action" />
                </InputAdornment>
              ),
            }}
            sx={{
              backgroundColor: 'background.paper',
              flexGrow: 1
            }}
          />
          
          <Box sx={{ 
            display: 'flex',
            gap: 1,
            width: isMobile ? '100%' : 'auto'
          }}>
            <IconButton
              onClick={() => setSortBy(sortBy === "title" ? "author" : "title")}
              sx={{
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 1
              }}
              aria-label={sortBy === "title" ? "Sort by author" : "Sort by title"}
            >
              {sortBy === "title" ? <Person /> : <MenuBook />}
            </IconButton>
            
            <IconButton
              sx={{
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 1
              }}
              aria-label="Filter options"
            >
              <FilterList />
            </IconButton>
          </Box>
        </Box>

        {filteredBooks.length > 0 ? (
          <List sx={{ padding: 0 }}>
            {filteredBooks.map((book) => (
              <BookCard 
                key={book.Bookid}
                elevation={2}
                onClick={() =>
                  navigate(
                    `/book-details/${book.Bookname.replace(/\s+/g, "-").toLowerCase()}`
                  )
                }
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <Avatar 
                    variant="rounded"
                    sx={{ 
                      bgcolor: theme.palette.primary.light,
                      color: theme.palette.primary.dark,
                      mr: 2,
                      width: 56, 
                      height: 56 
                    }}
                  >
                    <MenuBook />
                  </Avatar>
                  
                  <Box sx={{ flex: 1 }}>
                    <Typography 
                      variant="h6" 
                      component="div"
                      sx={{ 
                        fontWeight: 600,
                        mb: 0.5
                      }}
                    >
                      {book.Bookname}
                    </Typography>
                    
                    <Box sx={{ 
                      display: 'flex', 
                      flexWrap: 'wrap',
                      gap: 1,
                      mb: 1.5
                    }}>
                      <Chip
                        icon={<Person fontSize="small" />}
                        label={book.Author}
                        size="small"
                        variant="outlined"
                      />
                      <Chip
                        icon={<Numbers fontSize="small" />}
                        label={`ID: ${book.Bookid}`}
                        size="small"
                        variant="outlined"
                      />
                      {book.Rack && (
                        <Chip
                          icon={<LocationOn fontSize="small" />}
                          label={`Rack: ${book.Rack}`}
                          size="small"
                          variant="outlined"
                          color="secondary"
                        />
                      )}
                    </Box>
                  </Box>
                </Box>
              </BookCard>
            ))}
          </List>
        ) : (
          <Paper sx={{ 
            p: 4, 
            textAlign: 'center',
            backgroundColor: 'background.paper'
          }}>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
              No books found
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {searchQuery ? 
                "Try a different search term" : 
                "No books available for this course"}
            </Typography>
          </Paper>
        )}
      </Container>
    </Box>
  );
};

export default CourseBooks;