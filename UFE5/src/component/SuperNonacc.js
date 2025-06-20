// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import SuperNav from "./SuperNav";
// import {
//   Container,
//   Typography,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   CircularProgress,
//   Box,
// } from "@mui/material";
// import AutoStoriesIcon from '@mui/icons-material/AutoStories';

// const Adminstory = () => {
//   const [storyBooks, setStoryBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     axios
//       .get("http://localhost:9000/storybook/list")
//       .then((res) => {
//         setStoryBooks(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Failed to fetch story books:", err);
//         setError("Failed to load story books.");
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <>
//       <SuperNav />
//       <Box sx={{ background: "linear-gradient(to right, #e0f2f1, #e1f5fe)", minHeight: "100vh", pt: 10 }}>
//         <Container maxWidth="lg">
//           <Paper elevation={3} sx={{ p: 4, borderRadius: 5, backdropFilter: "blur(6px)", background: "rgba(255, 255, 255, 0.85)" }}>
//             <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
//               <AutoStoriesIcon color="primary" sx={{ mr: 1 }} />
//               <Typography variant="h4" fontWeight="bold" color="primary">
//                 Non Academic Books
//               </Typography>
//             </Box>

//             {loading ? (
//               <CircularProgress sx={{ display: "block", mx: "auto", mt: 4 }} />
//             ) : error ? (
//               <Typography color="error" align="center" mt={4}>
//                 {error}
//               </Typography>
//             ) : (
//               <TableContainer component={Paper} sx={{ borderRadius: 3, mt: 2, boxShadow: 2 }}>
//                 <Table>
//                   <TableHead sx={{ backgroundColor: "#e3f2fd" }}>
//                     <TableRow>
//                       <TableCell><strong>Book ID</strong></TableCell>
//                       <TableCell><strong>Book Name</strong></TableCell>
//                       <TableCell><strong>Author</strong></TableCell>
//                       <TableCell><strong>Description</strong></TableCell>
//                       <TableCell><strong>Rack Number</strong></TableCell>
//                       <TableCell><strong>Availability</strong></TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {storyBooks.map((book) => (
//                       <TableRow
//                         key={book._id}
//                         hover
//                         sx={{
//                           transition: "0.2s",
//                           "&:hover": {
//                             backgroundColor: "#f1f8ff",
//                           },
//                         }}
//                       >
//                         <TableCell>{book.Bookid}</TableCell>
//                         <TableCell>{book.Bookname}</TableCell>
//                         <TableCell>{book.Author}</TableCell>
//                         <TableCell>{book.Description || book.Discription}</TableCell>
//                         <TableCell>{book.RackNumber}</TableCell>
//                         <TableCell>{book.Availability}</TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             )}
//           </Paper>
//         </Container>
//       </Box>
//     </>
//   );
// };

// export default Adminstory;




import React, { useEffect, useState } from "react";
import axios from "axios";
import SuperNav from "./SuperNav";
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Box,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  AutoStories as BookIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as AvailableIcon,
  Cancel as UnavailableIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";

const Adminstory = () => {
  const [storyBooks, setStoryBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchStoryBooks();
  }, []);

  const fetchStoryBooks = () => {
    setLoading(true);
    setError("");
    axios
      .get("http://localhost:9000/storybook/list")
      .then((res) => {
        setStoryBooks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch story books:", err);
        setError("Failed to load story books. Please try again.");
        setLoading(false);
      });
  };

  const handleDeleteClick = (book) => {
    setSelectedBook(book);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    if (!selectedBook) return;
    
    axios.delete(`http://localhost:9000/storybook/delete/${selectedBook._id}`)
      .then(() => {
        setSuccessMessage("Book deleted successfully!");
        fetchStoryBooks();
        setOpenDeleteDialog(false);
        setTimeout(() => setSuccessMessage(""), 3000);
      })
      .catch(err => {
        console.error("Failed to delete book:", err);
        setError("Failed to delete book. Please try again.");
      });
  };

  const filteredBooks = storyBooks.filter(book => 
    book.Bookname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.Author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.Bookid.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <SuperNav />
      <Box sx={{ 
        background: "linear-gradient(135deg, #e0f7fa 0%, #e1f5fe 100%)", 
        minHeight: "100vh", 
        pt: 10,
        pb: 4
      }}>
        <Container maxWidth="lg">
          <Paper elevation={3} sx={{ 
            p: 4, 
            borderRadius: 3, 
            background: "rgba(255, 255, 255, 0.95)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.1)"
          }}>
            <Box display="flex" flexDirection="column" gap={3}>
              {/* Header Section */}
              <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={2}>
                <Box display="flex" alignItems="center">
                  <BookIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                  <Typography variant="h4" fontWeight="bold" color="primary">
                    Non-Academic Books
                  </Typography>
                </Box>
                
                <Box display="flex" gap={2} flexWrap="wrap">
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Search books..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ width: 250 }}
                  />
                  
                  <Tooltip title="Refresh">
                    <IconButton onClick={fetchStoryBooks} color="primary">
                      <RefreshIcon />
                    </IconButton>
                  </Tooltip>
                  
                 
                </Box>
              </Box>

              {/* Status Messages */}
              {error && (
                <Alert severity="error" onClose={() => setError("")}>
                  {error}
                </Alert>
              )}
              
              {successMessage && (
                <Alert severity="success" onClose={() => setSuccessMessage("")}>
                  {successMessage}
                </Alert>
              )}

              {/* Content Section */}
              {loading ? (
                <Box display="flex" justifyContent="center" py={6}>
                  <CircularProgress size={60} thickness={4} />
                </Box>
              ) : filteredBooks.length === 0 ? (
                <Box textAlign="center" py={4}>
                  <Typography variant="h6" color="textSecondary">
                    {searchTerm ? "No books match your search" : "No books found"}
                  </Typography>
                </Box>
              ) : (
                <TableContainer component={Paper} sx={{ borderRadius: 2, mt: 2 }}>
                  <Table>
                    <TableHead sx={{ backgroundColor: "#e3f2fd" }}>
                      <TableRow>
                        <TableCell><strong>Book ID</strong></TableCell>
                        <TableCell><strong>Book Name</strong></TableCell>
                        <TableCell><strong>Author</strong></TableCell>
                        <TableCell><strong>Description</strong></TableCell>
                        <TableCell><strong>Rack No</strong></TableCell>
                        <TableCell align="center"><strong>Availability</strong></TableCell>
                        
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredBooks.map((book) => (
                        <TableRow
                          key={book._id}
                          hover
                          sx={{
                            "&:hover": {
                              backgroundColor: "#f5fbff",
                            },
                          }}
                        >
                          <TableCell>{book.Bookid}</TableCell>
                          <TableCell sx={{ fontWeight: 500 }}>{book.Bookname}</TableCell>
                          <TableCell>{book.Author}</TableCell>
                          <TableCell sx={{ maxWidth: 300 }}>
                            <Typography noWrap>
                              {book.Description || book.Discription || "N/A"}
                            </Typography>
                          </TableCell>
                          <TableCell>{book.RackNumber}</TableCell>
                          <TableCell align="center">
                            <Chip
                              label={book.Availability}
                              color={book.Availability === "Available" ? "success" : "error"}
                              icon={book.Availability === "Available" ? 
                                <AvailableIcon fontSize="small" /> : 
                                <UnavailableIcon fontSize="small" />}
                              size="small"
                              variant="outlined"
                            />
                          </TableCell>
                         
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Box>
          </Paper>
        </Container>

        {/* Delete Confirmation Dialog */}
        
      </Box>
    </>
  );
};

export default Adminstory;