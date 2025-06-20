
// import React, { useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "./Navbar";
// import {
//   Box,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   CircularProgress,
//   Button,
// } from "@mui/material";
// import { AllDataContext } from "../context/AllDataContext";
// import axios from "axios";

// const UserProfile = () => {
//   const { loginData, regData, saveLoginData, saveRegData } = useContext(AllDataContext);
//   const [reservedBook, setReservedBook] = useState([]);
//   const [fineAmounts, setFineAmounts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const userData = loginData || regData;
//   const URL = "http://localhost:9000/reserve/getreserve";
//   const navigate = useNavigate();

//   // Existing useEffect and other functions remain exactly the same
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const res = await axios.get(URL);
//         const books = res.data.message;
//         setReservedBook(books);

//         if (books.length > 0) {
//           const fineResponses = await Promise.all(
//             books.map((book) =>
//               axios.get(`http://localhost:9000/reserve/calculateFine/${book._id}`)
//             )
//           );
//           const fines = fineResponses.map((res) => res.data.fine);
//           setFineAmounts(fines);
//         }
//       } catch (err) {
//         setError("Failed to load data. Please try again.");
//         console.error("Error fetching data:", err);
//       }
//       setLoading(false);
//     };

//     fetchData();
//   }, [loginData?.Email]);

//   const filteredBooks = reservedBook
//     .filter((book) => book?.Email === userData?.Email)
//     .map((book) => ({
//       ...book,
//       fine: fineAmounts[reservedBook.indexOf(book)] || 0,
//     }));

//   const getStatus = (fine, returned) => {
//     return returned || fine === 0 ? "Cleared" : "Pending";
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("en-IN", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   // New logout function that doesn't modify existing functions
//   const handleLogout = () => {
//     // Clear user data using existing context functions
//     saveLoginData(null);
//     saveRegData(null);
//     // Clear localStorage
//     localStorage.removeItem("user");
//     localStorage.removeItem("regData");
//     // Navigate to login page
//     navigate('/login');
//   };

//   return (
//     <div>
//       <Navbar />
//       <Box sx={{ mt: 14, px: 3, maxWidth: 1000, mx: "auto" }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <Typography
//             variant="h4"
//             sx={{ fontWeight: 700, color: "#0d47a1", mb: 4 }}
//           >
//             User Profile
//           </Typography>
//           {userData && (
//             <Button 
//               variant="contained" 
//               color="error"
//               onClick={handleLogout}
//               sx={{ mb: 4 }}
//             >
//               Logout
//             </Button>
//           )}
//         </Box>

//         {error && (
//           <Typography color="error" align="center" sx={{ mb: 2 }}>
//             {error}
//           </Typography>
//         )}

//         {userData ? (
//           <Paper
//             elevation={3}
//             sx={{ p: 3, mb: 4, backgroundColor: "#f5faff", borderRadius: 2 }}
//           >
//             <Typography variant="h6" sx={{ fontWeight: 600 }}>
//               Name:{" "}
//               <Typography component="span" color="text.secondary">
//                 {userData.Name}
//               </Typography>
//             </Typography>
//             <Typography variant="h6" sx={{ fontWeight: 600, mt: 1 }}>
//               Email:{" "}
//               <Typography component="span" color="text.secondary">
//                 {userData.Email}
//               </Typography>
//             </Typography>
//           </Paper>
//         ) : (
//           <Typography color="error" align="center">
//             User data not found.
//           </Typography>
//         )}

//         <Typography
//           variant="h5"
//           sx={{ mb: 2, fontWeight: 700, color: "#1a237e" }}
//         >
//           Reserved Books
//         </Typography>

//         {loading ? (
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               height: 200,
//             }}
//           >
//             <CircularProgress size={50} thickness={4} color="primary" />
//           </Box>
//         ) : filteredBooks.length > 0 ? (
//           <TableContainer
//             component={Paper}
//             elevation={4}
//             sx={{ borderRadius: 2 }}
//           >
//             <Table>
//               <TableHead sx={{ backgroundColor: "#e3f2fd" }}>
//                 <TableRow>
//                   <TableCell sx={{ fontWeight: 600 }}>#</TableCell>
//                   <TableCell sx={{ fontWeight: 600 }}>Book Name</TableCell>
//                   <TableCell sx={{ fontWeight: 600 }}>Reserve Date</TableCell>
//                   <TableCell sx={{ fontWeight: 600 }}>Return Date</TableCell>
//                   <TableCell sx={{ fontWeight: 600 }}>Fine Amount</TableCell>
//                   <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredBooks.map((book, index) => (
//                   <TableRow
//                     key={book._id || `${book.Bookname}-${book.ReserveDate}`}
//                     sx={{
//                       backgroundColor: index % 2 === 0 ? "#fafafa" : "#ffffff",
//                       "&:hover": {
//                         backgroundColor: "#f1f1f1",
//                       },
//                     }}
//                   >
//                     <TableCell>{index + 1}</TableCell>
//                     <TableCell>{book.Bookname}</TableCell>
//                     <TableCell>{formatDate(book.ReserveDate)}</TableCell>
//                     <TableCell>{formatDate(book.ReturnDate)}</TableCell>
//                     <TableCell>
//                       {book.fine > 0 ? `₹${book.fine}` : "No Fine"}
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         fontWeight: 600,
//                         color:
//                           getStatus(book.fine, book.Returned) === "Pending"
//                             ? "red"
//                             : "green",
//                       }}
//                     >
//                       {getStatus(book.fine, book.Returned)}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         ) : (
//           <Typography sx={{ mt: 2 }} color="text.secondary">
//             No reserved books found.
//           </Typography>
//         )}
//       </Box>
//     </div>
//   );
// };

// export default UserProfile;



import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Button,
  Avatar,
  Chip,
  Grid,
  Card,
  CardContent,
  Divider,
  Tooltip,
  IconButton
} from "@mui/material";
import {
  AccountCircle,
  Book,
  CalendarToday,
  MonetizationOn,
  CheckCircle,
  Pending,
  ExitToApp,
  Info
} from "@mui/icons-material";
import { AllDataContext } from "../context/AllDataContext";
import axios from "axios";
import { styled } from "@mui/material/styles";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
}));

const StatusChip = ({ status }) => {
  return (
    <Chip
      label={status}
      size="small"
      icon={status === "Cleared" ? <CheckCircle /> : <Pending />}
      color={status === "Cleared" ? "success" : "error"}
      variant="outlined"
    />
  );
};

const UserProfile = () => {
  const { loginData, regData, saveLoginData, saveRegData } = useContext(AllDataContext);
  const [reservedBook, setReservedBook] = useState([]);
  const [fineAmounts, setFineAmounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalFine, setTotalFine] = useState(0);
  const [activeReservations, setActiveReservations] = useState(0);
  const userData = loginData || regData;
  const URL = "http://localhost:9000/reserve/getreserve";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(URL);
        const allBooks = res.data.message;
        
        // Filter books for current user only
        const userBooks = allBooks.filter(book => book?.Email === userData?.Email);
        setReservedBook(userBooks);

        if (userBooks.length > 0) {
          const fineResponses = await Promise.all(
            userBooks.map((book) =>
              axios.get(`http://localhost:9000/reserve/calculateFine/${book._id}`)
            )
          );
          const fines = fineResponses.map((res) => res.data.fine);
          setFineAmounts(fines);
          
          // Calculate total fine for this user only
          const total = fines.reduce((sum, fine) => sum + fine, 0);
          setTotalFine(total);
          
          // Count active reservations for this user
          const active = userBooks.filter(book => !book.Returned).length;
          setActiveReservations(active);
        } else {
          setTotalFine(0);
          setActiveReservations(0);
        }
      } catch (err) {
        setError("Failed to load data. Please try again.");
        console.error("Error fetching data:", err);
      }
      setLoading(false);
    };

    if (userData?.Email) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [userData?.Email]);

  const filteredBooks = reservedBook.map((book, index) => ({
    ...book,
    fine: fineAmounts[index] || 0,
  }));

  const getStatus = (fine, returned) => {
    return returned || fine === 0 ? "Cleared" : "Pending";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleLogout = () => {
    saveLoginData(null);
    saveRegData(null);
    localStorage.removeItem("user");
    localStorage.removeItem("regData");
    navigate('/login');
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f7fa" }}>
      <Navbar />
      <Box sx={{ mt: 12, px: { xs: 2, sm: 3 }, maxWidth: 1200, mx: "auto", pb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography
            variant="h4"
            sx={{ 
              fontWeight: 700, 
              color: "primary.main",
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <AccountCircle fontSize="large" /> My Profile
          </Typography>
          {userData && (
            <Button 
              variant="contained" 
              color="error"
              onClick={handleLogout}
              startIcon={<ExitToApp />}
              sx={{ borderRadius: 2 }}
            >
              Logout
            </Button>
          )}
        </Box>

        {error && (
          <Typography color="error" align="center" sx={{ mb: 3 }}>
            {error}
          </Typography>
        )}

        {userData ? (
          <>
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} md={6}>
                <Card elevation={3} sx={{ borderRadius: 3 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar 
                        sx={{ 
                          width: 80, 
                          height: 80, 
                          mr: 3,
                          bgcolor: "primary.main",
                          fontSize: "2rem"
                        }}
                      >
                        {userData.Name.charAt(0).toUpperCase()}
                      </Avatar>
                      <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700 }}>
                          {userData.Name}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          {userData.Email}
                        </Typography>
                      </Box>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="body2" color="text.secondary">
                      Member since: {formatDate(userData.createdAt || new Date())}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Card elevation={3} sx={{ borderRadius: 3, height: '100%' }}>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Book color="primary" sx={{ fontSize: 40, mb: 1 }} />
                        <Typography variant="h6" color="text.secondary">
                          Reservations
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                          {filteredBooks.length}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card elevation={3} sx={{ borderRadius: 3, height: '100%' }}>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <MonetizationOn color="primary" sx={{ fontSize: 40, mb: 1 }} />
                        <Typography variant="h6" color="text.secondary">
                          Total Fine
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                          ₹{totalFine}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12}>
                    <Card elevation={3} sx={{ borderRadius: 3 }}>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" color="text.secondary">
                          Active Reservations
                        </Typography>
                        <Typography variant="h3" sx={{ fontWeight: 700 }}>
                          {activeReservations}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Typography
              variant="h5"
              sx={{ 
                mb: 3, 
                fontWeight: 700, 
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <Book /> My Reservations
              <Tooltip title="List of all your book reservations and their status">
                <IconButton size="small">
                  <Info fontSize="small" />
                </IconButton>
              </Tooltip>
            </Typography>

            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 200,
                }}
              >
                <CircularProgress size={50} thickness={4} color="primary" />
              </Box>
            ) : filteredBooks.length > 0 ? (
              <TableContainer
                component={Paper}
                elevation={3}
                sx={{ borderRadius: 3, overflowX: 'auto' }}
              >
                <Table>
                  <TableHead sx={{ backgroundColor: "primary.light" }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>#</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Book Name</TableCell>
                      <TableCell sx={{ fontWeight: 700, display: { xs: 'none', sm: 'table-cell' } }}>
                        <Box display="flex" alignItems="center">
                          <CalendarToday fontSize="small" sx={{ mr: 1 }} />
                          Reserve Date
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700, display: { xs: 'none', md: 'table-cell' } }}>
                        <Box display="flex" alignItems="center">
                          <CalendarToday fontSize="small" sx={{ mr: 1 }} />
                          Return Date
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>
                        <Box display="flex" alignItems="center">
                          <MonetizationOn fontSize="small" sx={{ mr: 1 }} />
                          Fine
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredBooks.map((book, index) => (
                      <StyledTableRow
                        key={book._id || `${book.Bookname}-${book.ReserveDate}`}
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell sx={{ fontWeight: 500 }}>{book.Bookname}</TableCell>
                        <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                          {formatDate(book.ReserveDate)}
                        </TableCell>
                        <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                          {formatDate(book.ReturnDate)}
                        </TableCell>
                        <TableCell>
                          {book.fine > 0 ? (
                            <Chip 
                              label={`₹${book.fine}`} 
                              size="small" 
                              color="warning" 
                              variant="outlined" 
                            />
                          ) : (
                            "No Fine"
                          )}
                        </TableCell>
                        <TableCell>
                          <StatusChip status={getStatus(book.fine, book.Returned)} />
                        </TableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Paper elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
                <Book sx={{ fontSize: 60, color: "text.disabled", mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  No reserved books found
                </Typography>
                <Button 
                  variant="outlined" 
                  color="primary" 
                  sx={{ mt: 2 }}
                  onClick={() => navigate('/home')}
                >
                  Browse Books
                </Button>
              </Paper>
            )}
          </>
        ) : (
          <Paper elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
            <AccountCircle sx={{ fontSize: 60, color: "text.disabled", mb: 2 }} />
            <Typography variant="h6" color="error">
              User data not found
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              sx={{ mt: 2 }}
              onClick={() => navigate('/login')}
            >
              Login Now
            </Button>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default UserProfile;