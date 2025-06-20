// // BookDetails.js
// import React, { useState, useContext } from "react";
// import { useParams } from "react-router-dom";
// import {
//   Box, Typography, Button, TextField, Paper,
//   Grid, Snackbar, Alert, CircularProgress,MenuItem
// } from "@mui/material";
// import Navbar from "./Navbar";
// import axios from "axios";
// import { AllDataContext } from "../context/AllDataContext";

// const BookDetails = () => {
//   const { bookName } = useParams();
//   const { bookData, storyBooks } = useContext(AllDataContext);

//   const [form, setForm] = useState({
//     name: "", studentID: "", email: "", feedback: "", days: "",
//   });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [openSnackbar, setOpenSnackbar] = useState(false);

//   const allBooks = [...(bookData || []), ...(storyBooks || [])];

//   const selectedBook = allBooks.find(
//     (book) =>
//       book.Bookname.toLowerCase().replace(/\s+/g, "-") ===
//       bookName.toLowerCase()
//   );

//   if (!selectedBook) {
//     return (
//       <Box sx={{ textAlign: "center", padding: "50px" }}>
//         <Typography variant="h5" color="error">Book not found!</Typography>
//       </Box>
//     );
//   }

//   const getTodayDate = () => new Date().toISOString().split("T")[0];

//   const calculateReturnDate = (days) => {
//     const today = new Date();
//     today.setDate(today.getDate() + parseInt(days));
//     return today.toISOString().split("T")[0];
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setError("");
//   };

//   const handleReserve = async () => {
//     const { name, studentID, email, course, days } = form;
//     const duration = parseInt(days);

//     if (!name || !studentID || !email || !days) {
//       setError("Please fill out all required fields.");
//       return;
//     }

//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       setError("Please enter a valid email address.");
//       return;
//     }

//     if (isNaN(duration) || duration < 1 || duration > 15) {
//       setError("Please enter a duration between 1 and 15 days.");
//       return;
//     }

//     const reserveDate = getTodayDate();
//     const returnDate = calculateReturnDate(duration);

//     try {
//       setLoading(true);

//       const response = await axios.post("http://localhost:9000/reserve/addreserve", {
//         Name: name,
//         StudentID: studentID,
//         Email: email,
//         Bookname: selectedBook.Bookname,
//         Course: course,
//         ReserveDate: reserveDate,
//         ReturnDate: returnDate,
//       });

//       if (response.status === 200 || response.status === 201) {
//         selectedBook.Availability = Math.max(selectedBook.Availability - 1, 0);
//         setOpenSnackbar(true);
//         setForm({ name: "", studentID: "", email: "", feedback: "", days: "" });
//         setError("");
//       } else {
//         setError("Reservation completed, but something went wrong.");
//       }
//     } catch (err) {
//       console.error("Reservation error:", err?.response?.data || err.message);
//       setError("Reservation failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <Box sx={{ padding: "90px", maxWidth: "900px", margin: "auto" }}>
//         <Typography
//           variant="h4"
//           align="center"
//           sx={{ color: "#002b5c", fontWeight: 600, mb: 2 }}
//         >
//           {selectedBook.Bookname}
//         </Typography>

//         <Paper elevation={3} sx={{ padding: 3, background: "#f4f9ff" }}>
//           <Typography><strong>Author:</strong> {selectedBook.Author}</Typography>
//           <Typography><strong>Book ID:</strong> {selectedBook.Bookid}</Typography>
//           <Typography><strong>Description:</strong> {selectedBook.Discription}</Typography>
//           <Typography sx={{ mb: 2 }}>
//             <strong>Availability:</strong> {selectedBook.Availability > 0 ? selectedBook.Availability : "Unavailable"}
//           </Typography>

//           <Typography variant="h6" sx={{ color: "#003366" }}>Reserve this Book</Typography>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth required />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField label="Student ID" name="studentID" value={form.studentID} onChange={handleChange} fullWidth required />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField label="Email" name="email" value={form.email} onChange={handleChange} fullWidth required />
//             </Grid>
//             <Grid item xs={12}>
//   <TextField
//     select
//     label="Select Course Type"
//     name="course"
//     value={form.course}
//     onChange={handleChange}
//     fullWidth
//   >
//     <MenuItem value="UG">Undergraduate (UG)</MenuItem>
//     <MenuItem value="PG">Postgraduate (PG)</MenuItem>
//   </TextField>
// </Grid>

//             <Grid item xs={12} sm={6}>
//               <TextField label="Number of Days (1-15)" name="days" type="number" value={form.days} onChange={handleChange} fullWidth required />
//             </Grid>

//             {form.days && !error && (
//               <Grid item xs={12}>
//                 <Typography variant="body2" sx={{ mt: 1 }}>
//                   <strong>Reserve Date:</strong> {getTodayDate()} <br />
//                   <strong>Return Date:</strong> {calculateReturnDate(form.days)}
//                 </Typography>
//               </Grid>
//             )}

//             {error && (
//               <Grid item xs={12}>
//                 <Typography color="error">{error}</Typography>
//               </Grid>
//             )}

//             <Grid item xs={12}>
//               {selectedBook.Availability > 0 ? (
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={handleReserve}
//                   disabled={loading}
//                 >
//                   {loading ? <CircularProgress size={24} /> : "Reserve Book"}
//                 </Button>
//               ) : (
//                 <Button variant="contained" color="secondary" disabled>
//                   Book Unavailable
//                 </Button>
//               )}
//             </Grid>
//           </Grid>
//         </Paper>

//         <Snackbar
//           open={openSnackbar}
//           autoHideDuration={3000}
//           onClose={() => setOpenSnackbar(false)}
//         >
//           <Alert severity="success" onClose={() => setOpenSnackbar(false)}>
//             Book reserved successfully!
//           </Alert>
//         </Snackbar>
//       </Box>
//     </div>
//   );
// };

// export default BookDetails;






import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Container,
  InputAdornment,
  Typography,
  Button,
  TextField,
  Paper,
  Grid,
  Snackbar,
  Alert,
  CircularProgress,
  MenuItem,
  Avatar,
  Chip,
  Divider,
  useTheme,
  useMediaQuery,
  Stack
} from "@mui/material";
import Navbar from "./Navbar";
import axios from "axios";
import { AllDataContext } from "../context/AllDataContext";
import {
  Book,
  Person,
  Email,
  Badge,
  CalendarToday,
  EventAvailable,
  EventBusy,
  School,
  Numbers,
  Description
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const ReservationCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

const BookDetails = () => {
  const { bookName } = useParams();
  const { bookData, storyBooks } = useContext(AllDataContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [form, setForm] = useState({
    name: "",
    studentID: "",
    email: "",
    feedback: "",
    days: "",
    course: "UG"
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const allBooks = [...(bookData || []), ...(storyBooks || [])];
  const selectedBook = allBooks.find(
    (book) =>
      book.Bookname.toLowerCase().replace(/\s+/g, "-") ===
      bookName.toLowerCase()
  );

  if (!selectedBook) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '60vh' 
      }}>
        <Typography variant="h5" color="error">
          Book not found!
        </Typography>
      </Box>
    );
  }

  const getTodayDate = () => new Date().toISOString().split("T")[0];

  const calculateReturnDate = (days) => {
    const today = new Date();
    today.setDate(today.getDate() + parseInt(days));
    return today.toISOString().split("T")[0];
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };




  const handleReserve = async () => {
    const { name, studentID, email, course, days } = form;
    const duration = parseInt(days);

    if (!name || !studentID || !email || !days) {
      setError("Please fill out all required fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // if (isNaN(duration) || duration < 1 || duration >15) {
    //   setError("Please enter a duration between 1 and 15 days.");
    //   return;
    // }

    if (isNaN(duration) || duration < 1) {
      setError("Please enter a valid duration (minimum 1 day).");
      return;
    }
    
    if (duration > 15) {
      setError("Maximum reservation period is 15 days. Please enter a shorter duration.");
      return;
    }

    const reserveDate = getTodayDate();
    const returnDate = calculateReturnDate(duration);

    try {
      setLoading(true);
      setOpenSnackbar(false); 

      const response = await axios.post("http://localhost:9000/reserve/addreserve", {
        Name: name,
        StudentID: studentID,
        Email: email,
        Bookname: selectedBook.Bookname,
        Course: course,
        ReserveDate: reserveDate,
        ReturnDate: returnDate,
      });

      if (response.status === 200 || response.status === 201) {
        selectedBook.Availability = Math.max(selectedBook.Availability - 1, 0);
        setOpenSnackbar(true);
        setForm({ 
          name: "", 
          studentID: "", 
          email: "", 
          feedback: "", 
          days: "",
          course: "UG"
        });
        setError("");
        setOpenSnackbar(true)
      } else {
        setError("Reservation completed, but something went wrong.");
      }
    } catch (err) {
      console.error("Reservation error:", err?.response?.data || err.message);
      setError("Reservation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  
  
  
  


  // const handleReserve = async () => {
  //   const { name, studentID, email, course, days } = form;
  //   const duration = parseInt(days);
  
  //   // Validations
  //   if (!name || !studentID || !email || !days) {
  //     setError("Please fill out all required fields.");
  //     return;
  //   }
  
  //   if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  //     setError("Please enter a valid email address.");
  //     return;
  //   }
  
  //   if (isNaN(duration) || duration < 1) {
  //     setError("Please enter a valid duration (minimum 1 day).");
  //     return;
  //   }
    
  //   if (duration > 15) {
  //     setError("Maximum reservation period is 15 days. Please enter a shorter duration.");
  //     return;
  //   }
  
  //   const reserveDate = getTodayDate();
  //   const returnDate = calculateReturnDate(duration);
  
  //   // Double-check date difference
  //   const date1 = new Date(reserveDate);
  //   const date2 = new Date(returnDate);
  //   const diffTime = Math.abs(date2 - date1);
  //   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  //   if (diffDays > 15) {
  //     setError("Calculated return date exceeds 15 days. Please try again.");
  //     return;
  //   }
  
  //   try {
  //     setLoading(true);
  //     setOpenSnackbar(false); // Reset snackbar
  
  //     console.log("Attempting reservation..."); // Debug log
  
  //     const response = await axios.post("http://localhost:9000/reserve/addreserve", {
  //       Name: name,
  //       StudentID: studentID,
  //       Email: email,
  //       Bookname: selectedBook.Bookname,
  //       Course: course,
  //       ReserveDate: reserveDate,
  //       ReturnDate: returnDate,
  //     });
  
  //     console.log("Response received:", response); // Debug log
  
  //     if (response.status === 200 || response.status === 201) {
  //       selectedBook.Availability = Math.max(selectedBook.Availability - 1, 0);
  //       setForm({ 
  //         name: "", 
  //         studentID: "", 
  //         email: "", 
  //         feedback: "", 
  //         days: "",
  //         course: "UG"
  //       });
  //       setError("");
  //       setOpenSnackbar(true); // Show success message
  //       console.log("Snackbar should be visible now"); // Debug log
  //     } else {
  //       setError("Reservation completed, but something went wrong.");
  //     }
  //   } catch (err) {
  //     console.error("Reservation error:", err?.response?.data || err.message);
  //     setError(err.response?.data?.message || "Reservation failed. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  
  // // Add this in your component's return statement
  // <Snackbar
  //   open={openSnackbar}
  //   autoHideDuration={6000}
  //   onClose={() => setOpenSnackbar(false)}
  //   anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
  // >
  //   <Alert 
  //     severity="success" 
  //     onClose={() => setOpenSnackbar(false)}
  //     sx={{ width: '100%' }}
  //   >
  //     Reservation successful! A confirmation has been sent to your email.
  //   </Alert>
  // </Snackbar>




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
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              color: theme.palette.primary.dark,
              fontWeight: 700,
              mb: 2,
              mt: { xs: 72, md: 11 },
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2
            }}
          >
            <Book fontSize="large" />
            {selectedBook.Bookname}
          </Typography>

          <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
              <Avatar 
                sx={{ 
                  bgcolor: theme.palette.primary.light,
                  color: theme.palette.primary.dark,
                  width: 60, 
                  height: 60 
                }}
              >
                <Book />
              </Avatar>
              
              <Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                  <Chip
                    icon={<Person />}
                    label={selectedBook.Author}
                    variant="outlined"
                    size="small"
                  />
                  <Chip
                    icon={<Numbers />}
                    label={`ID: ${selectedBook.Bookid}`}
                    variant="outlined"
                    size="small"
                  />
                  <Chip
                    icon={selectedBook.Availability > 0 ? <EventAvailable /> : <EventBusy />}
                    label={selectedBook.Availability > 0 ? 
                      `${selectedBook.Availability} Available` : 
                      "Unavailable"}
                    color={selectedBook.Availability > 0 ? "success" : "error"}
                    size="small"
                  />
                </Box>
                
                {selectedBook.Discription && (
                  <Typography variant="body1">
                    <Description color="primary" sx={{ verticalAlign: 'middle', mr: 1 }} />
                    {selectedBook.Discription}
                  </Typography>
                )}
              </Box>
            </Stack>
          </Paper>

          <ReservationCard elevation={3}>
            <Typography 
              variant="h5" 
              sx={{ 
                mb: 3,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <Badge color="primary" />
              Reserve This Book
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Full Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Student ID"
                  name="studentID"
                  value={form.studentID}
                  onChange={handleChange}
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Numbers color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email Address"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Course Type"
                  name="course"
                  value={form.course}
                  onChange={handleChange}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <School color="action" />
                      </InputAdornment>
                    ),
                  }}
                >
                  <MenuItem value="UG">Undergraduate (UG)</MenuItem>
                  <MenuItem value="PG">Postgraduate (PG)</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Duration (1-15 days)"
                  name="days"
                  type="number"
                  value={form.days}
                  onChange={handleChange}
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarToday color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {form.days && !error && (
                <Grid item xs={12}>
                  <Box sx={{ 
                    display: 'flex', 
                    gap: 2,
                    flexWrap: 'wrap'
                  }}>
                    <Chip
                      icon={<CalendarToday />}
                      label={`Reserve: ${getTodayDate()}`}
                      variant="outlined"
                      color="info"
                    />
                    <Chip
                      icon={<CalendarToday />}
                      label={`Return: ${calculateReturnDate(form.days)}`}
                      variant="outlined"
                      color="info"
                    />
                  </Box>
                </Grid>
              )}

              {error && (
                <Grid item xs={12}>
                  <Alert severity="error">{error}</Alert>
                </Grid>
              )}

              <Grid item xs={12}>
                {selectedBook.Availability > 0 ? (
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleReserve}
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontSize: "1rem",
                      fontWeight: 600,
                    }}
                  >
                    {loading ? "Processing..." : "Reserve Book"}
                  </Button>
                ) : (
                  <Button 
                    variant="contained" 
                    color="error"
                    size="large"
                    disabled
                    startIcon={<EventBusy />}
                  >
                    Currently Unavailable
                  </Button>
                )}
              </Grid>
            </Grid>
          </ReservationCard>
        </Box>
      </Container>

      {/* <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          severity="success" 
          onClose={() => setOpenSnackbar(false)}
          icon={<EventAvailable />}
          sx={{ width: '100%' }}
        >
          Book reserved successfully!
        </Alert>
      </Snackbar> */}

<Snackbar
  open={openSnackbar}
  autoHideDuration={6000}
  onClose={() => setOpenSnackbar(false)}
>
  <Alert severity="success">
    Reservation successful! A confirmation has been sent to your email.
  </Alert>
</Snackbar>


    </Box>
  );
};

export default BookDetails;










