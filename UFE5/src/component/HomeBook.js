




// import React from "react";
// import { Link } from "react-router-dom";
// import { Box, Typography, Grid, Paper, Button } from "@mui/material";
// import MenuBookIcon from "@mui/icons-material/MenuBook";
// import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
// import SchoolIcon from "@mui/icons-material/School";
// import ExploreIcon from "@mui/icons-material/Explore";

// const HomeBook = () => {
//   const features = [
//     {
//       icon: <MenuBookIcon fontSize="large" color="primary" />,
//       title: "Diverse Book Collection",
//       description:
//         "From academic references to trending novels, our collection supports learning and leisure alike.",
//     },
//     {
//       icon: <LibraryBooksIcon fontSize="large" color="primary" />,
//       title: "Effortless Access",
//       description:
//         "Reserve, borrow, and track books with ease through our seamless digital platform.",
//     },
//     {
//       icon: <SchoolIcon fontSize="large" color="primary" />,
//       title: "Empowering Education",
//       description:
//         "Designed to support students, researchers, and lifelong learners with top-notch resources.",
//     },
//   ];

//   return (
//     <Box
//       sx={{
//         px: 4,
//         py: 6,
//         background: "linear-gradient(135deg, #e3f2fd, #ffffff)",
//         minHeight: "100vh",
//       }}
//     >
//       {/* Hero Section */}
//       <Typography
//         variant="h3"
//         align="center"
//         gutterBottom
//         sx={{ fontWeight: "bold", color: "#0d47a1" }}
//       >
//         Explore. Learn. Grow.
//       </Typography>
//       <Typography
//         variant="h6"
//         align="center"
//         color="text.secondary"
//         sx={{ mb: 5, maxWidth: 800, mx: "auto" }}
//       >
//         Welcome to your one-stop destination for knowledge. Whether you're diving
//         into deep research or simply reading for pleasure, our library platform
//         provides you with the resources and tools to unlock your full potential.
//       </Typography>

//       {/* Feature Cards */}
//       <Grid container spacing={4} justifyContent="center">
//         {features.map((feature, index) => (
//           <Grid item xs={12} md={4} key={index}>
//             <Paper
//               elevation={6}
//               sx={{
//                 p: 3,
//                 textAlign: "center",
//                 borderRadius: 3,
//                 backgroundColor: "#f5faff",
//                 transition: "transform 0.3s ease",
//                 "&:hover": {
//                   transform: "translateY(-5px)",
//                 },
//               }}
//             >
//               <Box sx={{ mb: 2 }}>{feature.icon}</Box>
//               <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
//                 {feature.title}
//               </Typography>
//               <Typography variant="body1" color="text.secondary">
//                 {feature.description}
//               </Typography>
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Call to Action */}
//       <Box
//         sx={{
//           mt: 8,
//           p: 4,
//           backgroundColor: "#e3f2fd",
//           borderRadius: 3,
//           textAlign: "center",
//           boxShadow: 3,
//         }}
//       >
//         <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
//           Ready to Start Your Reading Journey?
//         </Typography>
//         <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
//           Discover thousands of books tailored for your academic and personal growth. Click below to start exploring.
//         </Typography>
//         <Button
//           variant="contained"
//           color="primary"
//           startIcon={<ExploreIcon />}
//           size="large"
//         >
//         <Link to="/institutions/:institution">  Browse Books</Link>
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default HomeBook;


import React from "react";
import { Link } from "react-router-dom";
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Button,
  useTheme,
  useMediaQuery 
} from "@mui/material";
import { 
  MenuBook, 
  LibraryBooks, 
  School, 
  Explore,
  AutoStories,
  ConnectWithoutContact,
  Lightbulb
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const HomeBook = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const features = [
    {
      icon: <MenuBook fontSize="large" color="primary" />,
      title: "Diverse Book Collection",
      description: "From academic references to trending novels, our collection supports learning and leisure alike.",
      color: "#e3f2fd"
    },
    {
      icon: <LibraryBooks fontSize="large" color="primary" />,
      title: "Effortless Access",
      description: "Reserve, borrow, and track books with ease through our seamless digital platform.",
      color: "#e8f5e9"
    },
    {
      icon: <School fontSize="large" color="primary" />,
      title: "Empowering Education",
      description: "Designed to support students, researchers, and lifelong learners with top-notch resources.",
      color: "#f3e5f5"
    },
    {
      icon: <AutoStories fontSize="large" color="primary" />,
      title: "Digital Resources",
      description: "Access e-books, journals, and research papers from anywhere, anytime.",
      color: "#e0f7fa"
    },
    {
      icon: <ConnectWithoutContact fontSize="large" color="primary" />,
      title: "Explore articles",
      description: "Join reading  and connect with fellow book enthusiasts.",
      color: "#fff8e1"
    },
    {
      icon: <Lightbulb fontSize="large" color="primary" />,
      title: "Open your Suggestions",
      description: "Specialized services to help with your academic books and research.",
      color: "#fce4ec"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <Box
      sx={{
        px: isMobile ? 2 : 6,
        py: 8,
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8ed 100%)",
        minHeight: "100vh",
        overflow: "hidden"
      }}
    >
      {/* Hero Section */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Typography
          variant={isMobile ? "h4" : "h3"}
          align="center"
          gutterBottom
          sx={{ 
            fontWeight: "bold", 
            color: "#1565c0",
            mb: 2,
            textShadow: "1px 1px 3px rgba(0,0,0,0.1)"
          }}
        >
          Explore. Learn. Grow.
        </Typography>
        <Typography
          variant={isMobile ? "body1" : "h6"}
          align="center"
          color="text.secondary"
          sx={{ 
            mb: 6, 
            maxWidth: 800, 
            mx: "auto",
            lineHeight: 1.6
          }}
        >
          Welcome to your one-stop destination for knowledge. Whether you're diving
          into deep research or simply reading for pleasure, our library platform
          provides you with the resources and tools to unlock your full potential.
        </Typography>
      </motion.div>

      {/* Feature Cards */}
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <Grid container spacing={4} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div variants={itemVariants}>
                <Paper
                  elevation={4}
                  sx={{
                    p: 3,
                    textAlign: "center",
                    borderRadius: 3,
                    backgroundColor: feature.color,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
                    },
                    borderLeft: "4px solid",
                    borderColor: theme.palette.primary.main
                  }}
                >
                  <Box sx={{ 
                    mb: 2,
                    "& .MuiSvgIcon-root": {
                      fontSize: "3rem"
                    }
                  }}>
                    {feature.icon}
                  </Box>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: "bold", 
                      mb: 1.5,
                      color: "#0d47a1"
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    color="text.secondary"
                    sx={{ flexGrow: 1 }}
                  >
                    {feature.description}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Box
          sx={{
            mt: 8,
            p: isMobile ? 3 : 4,
            background: "linear-gradient(135deg, #1976d2 0%, #0d47a1 100%)",
            borderRadius: 3,
            textAlign: "center",
            boxShadow: 3,
            color: "white",
            position: "relative",
            overflow: "hidden",
            "&:before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "radial-gradient(circle at top right, rgba(255,255,255,0.2) 0%, transparent 50%)"
            }
          }}
        >
          <Typography 
            variant={isMobile ? "h6" : "h5"} 
            sx={{ 
              fontWeight: "bold", 
              mb: 2,
              position: "relative"
            }}
          >
            Ready to Start Your Reading Journey?
          </Typography>
          <Typography 
            variant={isMobile ? "body2" : "body1"} 
            sx={{ 
              mb: 3,
              position: "relative",
              opacity: 0.9
            }}
          >
            Discover thousands of books tailored for your academic and personal growth.
          </Typography>
          <Button
            component={Link}
            to="/institutions/:institution"
            variant="contained"
            color="secondary"
            startIcon={<Explore />}
            size="large"
            sx={{
              position: "relative",
              fontWeight: "bold",
              px: 4,
              py: 1.5,
              borderRadius: 2,
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 6px 12px rgba(0,0,0,0.3)"
              },
              transition: "all 0.3s ease"
            }}
          >
            Browse Books
          </Button>
        </Box>
      </motion.div>
    </Box>
  );
};

export default HomeBook;