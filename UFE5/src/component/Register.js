


// // Register.jsx
// import React, { useState, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { AllDataContext } from "../context/AllDataContext";
// import '../App.css';

// const Register = () => {
//   const { saveRegData } = useContext(AllDataContext);
//   const URL = "http://localhost:9000/users/addUser";
//   const navigate = useNavigate();

//   const [regData, setRegData] = useState({
//     Name: "",
//     Email: "",
//     Password: "",
//     Course: "", // ✅ Added course
//   });

//   const handleChange = (e) => {
//     setRegData({ ...regData, [e.target.name]: e.target.value });
//   };

//   const handleUserData = (e) => {
//     e.preventDefault();
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@shanmugha\.edu\.in$/;

//     if (!emailRegex.test(regData.Email)) {
//       alert("Invalid email domain. Use @shanmugha.edu.in");
//       return;
//     }

//     if (!regData.Course) {
//       alert("Please select your course");
//       return;
//     }

//     saveRegData(regData);

//     axios.post(URL, regData)
//       .then((response) => {
//         alert(response.data.message);
//         if (response.status === 201) {
//           navigate("/home");
//         }
//       })
//       .catch((error) => {
//         alert(error.response?.data?.message || "Something went wrong. Please try again.");
//       });
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 Login">
//       <h1 className="text-3xl font-semibold text-center mb-4 text-blue-600">
//         Sri Shanmugha Institutions
//       </h1>
//       <h2 className="text-xl font-semibold text-center mb-4 text-blue-600">
//         Library Management
//       </h2>
//       <h3 className="text-2xl font-bold mb-6">Register</h3>
//       <form
//         className="border border-gray-300 p-6 px-8 rounded-lg w-full max-w-md bg-white shadow-lg"
//         onSubmit={handleUserData}
//       >
//         <label className="block text-lg font-medium mb-2">Username:</label>
//         <input
//           type="text"
//           name="Name"
//           onChange={handleChange}
//           placeholder="Enter your username"
//           required
//           className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
//         />

//         <label className="block text-lg font-medium mb-2">Email:</label>
//         <input
//           type="email"
//           name="Email"
//           onChange={handleChange}
//           placeholder="Enter your email"
//           required
//           className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
//         />

//         <label className="block text-lg font-medium mb-2">Password:</label>
//         <input
//           type="password"
//           name="Password"
//           onChange={handleChange}
//           placeholder="Enter your password"
//           required
//           className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
//         />

//         <label className="block text-lg font-medium mb-2">Course:</label>
//         <select
//           name="Course"
//           value={regData.Course}
//           onChange={handleChange}
//           required
//           className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
//         >
//           <option value="">-- Select your course --</option>
//           <option value="UG">UG</option>
//           <option value="PG">PG</option>
//         </select>

//         <button
//           type="submit"
//           className="w-full py-2 bg-blue-500 text-white rounded-lg text-lg font-bold mb-4 hover:bg-blue-600 transition duration-300"
//         >
//           Register
//         </button>

//         <p className="text-lg font-semibold text-center">
//           If you already have an account,{" "}
//           <Link to={"/"} className="text-blue-600">
//             Login
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Register;





import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AllDataContext } from "../context/AllDataContext";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  Snackbar,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  useTheme,
  CircularProgress,
} from "@mui/material";
import {
  Person,
  Email,
  Lock,
  School,
  HowToReg,
  
  Login as LoginIcon
} from "@mui/icons-material";

const Register = () => {
  const { saveRegData } = useContext(AllDataContext);
  const URL = "http://localhost:9000/users/addUser";
  const navigate = useNavigate();
  const theme = useTheme();

  const [regData, setRegData] = useState({
    Name: "",
    Email: "",
    Password: "",
    Course: "",
  });

  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setRegData({ ...regData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleUserData = async (e) => {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@shanmugha\.edu\.in$/;

    if (!emailRegex.test(regData.Email)) {
      setError("Invalid email domain. Use @shanmugha.edu.in");
      setOpenSnackbar(true);
      return;
    }

    if (!regData.Course) {
      setError("Please select your course");
      setOpenSnackbar(true);
      return;
    }

    try {
      setLoading(true);
      saveRegData(regData);

      const response = await axios.post(URL, regData);
      setOpenSnackbar(true);
      
      if (response.status === 201) {
        navigate("/home");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError(error.response?.data?.message || "Something went wrong. Please try again.");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: theme.palette.grey[100],
        p: 3,
      }}
    >
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 700,
            color: theme.palette.primary.dark,
            mb: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1
          }}
        >
          <School fontSize="large" />
          Sri Shanmugha Institutions
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontWeight: 600,
            color: theme.palette.primary.main,
            mb: 2
          }}
        >
          Library Management System
        </Typography>
        <Typography
          variant="h5"
          component="h3"
          sx={{
            fontWeight: 700,
            color: theme.palette.primary.main,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1
          }}
        >
          <HowToReg />
          Create Your Account
        </Typography>
      </Box>

      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 450,
          p: 4,
          borderRadius: 2,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <form onSubmit={handleUserData}>
          <TextField
            fullWidth
            label="Full Name"
            name="Name"
            value={regData.Name}
            onChange={handleChange}
            required
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Email Address"
            name="Email"
            type="email"
            value={regData.Email}
            onChange={handleChange}
            required
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email color="action" />
                </InputAdornment>
              ),
            }}
            helperText="Use your @shanmugha.edu.in email"
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Password"
            name="Password"
            type="password"
            value={regData.Password}
            onChange={handleChange}
            required
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="course-label">Course</InputLabel>
            <Select
              labelId="course-label"
              label="Course"
              name="Course"
              value={regData.Course}
              onChange={handleChange}
              required
              startAdornment={
                <InputAdornment position="start">
                  <School color="action" />
                </InputAdornment>
              }
            >
              <MenuItem value="">
                <em>-- Select your course --</em>
              </MenuItem>
              <MenuItem value="UG">Undergraduate (UG)</MenuItem>
              <MenuItem value="PG">Postgraduate (PG)</MenuItem>
            </Select>
          </FormControl>

          <Button
            fullWidth
            variant="contained"
            type="submit"
            size="large"
            disabled={loading}
            sx={{
              py: 1.5,
              fontSize: "1rem",
              fontWeight: 600,
              mb: 2,
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Register"
            )}
          </Button>

          <Typography variant="body1" textAlign="center" sx={{ mt: 2 }}>
            Already have an account?{" "}
            <Link
              to="/"
              style={{
                color: theme.palette.primary.main,
                fontWeight: 600,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              <LoginIcon fontSize="small" />
              Login Now
            </Link>
          </Typography>
        </form>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={error ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {error || "Registration successful!"}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Register;