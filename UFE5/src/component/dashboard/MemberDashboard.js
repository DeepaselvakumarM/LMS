



// import { InputAdornment } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Adminnav from "../Adminnav";
// import {
//   Box,
//   Typography,
//   Grid,
//   Paper,
//   TextField,
//   Button,
//   CircularProgress,
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Divider,
// } from "@mui/material";
// import {
//   BarChart as BarChartIcon,
//   Logout as LogoutIcon,
//   Search as SearchIcon,
//   MenuBook as MenuBookIcon,
// } from "@mui/icons-material";
// import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
// import { useNavigate } from "react-router-dom";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";

// const COLORS = ["#4caf50", "#2196f3", "#ff9800", "#e91e63", "#9c27b0", "#00bcd4"];

// const MemberDashboard = () => {
//   const [members, setMembers] = useState([]);
//   const [filteredMembers, setFilteredMembers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchMembers = async () => {
//       try {
//         const res = await axios.get("http://localhost:9000/users/senddata");
//         setMembers(res.data.message);
//         setFilteredMembers(res.data.message);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching members:", error);
//         setLoading(false);
//       }
//     };

//     fetchMembers();
//   }, []);

//   useEffect(() => {
//     const filtered = members.filter((member) => {
//       return (
//         member.Name.toLowerCase().includes(searchTerm.toLowerCase()) &&
//         (selectedCategory === "All" || member.Course === selectedCategory)
//       );
//     });
//     setFilteredMembers(filtered);
//   }, [searchTerm, selectedCategory, members]);

//   const courseCount = filteredMembers.reduce(
//     (acc, member) => {
//       const course = member.Course || "Unknown";
//       acc[course] = (acc[course] || 0) + 1;
//       return acc;
//     },
//     {}
//   );

//   const pieChartData = Object.entries(courseCount).map(([name, value]) => ({
//     name,
//     value,
//   }));

//   const exportToExcel = () => {
//     const ws = XLSX.utils.json_to_sheet(filteredMembers);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Members");
//     const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
//     const fileData = new Blob([excelBuffer], { type: "application/octet-stream" });
//     saveAs(fileData, "members.xlsx");
//   };

//   return (
//     <Box sx={{ display: "flex", bgcolor: "#f4f6f8", minHeight: "100vh" }}>
//       {/* Sidebar */}
//       <Adminnav />
//       <Drawer
//         variant="permanent"
//         anchor="left"
//         sx={{
//           width: 250,
//           flexShrink: 0,
//           "& .MuiDrawer-paper": {
//             width: 250,
//             boxSizing: "border-box",
//             background: "#1e1e2f",
//             color: "#fff",
//           },
//         }}
//       >
//         <Box sx={{ p: 3, textAlign: "center" }}>
//           <Typography variant="h6" sx={{ fontWeight: "bold", color: "#00e5ff" }}>
//             📚 Library System
//           </Typography>
//         </Box>
//         <Divider sx={{ bgcolor: "#444" }} />
//         <List>
//           <ListItem button onClick={() => navigate("/reservation-dashboard")}>
//             <ListItemIcon sx={{ color: "#00e5ff" }}>
//               <BarChartIcon />
//             </ListItemIcon>
//             <ListItemText primary="Reservation Dashboard" />
//           </ListItem>

//           {/* ✅ Added Books Dashboard
//           <ListItem button onClick={() => navigate("/books-dashboard")}>
//             <ListItemIcon sx={{ color: "#00e5ff" }}>
//               <MenuBookIcon />
//             </ListItemIcon>
//             <ListItemText primary="Books Dashboard" />
//           </ListItem> */}

//           <ListItem button onClick={() => navigate("/login")}>
//             <ListItemIcon sx={{ color: "#00e5ff" }}>
//               <LogoutIcon />
//             </ListItemIcon>
//             <ListItemText primary="Logout" />
//           </ListItem>
//         </List>
//       </Drawer>

//       {/* Main Content */}
//       <Box sx={{ flexGrow: 1, p: 5 }}>
//         <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4, color: "#1e88e5" }}>
//           👨‍🎓 Member Dashboard
//         </Typography>

//         {/* Search Bar */}
//         <Paper
//           elevation={3}
//           sx={{
//             my: 4,
//             p: 2,
//             display: "flex",
//             alignItems: "center",
//             borderRadius: 2,
//             background: "#fff",
//           }}
//         >
//           <TextField
//             fullWidth
//             placeholder="Search by member name..."
//             variant="outlined"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon color="primary" />
//                 </InputAdornment>
//               ),
//             }}
//             sx={{
//               borderRadius: 2,
//             }}
//           />
//           <Button
//             variant="contained"
//             color="success"
//             sx={{ ml: 2 }}
//             onClick={exportToExcel}
//           >
//             Export to Excel
//           </Button>
//         </Paper>

//         {/* Category Filter */}
//         <Box sx={{ mb: 4 }}>
//           <Button
//             variant={selectedCategory === "All" ? "contained" : "outlined"}
//             color="primary"
//             onClick={() => setSelectedCategory("All")}
//             sx={{ marginRight: 2 }}
//           >
//             All
//           </Button>
//           <Button
//             variant={selectedCategory === "UG" ? "contained" : "outlined"}
//             color="primary"
//             onClick={() => setSelectedCategory("UG")}
//             sx={{ marginRight: 2 }}
//           >
//             UG
//           </Button>
//           <Button
//             variant={selectedCategory === "PG" ? "contained" : "outlined"}
//             color="primary"
//             onClick={() => setSelectedCategory("PG")}
//           >
//             PG
//           </Button>
//         </Box>

//         {/* Pie Chart for Members */}
//         <Grid container spacing={3}>
//           <Grid item xs={12} sm={6} md={6}>
//             <Paper elevation={4} sx={{ p: 3, height: 300 }}>
//               <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
//                 🧑‍💼 Member Distribution
//               </Typography>
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={pieChartData}
//                     dataKey="value"
//                     nameKey="name"
//                     cx="50%"
//                     cy="50%"
//                     outerRadius={90}
//                     fill="#8884d8"
//                     label
//                   >
//                     {pieChartData.map((_, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                 </PieChart>
//               </ResponsiveContainer>
//             </Paper>
//           </Grid>
//         </Grid>

//         <br />

//         {/* Members Table */}
//         {loading ? (
//           <Box sx={{ textAlign: "center", mt: 4 }}>
//             <CircularProgress />
//           </Box>
//         ) : (
//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//               <Paper elevation={3}>
//                 <Typography variant="h6" sx={{ textAlign: "center", p: 2 }}>
//                   Member List
//                 </Typography>
//                 <Box sx={{ p: 2 }}>
//                   <Grid container spacing={2}>
//                     {filteredMembers.length > 0 ? (
//                       filteredMembers.map((member, index) => (
//                         <Grid item xs={12} sm={6} md={4} key={index}>
//                           <Paper
//                             sx={{
//                               p: 2,
//                               backgroundColor: "#f0f4ff",
//                               borderLeft: "5px solid #3f51b5",
//                               boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
//                               transition: "transform 0.3s ease",
//                               "&:hover": {
//                                 transform: "scale(1.03)",
//                                 backgroundColor: "#e6edff",
//                               },
//                             }}
//                           >
//                             <Typography
//                               variant="h6"
//                               sx={{ fontWeight: "bold", color: "#3f51b5" }}
//                             >
//                               {member.Name}
//                             </Typography>
//                             <Typography variant="body2" sx={{ mb: 0.5 }}>
//                               <strong>Course:</strong> {member.Course}
//                             </Typography>
//                           </Paper>
//                         </Grid>
//                       ))
//                     ) : (
//                       <Typography variant="body2" sx={{ textAlign: "center" }}>
//                         No members found.
//                       </Typography>
//                     )}
//                   </Grid>
//                 </Box>
//               </Paper>
//             </Grid>
//           </Grid>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default MemberDashboard;


















import { InputAdornment } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Adminnav from "../Adminnav";
import {
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  CircularProgress,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Card,
  CardContent,
  Avatar,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  BarChart as BarChartIcon,
  Logout as LogoutIcon,
  Search as SearchIcon,
  MenuBook as MenuBookIcon,
  People as PeopleIcon,
  School as SchoolIcon,
  Download as DownloadIcon,
  FilterAlt as FilterIcon,
} from "@mui/icons-material";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Legend } from "recharts";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"];

const MemberDashboard = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get("http://localhost:9000/users/senddata");
        setMembers(res.data.message);
        setFilteredMembers(res.data.message);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching members:", error);
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  useEffect(() => {
    const filtered = members.filter((member) => {
      return (
        member.Name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === "All" || member.Course === selectedCategory)
      );
    });
    setFilteredMembers(filtered);
  }, [searchTerm, selectedCategory, members]);

  const courseCount = filteredMembers.reduce(
    (acc, member) => {
      const course = member.Course || "Unknown";
      acc[course] = (acc[course] || 0) + 1;
      return acc;
    },
    {}
  );

  const pieChartData = Object.entries(courseCount).map(([name, value]) => ({
    name,
    value,
  }));

  const barChartData = Object.entries(courseCount).map(([name, value]) => ({
    name,
    count: value,
  }));

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredMembers);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Members");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const fileData = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(fileData, "members.xlsx");
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Box sx={{ display: "flex", bgcolor: "#f8fafc", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Adminnav />
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            background: "linear-gradient(180deg, #2c3e50 0%, #1a252f 100%)",
            color: "#fff",
            borderRight: "none",
          },
        }}
      >
        <Box sx={{ p: 3, textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <SchoolIcon sx={{ mr: 1, color: "#4fc3f7" }} />
            <span style={{ color: "#4fc3f7" }}>Edu</span>Admin
          </Typography>
        </Box>
        <List sx={{ mt: 2 }}>
          <ListItem 
            button 
            onClick={() => navigate("/reservation-dashboard")}
            sx={{
              "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
              "&.Mui-selected": { backgroundColor: "rgba(79, 195, 247, 0.2)" }
            }}
          >
            <ListItemIcon sx={{ color: "#4fc3f7", minWidth: "40px" }}>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Reservations" />
          </ListItem>

          <ListItem 
            button 
            sx={{
              backgroundColor: "rgba(79, 195, 247, 0.2)",
              "&:hover": { backgroundColor: "rgba(79, 195, 247, 0.3)" }
            }}
          >
            <ListItemIcon sx={{ color: "#4fc3f7", minWidth: "40px" }}>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Members" />
          </ListItem>

          {/* <ListItem 
            button 
            onClick={() => navigate("/login")}
            sx={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" }
            }}
          > */}
            {/* <ListItemIcon sx={{ color: "#f44336", minWidth: "40px" }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem> */}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 4 }}>
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4,mt:15 }}>
          <Typography variant="h4" sx={{ fontWeight: "600", color: "#2d3748" }}>
            Member Management
          </Typography>
          <Chip 
            label={`Total Members: ${members.length}`} 
            color="primary" 
            icon={<PeopleIcon />}
            sx={{ px: 2, py: 1, fontSize: "0.875rem", fontWeight: "600" }}
          />
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
              color: "#fff",
              borderRadius: "10px",
              boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)"
            }}>
              <CardContent>
                <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>
                  Total Members
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: "700" }}>
                  {members.length}
                </Typography>
                <PeopleIcon sx={{ position: "absolute", right: 20, top: 20, fontSize: "3rem", opacity: 0.3 }} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
              color: "#fff",
              borderRadius: "10px",
              boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)"
            }}>
              <CardContent>
                <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>
                  UG Students
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: "700" }}>
                  {members.filter(m => m.Course === "UG").length}
                </Typography>
                <SchoolIcon sx={{ position: "absolute", right: 20, top: 20, fontSize: "3rem", opacity: 0.3 }} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              background: "linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)",
              color: "#fff",
              borderRadius: "10px",
              boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)"
            }}>
              <CardContent>
                <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>
                  PG Students
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: "700" }}>
                  {members.filter(m => m.Course === "PG").length}
                </Typography>
                <SchoolIcon sx={{ position: "absolute", right: 20, top: 20, fontSize: "3rem", opacity: 0.3 }} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
              color: "#fff",
              borderRadius: "10px",
              boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)"
            }}>
              <CardContent>
                <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>
                  Unknown
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: "700" }}>
                  {members.filter(m => !m.Course || m.Course === "Unknown").length}
                </Typography>
                <PeopleIcon sx={{ position: "absolute", right: 20, top: 20, fontSize: "3rem", opacity: 0.3 }} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Search and Filter Section */}
        <Paper elevation={0} sx={{ 
          p: 3, 
          mb: 4, 
          borderRadius: "12px",
          background: "#ffffff",
          boxShadow: "0 1px 15px 0 rgba(0,0,0,0.04)"
        }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search members..."
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                  sx: { borderRadius: "8px" }
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#e2e8f0",
                    },
                    "&:hover fieldset": {
                      borderColor: "#cbd5e0",
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel id="category-filter-label">Course</InputLabel>
                <Select
                  labelId="category-filter-label"
                  value={selectedCategory}
                  label="Course"
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  sx={{ borderRadius: "8px" }}
                >
                  <MenuItem value="All">All Courses</MenuItem>
                  <MenuItem value="UG">Undergraduate</MenuItem>
                  <MenuItem value="PG">Postgraduate</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                startIcon={<DownloadIcon />}
                onClick={exportToExcel}
                sx={{
                  height: "56px",
                  borderRadius: "8px",
                  textTransform: "none",
                  fontWeight: "600",
                  boxShadow: "none",
                  "&:hover": {
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }
                }}
              >
                Export Data
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Charts Section */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ 
              p: 3, 
              height: "100%", 
              borderRadius: "12px",
              background: "#ffffff",
              boxShadow: "0 1px 15px 0 rgba(0,0,0,0.04)"
            }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: "600", color: "#2d3748" }}>
                Member Distribution by Course
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    innerRadius={60}
                    fill="#8884d8"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieChartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name, props) => [`${value} members`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ 
              p: 3, 
              height: "100%", 
              borderRadius: "12px",
              background: "#ffffff",
              boxShadow: "0 1px 15px 0 rgba(0,0,0,0.04)"
            }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: "600", color: "#2d3748" }}>
                Member Count by Course
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barChartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#4fc3f7" name="Number of Members" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>

        {/* Members List */}
        <Paper elevation={0} sx={{ 
          p: 3, 
          borderRadius: "12px",
          background: "#ffffff",
          boxShadow: "0 1px 15px 0 rgba(0,0,0,0.04)"
        }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "600", color: "#2d3748" }}>
              Member Directory
            </Typography>
            <Chip 
              label={`Showing ${filteredMembers.length} of ${members.length}`} 
              color="default" 
              variant="outlined"
              sx={{ px: 2, fontWeight: "500" }}
            />
          </Box>
          
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
              <CircularProgress color="primary" />
            </Box>
          ) : (
            <Grid container spacing={3}>
              {filteredMembers.length > 0 ? (
                filteredMembers.map((member, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <Card sx={{ 
                      height: "100%",
                      borderRadius: "12px",
                      boxShadow: "0 2px 10px 0 rgba(0,0,0,0.04)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 10px 20px 0 rgba(0,0,0,0.08)"
                      }
                    }}>
                      <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", pt: 4 }}>
                        <Avatar 
                          sx={{ 
                            width: 72, 
                            height: 72, 
                            mb: 2,
                            bgcolor: COLORS[index % COLORS.length],
                            fontSize: "1.5rem",
                            fontWeight: "600"
                          }}
                        >
                          {getInitials(member.Name)}
                        </Avatar>
                        <Typography variant="h6" sx={{ fontWeight: "600", textAlign: "center" }}>
                          {member.Name}
                        </Typography>
                        <Chip 
                          label={member.Course || "Unknown"} 
                          size="small" 
                          color={member.Course === "UG" ? "primary" : member.Course === "PG" ? "secondary" : "default"}
                          sx={{ mt: 1, mb: 1 }}
                        />
                        <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
                          Member ID: {member._id.slice(-6).toUpperCase()}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Box sx={{ 
                    p: 4, 
                    textAlign: "center", 
                    backgroundColor: "#f8fafc", 
                    borderRadius: "12px"
                  }}>
                    <Typography variant="body1" color="text.secondary">
                      No members found matching your criteria.
                    </Typography>
                    <Button 
                      variant="text" 
                      color="primary" 
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedCategory("All");
                      }}
                      sx={{ mt: 1 }}
                    >
                      Clear filters
                    </Button>
                  </Box>
                </Grid>
              )}
            </Grid>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default MemberDashboard;