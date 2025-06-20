



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
// import MenuBookIcon from '@mui/icons-material/MenuBook';

// const ReferenceDetails = () => {
//   const [referenceBooks, setReferenceBooks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .get("http://localhost:9000/api/referencebooks/")
//       .then((res) => {
//         setReferenceBooks(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Failed to fetch reference books:", err);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <>
//       <SuperNav />
//       <Box sx={{ background: "linear-gradient(to right, #e0f7fa, #e1f5fe)", minHeight: "100vh", pt: 10 }}>
//         <Container maxWidth="lg">
//           <Paper elevation={3} sx={{ p: 4, borderRadius: 5, backdropFilter: "blur(6px)", background: "rgba(255, 255, 255, 0.8)" }}>
//             <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
//               <MenuBookIcon color="primary" sx={{ mr: 1 }} />
//               <Typography variant="h4" color="primary" fontWeight="bold">
//                 Reference Books
//               </Typography>
//             </Box>

//             {loading ? (
//               <CircularProgress sx={{ display: "block", mx: "auto", mt: 4 }} />
//             ) : (
//               <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 2 }}>
//                 <Table>
//                   <TableHead sx={{ backgroundColor: "#e3f2fd" }}>
//                     <TableRow>
//                       <TableCell><strong>Book ID</strong></TableCell>
//                       <TableCell><strong>Book Name</strong></TableCell>
//                       <TableCell><strong>Author</strong></TableCell>
//                       <TableCell><strong>Description</strong></TableCell>
//                       <TableCell><strong>Availability</strong></TableCell>
//                       <TableCell><strong>Rack Number</strong></TableCell>
//                       <TableCell><strong>Category</strong></TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {referenceBooks.map((book) => (
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
//                         <TableCell>{book.Availability}</TableCell>
//                         <TableCell>{book.RackNumber}</TableCell>
//                         <TableCell>{book.Category}</TableCell>
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

// export default ReferenceDetails;



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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
  Tooltip,
  Badge
} from "@mui/material";
import {
  MenuBook as BookIcon,
  Search as SearchIcon,
  FilterAlt as FilterIcon,
  Refresh as RefreshIcon,
  CheckCircle as AvailableIcon,
  Cancel as UnavailableIcon,
  Category as CategoryIcon,
  Info as InfoIcon
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const StatusChip = styled(Chip)(({ theme, status }) => ({
  backgroundColor: status === 'Available' ? 
    theme.palette.success.light : theme.palette.error.light,
  color: status === 'Available' ? 
    theme.palette.success.dark : theme.palette.error.dark,
  fontWeight: 500,
}));

const ReferenceDetails = () => {
  const [referenceBooks, setReferenceBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [page, setPage] = useState(1);
  const rowsPerPage = 8;

  useEffect(() => {
    fetchReferenceBooks();
  }, []);

  const fetchReferenceBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("http://localhost:9000/api/referencebooks/");
      setReferenceBooks(res.data);
    } catch (err) {
      console.error("Failed to fetch reference books:", err);
      setError("Failed to load reference books. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    setPage(1);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setPage(1);
  };

  const handleCategoryChange = (event) => {
    setCategoryFilter(event.target.value);
    setPage(1);
  };

  const filteredBooks = referenceBooks.filter((book) => {
    // Search filter
    const matchesSearch = 
      book.Bookname.toLowerCase().includes(searchTerm) ||
      book.Author.toLowerCase().includes(searchTerm) ||
      (book.Description && book.Description.toLowerCase().includes(searchTerm)) ||
      (book.Discription && book.Discription.toLowerCase().includes(searchTerm)) ||
      book.Bookid.toString().includes(searchTerm) ||
      book.Category.toLowerCase().includes(searchTerm);

    // Availability filter
    const matchesAvailability = 
      filter === "all" || 
      (filter === "available" && book.Availability === "Available") ||
      (filter === "unavailable" && book.Availability !== "Available");

    // Category filter
    const matchesCategory = 
      categoryFilter === "all" || 
      book.Category === categoryFilter;

    return matchesSearch && matchesAvailability && matchesCategory;
  });

  const paginatedBooks = filteredBooks.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // Extract unique categories for filter
  const categories = [...new Set(referenceBooks.map(book => book.Category))];

  return (
    <>
      <SuperNav />
      <Box sx={{ 
        background: "linear-gradient(135deg, #e0f7fa 0%, #e1f5fe 100%)", 
        minHeight: "100vh",
        py: 8,
        px: { xs: 2, sm: 4 }
      }}>
        <Container maxWidth="xl">
          <Paper elevation={3} sx={{ 
            p: { xs: 2, md: 4 }, 
            borderRadius: 4,
            background: "rgba(255, 255, 255, 0.92)",
            backdropFilter: "blur(8px)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.1)"
          }}>
            {/* Header Section */}
            <Box display="flex" flexDirection={{ xs: "column", md: "row" }} 
              alignItems="center" justifyContent="space-between" mb={4}>
              <Box display="flex" alignItems="center" gap={2}>
                <Badge badgeContent={referenceBooks.length} color="primary">
                  <BookIcon color="primary" sx={{ fontSize: 40 }} />
                </Badge>
                <Typography variant="h4" fontWeight="bold" color="primary">
                  Reference Books
                </Typography>
              </Box>
              
              <Tooltip title="Refresh data">
                <IconButton color="primary" onClick={fetchReferenceBooks}>
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
            </Box>

            {/* Search and Filter Section */}
            <Box display="flex" flexDirection={{ xs: "column", md: "row" }} 
              gap={3} alignItems="center" mb={4}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search reference books..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                onChange={handleSearch}
                sx={{
                  maxWidth: 500,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    background: "rgba(255, 255, 255, 0.8)"
                  }
                }}
              />
              
              <Box display="flex" gap={2} width={{ xs: "100%", md: "auto" }}>
                <FormControl sx={{ minWidth: 150 }} size="small">
                  <InputLabel><FilterIcon sx={{ fontSize: 18, mr: 1 }} /> Status</InputLabel>
                  <Select
                    value={filter}
                    label="Status"
                    onChange={handleFilterChange}
                  >
                    <MenuItem value="all">All Status</MenuItem>
                    <MenuItem value="available">Available</MenuItem>
                    <MenuItem value="unavailable">Unavailable</MenuItem>
                  </Select>
                </FormControl>
                
                <FormControl sx={{ minWidth: 150 }} size="small">
                  <InputLabel><CategoryIcon sx={{ fontSize: 18, mr: 1 }} /> Category</InputLabel>
                  <Select
                    value={categoryFilter}
                    label="Category"
                    onChange={handleCategoryChange}
                  >
                    <MenuItem value="all">All Categories</MenuItem>
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>{category}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>

            {/* Status Info */}
            {error && (
              <Box bgcolor="error.light" p={2} borderRadius={2} mb={3}>
                <Typography color="error.dark" display="flex" alignItems="center">
                  <InfoIcon sx={{ mr: 1 }} /> {error}
                </Typography>
              </Box>
            )}

            {/* Content Section */}
            {loading ? (
              <Box display="flex" justifyContent="center" py={8}>
                <CircularProgress size={60} thickness={4} />
              </Box>
            ) : (
              <>
                <TableContainer sx={{ 
                  borderRadius: 3, 
                  border: "1px solid",
                  borderColor: "divider",
                  maxHeight: 600,
                  overflow: "auto"
                }}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold", bgcolor: "background.paper" }}>Book ID</TableCell>
                        <TableCell sx={{ fontWeight: "bold", bgcolor: "background.paper" }}>Book Name</TableCell>
                        <TableCell sx={{ fontWeight: "bold", bgcolor: "background.paper" }}>Author</TableCell>
                        <TableCell sx={{ fontWeight: "bold", bgcolor: "background.paper" }}>Description</TableCell>
                        <TableCell sx={{ fontWeight: "bold", bgcolor: "background.paper" }}>Status</TableCell>
                        <TableCell sx={{ fontWeight: "bold", bgcolor: "background.paper" }}>Rack No</TableCell>
                        <TableCell sx={{ fontWeight: "bold", bgcolor: "background.paper" }}>Category</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {paginatedBooks.length > 0 ? (
                        paginatedBooks.map((book) => (
                          <TableRow
                            key={book._id}
                            hover
                            sx={{
                              "&:hover": {
                                backgroundColor: "action.hover"
                              }
                            }}
                          >
                            <TableCell>{book.Bookid}</TableCell>
                            <TableCell sx={{ fontWeight: 500 }}>{book.Bookname}</TableCell>
                            <TableCell>{book.Author}</TableCell>
                            <TableCell sx={{ maxWidth: 300 }}>
                              <Tooltip title={book.Description || book.Discription || "No description"} arrow>
                                <Box sx={{
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis"
                                }}>
                                  {book.Description || book.Discription || "No description"}
                                </Box>
                              </Tooltip>
                            </TableCell>
                            <TableCell>
                              <StatusChip 
                                icon={book.Availability === "Available" ? 
                                  <AvailableIcon fontSize="small" /> : 
                                  <UnavailableIcon fontSize="small" />}
                                label={book.Availability}
                                status={book.Availability}
                                size="small"
                              />
                            </TableCell>
                            <TableCell>{book.RackNumber}</TableCell>
                            <TableCell>
                              <Chip 
                                label={book.Category} 
                                size="small" 
                                variant="outlined"
                                color="primary"
                              />
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                            <Box display="flex" flexDirection="column" alignItems="center">
                              <InfoIcon color="disabled" sx={{ fontSize: 40, mb: 1 }} />
                              <Typography color="text.secondary">
                                No reference books found matching your criteria
                              </Typography>
                            </Box>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* Pagination */}
                {filteredBooks.length > rowsPerPage && (
                  <Box display="flex" justifyContent="center" mt={3}>
                    <Pagination
                      count={Math.ceil(filteredBooks.length / rowsPerPage)}
                      page={page}
                      onChange={(e, value) => setPage(value)}
                      color="primary"
                      shape="rounded"
                      showFirstButton
                      showLastButton
                    />
                  </Box>
                )}
              </>
            )}
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default ReferenceDetails;