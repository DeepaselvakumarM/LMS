


// import React, { useState } from "react";
// import axios from "axios";
// import Navbar from "./Navbar";
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   Paper,
//   Divider,
// } from "@mui/material";

// const Suggestion = () => {
//   const [formData, setFormData] = useState({
//     userId: "USER_ID_HERE",
//     name: "",
//     email: "",
//     message: "",
//   });

//   const maxChars = 100;

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "message" && value.length > maxChars) return;

//     setFormData({ ...formData, [name]: value });
//   };

//   const URL = "http://localhost:9000/suggest/add";

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { name, email, message } = formData;

//     if (!name || !email || !message) {
//       alert("All fields are required");
//       return;
//     }

//     try {
//       const response = await axios.post(URL, formData);
//       alert(response.data.message || "Suggestion submitted successfully!");
//       setFormData({
//         userId: "USER_ID_HERE",
//         name: "",
//         email: "",
//         message: "",
//       });
//     } catch (error) {
//       alert("Error submitting suggestion");
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <Box sx={{ pt: { xs: 10, md: 12 } }}>
//         <Box
//           sx={{
//             maxWidth: 600,
//             margin: "auto",
//             padding: "20px",
//             backgroundColor: "#f4f6f8",
//             borderRadius: "10px",
//             boxShadow: 3,
//             marginTop: "35px",
//           }}
//         >
//           <Typography
//             variant="h4"
//             sx={{
//               textAlign: "center",
//               fontWeight: "bold",
//               color: "#007bff",
//               marginBottom: "10px",
//             }}
//           >
//             Submit Your Suggestion
//           </Typography>

//           <Divider sx={{ marginBottom: "20px" }} />

//           <Paper sx={{ padding: "24px" }} elevation={2}>
//             <form onSubmit={handleSubmit}>
//               <TextField
//                 name="name"
//                 label="Your Name"
//                 variant="outlined"
//                 fullWidth
//                 value={formData.name}
//                 onChange={handleChange}
//                 sx={{ marginBottom: "20px" }}
//                 required
//               />
//               <TextField
//                 name="email"
//                 label="Your Email"
//                 variant="outlined"
//                 fullWidth
//                 value={formData.email}
//                 onChange={handleChange}
//                 sx={{ marginBottom: "20px" }}
//                 required
//               />
//               <TextField
//                 name="message"
//                 label="Enter your suggestion"
//                 variant="outlined"
//                 fullWidth
//                 multiline
//                 rows={4}
//                 value={formData.message}
//                 onChange={handleChange}
//                 sx={{ marginBottom: "10px" }}
//                 required
//                 inputProps={{ maxLength: maxChars }}
//               />
//               <Typography
//                 variant="body2"
//                 align="right"
//                 color={formData.message.length === maxChars ? "error" : "textSecondary"}
//                 sx={{ marginBottom: "20px" }}
//               >
//                 {formData.message.length}/{maxChars} characters
//               </Typography>

//               <Box sx={{ textAlign: "center" }}>
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   sx={{
//                     px: 4,
//                     py: 1.5,
//                     fontSize: "16px",
//                     fontWeight: "bold",
//                     backgroundColor: "#007bff",
//                     "&:hover": { backgroundColor: "#0056b3" },
//                   }}
//                 >
//                   Submit
//                 </Button>
//               </Box>
//             </form>
//           </Paper>
//         </Box>
//       </Box>
//     </div>
//   );
// };

// export default Suggestion;

import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Divider,
  Snackbar,
  Alert,
  IconButton,
  InputAdornment,
  CircularProgress
} from "@mui/material";
import {
  Send,
  Close,
  Person,
  Email,
  Feedback,
  CheckCircle
} from "@mui/icons-material";

const Suggestion = () => {
  const [formData, setFormData] = useState({
    userId: "USER_ID_HERE",
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false
  });

  const maxChars = 300;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const URL = "http://localhost:9000/suggest/add";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    if (!name || !email || !message) {
      showSnackbar("All fields are required", "error");
      return;
    }

    if (!validateEmail(email)) {
      showSnackbar("Please enter a valid email address", "error");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(URL, formData);
      showSnackbar(
        response.data.message || "Suggestion submitted successfully!",
        "success"
      );
      setFormData({
        userId: "USER_ID_HERE",
        name: "",
        email: "",
        message: "",
      });
      setTouched({
        name: false,
        email: false,
        message: false
      });
    } catch (error) {
      showSnackbar(
        error.response?.data?.message || "Error submitting suggestion",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const isSubmitDisabled = 
    !formData.name || 
    !formData.email || 
    !formData.message || 
    !validateEmail(formData.email) ||
    loading;

  return (
    <Box sx={{ 
      minHeight: "100vh",
      backgroundColor: "#f5f7fa",
      display: "flex",
      flexDirection: "column"
    }}>
      <Navbar />
      
      <Box sx={{ 
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
        px: 2
      }}>
        <Box
          sx={{
            width: "100%",
            maxWidth: 600,
            margin: "auto",
          }}
        >
          <Paper elevation={4} sx={{ borderRadius: 3, overflow: "hidden" }}>
            <Box sx={{ 
              backgroundColor: "primary.main",
              color: "white",
              p: 3,
              textAlign: "center"
            }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1
                }}
              >
                <Feedback fontSize="large" /> Suggest the Books
              </Typography>
              <Typography variant="subtitle1" sx={{ mt: 1 }}>
                We value your suggestions to improve our service
              </Typography>
            </Box>

            <Box sx={{ p: 4 }}>
              <form onSubmit={handleSubmit}>
                <TextField
                  name="name"
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={() => handleBlur("name")}
                  error={touched.name && !formData.name}
                  helperText={touched.name && !formData.name ? "Name is required" : ""}
                  sx={{ mb: 3 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person color="action" />
                      </InputAdornment>
                    ),
                  }}
                  required
                />

                <TextField
                  name="email"
                  label="Email Address"
                  variant="outlined"
                  fullWidth
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={() => handleBlur("email")}
                  error={touched.email && (!formData.email || !validateEmail(formData.email))}
                  helperText={
                    touched.email && !formData.email ? "Email is required" :
                    touched.email && !validateEmail(formData.email) ? "Please enter a valid email" : ""
                  }
                  sx={{ mb: 3 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email color="action" />
                      </InputAdornment>
                    ),
                  }}
                  required
                />

                <TextField
                  name="message"
                  label="Your Suggestion"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={() => handleBlur("message")}
                  error={touched.message && !formData.message}
                  helperText={touched.message && !formData.message ? "Suggestion is required" : ""}
                  sx={{ mb: 1 }}
                  inputProps={{ maxLength: maxChars }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" sx={{ alignItems: "flex-start", mt: 1 }}>
                        <Feedback color="action" />
                      </InputAdornment>
                    ),
                  }}
                  required
                />

                <Typography
                  variant="caption"
                  color={
                    formData.message.length === maxChars ? "error" : 
                    formData.message.length > maxChars * 0.8 ? "warning.main" : "text.secondary"
                  }
                  sx={{ display: "block", textAlign: "right", mb: 3 }}
                >
                  {formData.message.length}/{maxChars} characters
                </Typography>

                <Box sx={{ textAlign: "center", mt: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Send />}
                    disabled={isSubmitDisabled}
                    sx={{
                      px: 5,
                      py: 1.5,
                      fontSize: "1rem",
                      fontWeight: 600,
                      borderRadius: 2,
                      boxShadow: "none",
                      "&:hover": {
                        boxShadow: "none",
                        backgroundColor: "primary.dark"
                      },
                      "&:disabled": {
                        backgroundColor: "action.disabledBackground"
                      }
                    }}
                  >
                    {loading ? "Submitting..." : "Submit Suggestion"}
                  </Button>
                </Box>
              </form>
            </Box>
          </Paper>
        </Box>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={handleCloseSnackbar}
          sx={{ width: "100%" }}
          icon={snackbar.severity === "success" ? <CheckCircle fontSize="inherit" /> : null}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Suggestion;