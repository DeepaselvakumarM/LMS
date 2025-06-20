// import React from "react";
// import { Link } from "react-router-dom";
// import Library2 from  '../cimg2.jpg';
// import {
//   Box,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   CardMedia,
//   Button,
// } from "@mui/material";
// import { Article } from "@mui/icons-material";

// const articles = [
//   {
//     title: "The Power of Academic Writing",
//     description:
//       "Learn how strong writing skills can elevate your research and presentation clarity.",
//     image:
//       "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=60",
//   },
//   {
//     title: "Top 5 Research Tips for Students",
//     description:
//       "Master the art of finding reliable sources and organizing your findings effectively.",
//     image:
//       "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=60",
//   },
//   {
//     title: "How to Stay Informed in the Digital Age",
//     description:
//       "Discover ways to stay up-to-date with trustworthy educational content online.",
//     image:
//     Library2,
//   },
// ];

// const HomeArticle = () => {
//   return (
//     <Box
//       sx={{
//         px: { xs: 2, md: 6 },
//         py: 6,
//         backgroundColor: "#f5f7fa",
//         minHeight: "100vh",
//       }}
//     >
//       {/* Section Header */}
//       <Box sx={{ textAlign: "left", mb: 4 }}>
//         <Typography variant="h4" sx={{ fontWeight: 700, color: "#0d47a1" }}>
//           Featured Articles
//         </Typography>
//         <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
//           Stay sharp with curated reads tailored for student success and critical thinking.
//         </Typography>
//       </Box>

//       {/* Articles Grid */}
//       <Grid container spacing={4}>
//         {articles.map((article, index) => (
//           <Grid item xs={12} md={4} key={index}>
//             <Card
//               sx={{
//                 borderRadius: 3,
//                 boxShadow: 3,
//                 transition: "transform 0.3s ease-in-out",
//                 "&:hover": {
//                   transform: "scale(1.02)",
//                 },
//               }}
//             >
//               <CardMedia
//                 component="img"
//                 height="180"
//                 image={article.image}
//                 alt={article.title}
//               />
//               <CardContent>
//                 <Typography
//                   variant="h6"
//                   component="div"
//                   sx={{ fontWeight: 600, mb: 1 }}
//                 >
//                   {article.title}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   {article.description}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {/* CTA Section */}
//       <Box
//         sx={{
//           mt: 8,
//           textAlign: "center",
//           backgroundColor: "#e3f2fd",
//           py: 5,
//           borderRadius: 3,
//         }}
//       >
//         <Typography
//           variant="h5"
//           sx={{ fontWeight: "bold", color: "#0d47a1", mb: 1 }}
//         >
//           Interested in Contributing?
//         </Typography>
//         <Typography variant="body1" sx={{ mb: 3 }} color="text.secondary">
//           Share your insights or research articles and join our academic contributors.
//         </Typography>
        
//         <Button
//           variant="contained"
//           size="large"
//           color="primary"
//           startIcon={<Article />}
//         >
//          <Link to="/article"> Submit Article</Link>
//         </Button>
        
//       </Box>
//     </Box>
//   );
// };

// export default HomeArticle;


import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Library2 from '../cimg2.jpg';
import Library1 from "../cimg1.jpg"
import Library3 from "../cimg3.jpg"
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  useTheme,
  useMediaQuery,
  Chip,
  Avatar
} from "@mui/material";
import { 
  Article, 
  TrendingUp, 
  School, 
  MenuBook,
  ArrowForward
} from "@mui/icons-material";

const articles = [
  {
    title: "The Power of Academic Writing",
    description: "Learn how strong writing skills can elevate your research and presentation clarity.",
    image: Library1,
    category: "Writing",
    date: "May 15, 2023",
    author: "Dr. Sarah Johnson"
  },
  {
    title: "Top 5 Research Tips for Students",
    description: "Master the art of finding reliable sources and organizing your findings effectively.",
    image: Library3,
    category: "Research",
    date: "June 2, 2023",
    author: "Prof. Michael Chen"
  },
  {
    title: "How to Stay Informed in the Digital Age",
    description: "Discover ways to stay up-to-date with trustworthy educational content online.",
    image: Library2,
    category: "Digital Literacy",
    date: "June 18, 2023",
    author: "Alexandra Park"
  },
];

const HomeArticle = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

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
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <Box
      sx={{
        px: isMobile ? 2 : 6,
        py: 8,
        background: "linear-gradient(135deg, #f8fafc 0%, #eef2f6 100%)",
        minHeight: "100vh",
        overflow: "hidden"
      }}
    >
      {/* Section Header */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Box sx={{ textAlign: "left", mb: 6 }}>
          <Typography 
            variant={isMobile ? "h4" : "h3"} 
            sx={{ 
              fontWeight: 800, 
              color: "#0d47a1",
              mb: 1,
              lineHeight: 1.2
            }}
          >
            Featured <span style={{ color: theme.palette.secondary.main }}>Articles</span>
          </Typography>
          <Typography 
            variant={isMobile ? "body1" : "h6"} 
            color="text.secondary" 
            sx={{ 
              mt: 1,
              maxWidth: 700,
              lineHeight: 1.6
            }}
          >
            Stay sharp with curated reads tailored for student success and critical thinking.
          </Typography>
        </Box>
      </motion.div>

      {/* Articles Grid */}
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <Grid container spacing={4}>
          {articles.map((article, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div variants={itemVariants}>
                <Card
                  sx={{
                    borderRadius: 4,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                    transition: "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 12px 28px rgba(0,0,0,0.12)"
                    },
                    border: "1px solid rgba(0,0,0,0.05)"
                  }}
                >
                  <CardMedia
                    component="img"
                    height="220"
                    image={article.image}
                    alt={article.title}
                    sx={{
                      objectPosition: "center",
                      filter: "brightness(0.95)",
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                      <Chip
                        label={article.category}
                        size="small"
                        color="secondary"
                        sx={{ 
                          fontWeight: 600,
                          borderRadius: 1,
                          px: 0.5
                        }}
                      />
                      <Typography 
                        variant="caption" 
                        color="text.secondary" 
                        sx={{ ml: "auto" }}
                      >
                        {article.date}
                      </Typography>
                    </Box>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ 
                        fontWeight: 700, 
                        mb: 1.5,
                        lineHeight: 1.3,
                        color: "#1a237e"
                      }}
                    >
                      {article.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {article.description}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", mt: "auto" }}>
                      <Avatar 
                        sx={{ 
                          width: 32, 
                          height: 32, 
                          mr: 1.5,
                          bgcolor: theme.palette.primary.main,
                          fontSize: "0.8rem"
                        }}
                      >
                        {article.author.split(" ").map(n => n[0]).join("")}
                      </Avatar>
                      <Typography variant="caption" color="text.secondary">
                        {article.author}
                      </Typography>
                      <Button
                        component={Link}
                        to="/article"
                        size="small"
                        endIcon={<ArrowForward />}
                        sx={{ 
                          ml: "auto",
                          color: theme.palette.primary.main,
                          fontWeight: 600,
                          "&:hover": {
                            backgroundColor: "transparent"
                          }
                        }}
                      >
                        Read
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Box
          sx={{
            mt: 8,
            textAlign: "center",
            background: "linear-gradient(135deg, #1976d2 0%, #0d47a1 100%)",
            py: isMobile ? 4 : 6,
            px: isMobile ? 2 : 4,
            borderRadius: 4,
            color: "white",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 12px 24px rgba(13, 71, 161, 0.2)",
            "&:before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.15) 0%, transparent 50%)"
            }
          }}
        >
          <Typography
            variant={isMobile ? "h5" : "h4"}
            sx={{ 
              fontWeight: 800, 
              mb: 2,
              position: "relative",
              textShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}
          >
            Interested in Contributing?
          </Typography>
          <Typography 
            variant={isMobile ? "body1" : "h6"} 
            sx={{ 
              mb: 3,
              position: "relative",
              opacity: 0.9,
              maxWidth: 700,
              mx: "auto"
            }}
          >
            Share your insights or research articles and join our academic contributors.
          </Typography>
          
          <Button
            component={Link}
            to="/article"
            variant="contained"
            size="large"
            color="secondary"
            startIcon={<Article />}
            sx={{
              position: "relative",
              fontWeight: 700,
              px: 4,
              py: 1.5,
              borderRadius: 2,
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 6px 16px rgba(0,0,0,0.3)"
              },
              transition: "all 0.3s ease"
            }}
          >
            Submit Article
          </Button>
        </Box>
      </motion.div>
    </Box>
  );
};

export default HomeArticle;