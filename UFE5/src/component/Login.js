// // updatedCode

// import axios from "axios";
// import React, { useState, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { AllDataContext } from "../context/AllDataContext";
// import "../App.css";

// const Login = () => {
//   const [logData, setLogData] = useState({
//     Email: "",
//     Password: "",
//   });

//   const { saveLoginData } = useContext(AllDataContext);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setLogData((prevData) => ({
//       ...prevData,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const URL = "http://localhost:9000/login/verfiy";

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const emailRegex = /^[a-zA-Z0-9._%+-]+@shanmugha\.edu\.in$/;
//     if (!emailRegex.test(logData.Email)) {
//       alert("Invalid email domain. Use @shanmugha.edu.in");
//       return;
//     }

//     axios
//       .post(URL, logData)
//       .then((response) => {
//         if (response.status === 200) {
//           saveLoginData(response.data.user);
//           navigate("/home");
//         } else {
//           alert(response.data.message);
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//         alert(error.response?.data?.message || "Something went wrong");
//       });
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 Login">
//       <h1 className="text-3xl font-extrabold text-center mb-4 text-blue-800">
//         Sri Shanmugha College Of Engineering and Technology
//       </h1>
//       <h2 className="text-xl font-semibold text-center mb-2 text-blue-600">
//         Library Management
//       </h2>
//       <h3 className="text-2xl font-bold text-center mb-6 text-blue-500">
//         Login
//       </h3>

//       <form
//         className="border border-gray-300 p-6 px-8 rounded-lg w-full max-w-md bg-white shadow-lg"
//         onSubmit={handleSubmit}
//       >
//         <label className="block text-lg font-medium mb-2 text-blue-600">Email:</label>
//         <input
//           type="email"
//           name="Email"
//           onChange={handleChange}
//           placeholder="Enter your email"
//           required
//           className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         <label className="block text-lg font-medium mb-2 text-blue-600">Password:</label>
//         <input
//           type="password"
//           name="Password"
//           onChange={handleChange}
//           placeholder="Enter your password"
//           required
//           className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         <button
//           type="submit"
//           className="w-full py-2 bg-blue-500 text-white rounded-lg text-lg font-bold mb-4 hover:bg-blue-600 transition duration-300"
//         >
//           Login
//         </button>

//         <p className="text-lg font-semibold text-center text-blue-700">
//           Don't have an account?{" "}
//           <Link to="/register" className="text-blue-600 underline">
//             Register
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;



import axios from "axios";
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  IconButton,
  useTheme
} from "@mui/material";
import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  School,
  LibraryBooks
} from "@mui/icons-material";

const Login = () => {
  const [logData, setLogData] = useState({
    Email: "",
    Password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const { saveLoginData } = useContext(AllDataContext);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleChange = (e) => {
    setLogData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
    setError(null);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const URL = "http://localhost:9000/login/verfiy";

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@shanmugha\.edu\.in$/;
    if (!emailRegex.test(logData.Email)) {
      setError("Invalid email domain. Use @shanmugha.edu.in");
      setOpenSnackbar(true);
      return;
    }

    axios
      .post(URL, logData)
      .then((response) => {
        if (response.status === 200) {
          saveLoginData(response.data.user);
          navigate("/home");
        } else {
          setError(response.data.message);
          setOpenSnackbar(true);
        }
      })
      .catch((error) => {
        console.error(error);
        setError(error.response?.data?.message || "Something went wrong");
        setOpenSnackbar(true);
      });
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
          Sri Shanmugha College Of Engineering and Technology
        </Typography>
        <Typography
          variant="h6"
          component="h2"
          sx={{
            fontWeight: 600,
            color: theme.palette.primary.main,
            mb: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1
          }}
        >
          <LibraryBooks />
          Library Management System
        </Typography>
        <Typography
          variant="h5"
          component="h3"
          sx={{ fontWeight: 700, color: theme.palette.primary.main }}
        >
          Login to Your Account
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
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email Address"
            name="Email"
            type="email"
            value={logData.Email}
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
            type={showPassword ? "text" : "password"}
            value={logData.Password}
            onChange={handleChange}
            required
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={togglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />

          <Button
            fullWidth
            variant="contained"
            type="submit"
            size="large"
            sx={{
              py: 1.5,
              fontSize: "1rem",
              fontWeight: 600,
              mb: 2,
            }}
          >
            Login
          </Button>

          <Typography variant="body1" textAlign="center" sx={{ mt: 2 }}>
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{
                color: theme.palette.primary.main,
                fontWeight: 600,
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Register Now
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
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
