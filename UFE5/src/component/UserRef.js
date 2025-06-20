// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   CircularProgress,
//   TextField,
//   Button,
//   Paper,
//   Grid,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import Navbar from "./Navbar";

// const UserRef = () => {
//   const { bookname } = useParams();
//   const [book, setBook] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [formData, setFormData] = useState({
//     Name: "",
//     StudentID: "",
//     Email: "",
//     Feedback: "",
//     Days: "",
//   });
//   const [error, setError] = useState("");
//   const [availabilityError, setAvailabilityError] = useState("");
//   const [openSnackbar, setOpenSnackbar] = useState(false);

//   useEffect(() => {
//     axios
//       .get("http://localhost:9000/api/referencebooks")
//       .then((res) => {
//         const formattedName = bookname.replace(/-/g, " ").toLowerCase();
//         const matchedBook = res.data.find(
//           (b) => b.Bookname.toLowerCase() === formattedName
//         );
//         setBook(matchedBook);
//         setLoading(false);
//       })
//       .catch((err) => console.error("Error loading book details:", err));
//   }, [bookname]);

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//     setError("");
//   };

//   const handleReserve = async () => {
//     const { Name, StudentID, Email, Days } = formData;
//     const duration = parseInt(Days);

//     if (!Name || !StudentID || !Email || !Days) {
//       setError("Please fill out all required fields.");
//       return;
//     }

//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email)) {
//       setError("Please enter a valid email address.");
//       return;
//     }

//     if (isNaN(duration) || duration < 1 || duration > 6) {
//       setError("Please enter a duration between 1 and 6 days.");
//       return;
//     }

//     const reserveDate = new Date().toISOString().split("T")[0];
//     const returnDate = calculateReturnDate(duration);

//     try {
//       console.log("Sending reservation request...");
//       const response = await axios.post("http://localhost:9000/api/reserve", {
//         Name,
//         StudentID,
//         Email,
//         Bookname: book.Bookname,
//         Feedback: formData.Feedback,
//         ReserveDate: reserveDate,
//         ReturnDate: returnDate,
//       });
//       console.log("Reservation response:", response);

//       // Update availability
//       const updateResponse = await axios.put(
//         "http://localhost:9000/api/reserve/decreaseAvailability",
//         { Bookname: book.Bookname }
//       );
//       console.log("Availability update response:", updateResponse);

//       if (updateResponse.status === 200) {
//         setAvailabilityError("");
//       } else {
//         setAvailabilityError("Book reserved, but failed to update availability.");
//       }

//       setOpenSnackbar(true);
//       setFormData({
//         Name: "",
//         StudentID: "",
//         Email: "",
//         Feedback: "",
//         Days: "",
//       });
//     } catch (err) {
//       console.error("Reservation error:", err);
//       setError("Reservation failed. Please try again.");
//     }
//   };

//   const calculateReturnDate = (days) => {
//     const today = new Date();
//     today.setDate(today.getDate() + parseInt(days));
//     return today.toISOString().split("T")[0];
//   };

//   if (loading) {
//     return (
//       <Box sx={{ mt: 10, textAlign: "center" }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (!book) {
//     return (
//       <Box sx={{ mt: 10, textAlign: "center" }}>
//         <Typography variant="h6">Book not found.</Typography>
//       </Box>
//     );
//   }

//   return (
//     <div style={{ backgroundColor: "#f2f6fa", minHeight: "100vh" }}>
//       <Navbar />
//       <Box sx={{ padding: { xs: "20px", md: "40px" }, maxWidth: "900px", margin: "0 auto" }}>
//         <Typography
//           variant="h4"
//           align="center"
//           sx={{ color: "#003366", fontWeight: "bold", mb: 4, mt: 9 }}
//         >
//           {book.Bookname}
//         </Typography>

//         <Paper elevation={3} sx={{ padding: "20px", backgroundColor: "#e6efff", borderLeft: "6px solid #005b96", mb: 4 }}>
//           <Typography variant="h6" sx={{ color: "#003366", mb: 1 }}>
//             Author: {book.Author}
//           </Typography>
//           <Typography variant="body1" sx={{ color: "#333" }}>
//             Book ID: {book.Bookid}
//           </Typography>
//         </Paper>

//         <Paper elevation={4} sx={{ padding: "30px", backgroundColor: "#ffffff" }}>
//           <Typography variant="h6" sx={{ color: "#003366", fontWeight: "bold", mb: 3, textAlign: "center" }}>
//             Reserve This Book
//           </Typography>

//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Name"
//                 name="Name"
//                 value={formData.Name}
//                 onChange={handleChange}
//                 fullWidth
//                 required
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Student ID"
//                 name="StudentID"
//                 value={formData.StudentID}
//                 onChange={handleChange}
//                 fullWidth
//                 required
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Email"
//                 name="Email"
//                 value={formData.Email}
//                 onChange={handleChange}
//                 fullWidth
//                 required
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Feedback"
//                 name="Feedback"
//                 value={formData.Feedback}
//                 onChange={handleChange}
//                 fullWidth
//                 multiline
//                 rows={2}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Number of Days (1-6)"
//                 name="Days"
//                 type="number"
//                 value={formData.Days}
//                 onChange={handleChange}
//                 fullWidth
//                 required
//               />
//             </Grid>

//             {formData.Days && !error && (
//               <Grid item xs={12}>
//                 <Typography variant="body2" sx={{ mt: 1 }}>
//                   <strong>Reserve Date:</strong> {new Date().toISOString().split("T")[0]} <br />
//                   <strong>Return Date:</strong> {calculateReturnDate(formData.Days)}
//                 </Typography>
//               </Grid>
//             )}

//             {error && (
//               <Grid item xs={12}>
//                 <Typography color="error">{error}</Typography>
//               </Grid>
//             )}

//             {availabilityError && (
//               <Grid item xs={12}>
//                 <Typography color="warning">{availabilityError}</Typography>
//               </Grid>
//             )}

//             <Grid item xs={12}>
//               {book.Availability > 0 ? (
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={handleReserve}
//                   fullWidth
//                 >
//                   Reserve Book
//                 </Button>
//               ) : (
//                 <Button variant="contained" color="secondary" disabled fullWidth>
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

// export default UserRef;




import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  CircularProgress,
  TextField,
  Button,
  Paper,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import Navbar from "./Navbar";

const UserRef = () => {
  const { bookname } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    Name: "",
    StudentID: "",
    Email: "",
    Feedback: "",
    Days: "",
  });
  const [error, setError] = useState("");
  const [availabilityError, setAvailabilityError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Fetch book details
  useEffect(() => {
    axios
      .get("http://localhost:9000/api/referencebooks")
      .then((res) => {
        const formattedName = bookname.replace(/-/g, " ").toLowerCase();
        const matchedBook = res.data.find(
          (b) => b.Bookname.toLowerCase() === formattedName
        );
        setBook(matchedBook || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading book details:", err);
        setLoading(false);
      });
  }, [bookname]);

  // Form input handler
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  // Reserve the book
  const handleReserve = async () => {
    const { Name, StudentID, Email, Feedback, Days } = formData;
    const duration = parseInt(Days);
    const reserveDate = new Date().toISOString().split("T")[0];
    const returnDate = calculateReturnDate(duration);

    // Validations
    if (!Name || !StudentID || !Email || !Days) {
      setError("Please fill out all required fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (isNaN(duration) || duration < 1 || duration > 6) {
      setError("Please enter a duration between 1 and 6 days.");
      return;
    }

    if (!book || book.Availability <= 0) {
      setError("This book is currently unavailable.");
      return;
    }

    try {
      const reservationResponse = await axios.post(
        "http://localhost:9000/api/reserve",
        {
          Name,
          StudentID,
          Email,
          Bookname: book.Bookname,
          Feedback,
          ReserveDate: reserveDate,
          ReturnDate: returnDate,
        }
      );

      const updateResponse = await axios.put(
        "http://localhost:9000/api/reserve/decreaseAvailability",
        { Bookname: book.Bookname }
      );

      if (updateResponse.status === 200) {
        setAvailabilityError("");
      } else {
        setAvailabilityError("Book reserved, but availability update failed.");
      }

      setOpenSnackbar(true);
      setFormData({
        Name: "",
        StudentID: "",
        Email: "",
        Feedback: "",
        Days: "",
      });

      // Refresh availability
      setBook((prev) => ({
        ...prev,
        Availability: prev.Availability - 1,
      }));
    } catch (err) {
      console.error("Reservation error:", err);
      setError("Reservation failed. Please try again.");
    }
  };

  const calculateReturnDate = (days) => {
    const today = new Date();
    today.setDate(today.getDate() + parseInt(days));
    return today.toISOString().split("T")[0];
  };

  if (loading) {
    return (
      <Box sx={{ mt: 10, textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!book) {
    return (
      <Box sx={{ mt: 10, textAlign: "center" }}>
        <Typography variant="h6">Book not found.</Typography>
      </Box>
    );
  }

  return (
    <div style={{ backgroundColor: "#f2f6fa", minHeight: "100vh" }}>
      <Navbar />
      <Box sx={{ padding: { xs: "20px", md: "40px" }, maxWidth: "900px", margin: "0 auto" }}>
        <Typography
          variant="h4"
          align="center"
          sx={{ color: "#003366", fontWeight: "bold", mb: 4, mt: 9 }}
        >
          {book.Bookname}
        </Typography>

        <Paper elevation={3} sx={{ padding: "20px", backgroundColor: "#e6efff", borderLeft: "6px solid #005b96", mb: 4 }}>
          <Typography variant="h6" sx={{ color: "#003366", mb: 1 }}>
            Author: {book.Author}
          </Typography>
          <Typography variant="body1" sx={{ color: "#333" }}>
            Book ID: {book.Bookid}
          </Typography>
          <Typography variant="body1" sx={{ color: "#333" }}>
            Availability: {book.Availability}
          </Typography>
        </Paper>

        <Paper elevation={4} sx={{ padding: "30px", backgroundColor: "#ffffff" }}>
          <Typography variant="h6" sx={{ color: "#003366", fontWeight: "bold", mb: 3, textAlign: "center" }}>
            Reserve This Book
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                name="Name"
                value={formData.Name}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Student ID"
                name="StudentID"
                value={formData.StudentID}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Feedback"
                name="Feedback"
                value={formData.Feedback}
                onChange={handleChange}
                fullWidth
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Number of Days (1-6)"
                name="Days"
                type="number"
                value={formData.Days}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            {formData.Days && !error && (
              <Grid item xs={12}>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  <strong>Reserve Date:</strong> {new Date().toISOString().split("T")[0]} <br />
                  <strong>Return Date:</strong> {calculateReturnDate(formData.Days)}
                </Typography>
              </Grid>
            )}

            {error && (
              <Grid item xs={12}>
                <Typography color="error">{error}</Typography>
              </Grid>
            )}

            {availabilityError && (
              <Grid item xs={12}>
                <Typography color="warning.main">{availabilityError}</Typography>
              </Grid>
            )}

            <Grid item xs={12}>
              {book.Availability > 0 ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleReserve}
                  fullWidth
                >
                  Reserve Book
                </Button>
              ) : (
                <Button variant="contained" color="secondary" disabled fullWidth>
                  Book Unavailable
                </Button>
              )}
            </Grid>
          </Grid>
        </Paper>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
        >
          <Alert severity="success" onClose={() => setOpenSnackbar(false)}>
            Book reserved successfully!
          </Alert>
        </Snackbar>
      </Box>
    </div>
  );
};

export default UserRef;

