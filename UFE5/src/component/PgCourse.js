// import React from "react";
// import { Link } from "react-router-dom";
// import {
//   Box,
//   Typography,
//   List,
//   ListItem,
//   Paper,
// } from "@mui/material";
// import Navbar from "./Navbar";

// const PgCourse = () => {
//   const pgCourses = ["ME Computer Science and Engineering", "ME Industrial Safety Engineering"];

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
//             mt: 10,
//           }}
//         >
//           POSTGRADUATE COURSES
//         </Typography>

//         <List sx={{ padding: 0 }}>
//           {pgCourses.map((course, index) => (
//             <ListItem
//               key={index}
//               component={Paper}
//               sx={{
//                 padding: "15px",
//                 marginBottom: "15px",
//                 backgroundColor: "#e6efff",
//                 borderLeft: "6px solid #005b96",
//                 borderRadius: "6px",
//                 boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
//                 transition: "all 0.3s ease",
//                 "&:hover": {
//                   backgroundColor: "#cce0ff",
//                   transform: "translateY(-3px)",
//                 },
//               }}
//             >
//               <Link
//                 to={`/courses/pg/${course.toLowerCase().replace(/ /g, "-")}`}
//                 style={{
//                   textDecoration: "none",
//                   color: "#002244",
//                   fontSize: "18px",
//                   fontWeight: "500",
//                   width: "100%",
//                   textAlign: "center",
//                 }}
//               >
//                 {course}
//               </Link>
//             </ListItem>
//           ))}
//         </List>
//       </Box>
//     </div>
//   );
// };

// export default PgCourse;



import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  List,
  ListItem,
  Paper,
  Chip,
  Container,
  useTheme,
  useMediaQuery,
  Grow,
  Fade
} from "@mui/material";
import Navbar from "./Navbar";
import {
  School,
  ArrowForward,
  Science,
  Engineering,
  Computer
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const CourseCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderLeft: `6px solid ${theme.palette.primary.main}`,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  transition: theme.transitions.create(['transform', 'box-shadow'], {
    duration: theme.transitions.duration.standard,
  }),
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[6],
    backgroundColor: theme.palette.action.hover,
  },
}));

const CourseLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.primary,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  padding: theme.spacing(1),
}));

const PgCourse = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const pgCourses = [
    { 
      name: "ME Computer Science and Engineering", 
      icon: <Computer color="primary" sx={{ mr: 2 }} />,
     
    },
    { 
      name: "ME Industrial Safety Engineering", 
      icon: <Engineering color="primary" sx={{ mr: 2 }} />,
      
    }
  ];

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
        py: { xs: 4, md: 6 },
        px: { xs: 2, sm: 3 }
      }}>
        <Fade in={true} timeout={800}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                color: theme.palette.primary.dark,
                fontWeight: 700,
                mb: 2,
                mt: { xs: 4, md: 6 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2
              }}
            >
              <School fontSize="large" />
              Postgraduate Programs
            </Typography>
            
          </Box>
        </Fade>

        <List sx={{ padding: 0 }}>
          {pgCourses.map((course, index) => (
            <Grow in={true} timeout={(index + 1) * 300} key={index}>
              <CourseCard elevation={3}>
                <CourseLink 
                  to={`/courses/pg/${course.name.toLowerCase().replace(/ /g, "-")}`}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {course.icon}
                    <Box>
                      <Typography 
                        variant="h6" 
                        component="div"
                        sx={{ fontWeight: 600 }}
                      >
                        {course.name}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                       
                      </Box>
                    </Box>
                  </Box>
                  <ArrowForward color="primary" />
                </CourseLink>
              </CourseCard>
            </Grow>
          ))}
        </List>

        {!isMobile && (
          <Fade in={true} timeout={1500}>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ 
                textAlign: 'center', 
                mt: 4,
                fontStyle: 'italic'
              }}
            >
             
            </Typography>
          </Fade>
        )}
      </Container>
    </Box>
  );
};

export default PgCourse;