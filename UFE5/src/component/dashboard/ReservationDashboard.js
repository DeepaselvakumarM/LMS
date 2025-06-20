
// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import Adminnav from "../Adminnav";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
//   Cell,
// } from "recharts";
// import { saveAs } from "file-saver";
// import * as XLSX from "xlsx";
// import jsPDF from "jspdf";
// import "jspdf-autotable";

// const COLORS = [
//   "#007BFF", "#28A745", "#FFC107", "#DC3545",
//   "#6610f2", "#20c997", "#fd7e14", "#6f42c1",
// ];

// const ReservationDashboard = () => {
//   const [reservations, setReservations] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("all"); // Category (UG, PG, All)

//   useEffect(() => {
//     fetchReservations();
//   }, []);

//   const fetchReservations = async () => {
//     try {
//       const res = await axios.get("http://localhost:9000/reserve/getreserve");
//       setReservations(res.data.message);
//       setFiltered(res.data.message);
//     } catch (err) {
//       console.error("Error fetching reservations:", err);
//     }
//   };

//   const handleSearch = (e) => {
//     const keyword = e.target.value.toLowerCase();
//     setSearch(keyword);
//     const result = reservations.filter(
//       (rsv) =>
//         rsv.Name.toLowerCase().includes(keyword) ||
//         rsv.Bookname.toLowerCase().includes(keyword)
//     );
//     setFiltered(result);
//   };

//   const handleCategoryChange = (e) => {
//     setCategory(e.target.value);
//     filterByCategory(e.target.value);
//   };

//   const filterByCategory = (category) => {
//     if (category === "all") {
//       setFiltered(reservations);
//     } else {
//       const filteredByCategory = reservations.filter((rsv) => rsv.Course === category);
//       setFiltered(filteredByCategory);
//     }
//   };

//   const getChartData = () => {
//     const counts = {};
//     filtered.forEach((rsv) => {
//       counts[rsv.Bookname] = (counts[rsv.Bookname] || 0) + 1;
//     });

//     return Object.entries(counts).map(([Bookname, count]) => ({
//       Bookname,
//       count,
//     }));
//   };

//   const exportToExcel = () => {
//     const ws = XLSX.utils.json_to_sheet(filtered);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Reservations");
//     const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
//     const data = new Blob([excelBuffer], { type: "application/octet-stream" });
//     saveAs(data, "ReservationData.xlsx");
//   };

//   // const exportToPDF = () => {
//   //   const doc = new jsPDF();
//   //   const tableColumn = [
//   //     "Name",
//   //     "StudentID",
//   //     "Email",
//   //     "Bookname",
//   //     "Feedback",
//   //     "ReserveDate",
//   //     "ReturnDate",
//   //   ];
//   //   const tableRows = filtered.map((rsv) => [
//   //     rsv.Name,
//   //     rsv.StudentID,
//   //     rsv.Email,
//   //     rsv.Bookname,
//   //     rsv.Feedback,
//   //     rsv.ReserveDate,
//   //     rsv.ReturnDate,
//   //   ]);

//   //   doc.text("Reservation Report", 14, 15);
//   //   doc.autoTable({
//   //     head: [tableColumn],
//   //     body: tableRows,
//   //     startY: 20,
//   //   });
//   //   doc.save("ReservationReport.pdf");
//   // };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <Adminnav/>
//       <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">
//         📚 Reservation Dashboard
//       </h2>

//       <div className="flex flex-col sm:flex-row justify-between mb-4 gap-2">
//         <input
//           type="text"
//           placeholder="🔍 Search by student or book name"
//           className="border border-blue-300 p-2 rounded-md w-full sm:w-1/2"
//           value={search}
//           onChange={handleSearch}
//         />
//         <div className="flex gap-2 mt-2 sm:mt-0">
//           <button
//             onClick={exportToExcel}
//             className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
//           >
//             📄 Export Excel
//           </button>
//           {/* <button
//             onClick={exportToPDF}
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
//           >
//             📄 Export PDF
//           </button> */}
//         </div>
//       </div>

//       <div className="mb-4">
//         <select
//           onChange={handleCategoryChange}
//           className="border border-blue-300 p-2 rounded-md"
//         >
//           <option value="all">All Categories</option>
//           <option value="UG">Undergraduate (UG)</option>
//           <option value="PG">Postgraduate (PG)</option>
//         </select>
//       </div>

//       <div className="overflow-x-auto rounded shadow mb-10">
//         <table className="min-w-full bg-white border border-gray-300 rounded-md">
//           <thead>
//             <tr className="bg-blue-100 text-left text-sm">
//               <th className="py-3 px-4 border">Name</th>
//               <th className="py-3 px-4 border">Course</th>
//               <th className="py-3 px-4 border">Student ID</th>
//               <th className="py-3 px-4 border">Email</th>
//               <th className="py-3 px-4 border">Book Name</th>
//               <th className="py-3 px-4 border">Description</th>
//               <th className="py-3 px-4 border">Reserve Date</th>
//               <th className="py-3 px-4 border">Return Date</th>
//             </tr>
//           </thead>
//           <tbody className="text-sm">
//             {filtered.length > 0 ? (
//               filtered.map((rsv, index) => (
//                 <tr key={index} className="hover:bg-gray-50">
//                   <td className="py-2 px-4 border">{rsv.Name}</td>
//                   <td className="py-2 px-4 border">{rsv.Course}</td>
//                   <td className="py-2 px-4 border">{rsv.StudentID}</td>
//                   <td className="py-2 px-4 border">{rsv.Email}</td>
//                   <td className="py-2 px-4 border">{rsv.Bookname}</td>
//                   <td className="py-2 px-4 border">{rsv.Description}</td>
//                   <td className="py-2 px-4 border">{rsv.ReserveDate}</td>
//                   <td className="py-2 px-4 border">{rsv.ReturnDate}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="8" className="text-center py-4 text-gray-500">
//                   No reservations found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       <h3 className="text-xl font-semibold mb-3 text-gray-700">
//         📊 Reservation Trends
//       </h3>
//       <div className="bg-white p-6 rounded-xl shadow">
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart
//             data={getChartData()}
//             margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="Bookname" />
//             <YAxis allowDecimals={false} />
//             <Tooltip />
//             <Bar
//               dataKey="count"
//               radius={[6, 6, 0, 0]}
//               isAnimationActive={true}
//             >
//               {getChartData().map((entry, index) => (
//                 <Cell
//                   key={`cell-${index}`}
//                   fill={COLORS[index % COLORS.length]}
//                 />
//               ))}
//             </Bar>
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default ReservationDashboard;





import React, { useEffect, useState } from "react";
import axios from "axios";
import Adminnav from "../Adminnav";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
  PieChart,
  Pie,
  Legend
} from "recharts";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import {
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Avatar,
  Chip,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  InputAdornment
} from "@mui/material";
import {
  Search as SearchIcon,
  Download as DownloadIcon,
  Book as BookIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  CalendarToday as CalendarIcon,
  Email as EmailIcon,
  FilterAlt as FilterIcon,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon
} from "@mui/icons-material";

const COLORS = [
  "#0088FE", "#00C49F", "#FFBB28", "#FF8042",
  "#8884D8", "#82CA9D", "#FF6B6B", "#4ECDC4"
];

const ReservationDashboard = () => {
  const [reservations, setReservations] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const res = await axios.get("http://localhost:9000/reserve/getreserve");
      setReservations(res.data.message);
      setFiltered(res.data.message);
    } catch (err) {
      console.error("Error fetching reservations:", err);
    }
  };

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearch(keyword);
    const result = reservations.filter(
      (rsv) =>
        rsv.Name.toLowerCase().includes(keyword) ||
        rsv.Bookname.toLowerCase().includes(keyword)
    );
    setFiltered(result);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    filterByCategory(e.target.value);
  };

  const filterByCategory = (category) => {
    if (category === "all") {
      setFiltered(reservations);
    } else {
      const filteredByCategory = reservations.filter((rsv) => rsv.Course === category);
      setFiltered(filteredByCategory);
    }
  };

  const getChartData = () => {
    const counts = {};
    filtered.forEach((rsv) => {
      counts[rsv.Bookname] = (counts[rsv.Bookname] || 0) + 1;
    });

    return Object.entries(counts).map(([Bookname, count]) => ({
      Bookname,
      count,
    }));
  };

  const getCourseDistributionData = () => {
    const counts = {};
    filtered.forEach((rsv) => {
      counts[rsv.Course || 'Unknown'] = (counts[rsv.Course || 'Unknown'] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filtered);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Reservations");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "ReservationData.xlsx");
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Box sx={{ display: "flex", bgcolor: "#f8fafc", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Adminnav />
      
      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 4 }}>
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 ,mt:12}}>
          <Typography variant="h4" sx={{ fontWeight: "600", color: "#2d3748" }}>
            Reservation Management
          </Typography>
          <Chip 
            label={`Total Reservations: ${reservations.length}`} 
            color="primary" 
            icon={<BookIcon />}
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
                  Total Reservations
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: "700" }}>
                  {reservations.length}
                </Typography>
                <BookIcon sx={{ position: "absolute", right: 20, top: 20, fontSize: "3rem", opacity: 0.3 }} />
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
                  UG Reservations
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: "700" }}>
                  {reservations.filter(r => r.Course === "UG").length}
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
                  PG Reservations
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: "700" }}>
                  {reservations.filter(r => r.Course === "PG").length}
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
                  Unique Books
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: "700" }}>
                  {[...new Set(reservations.map(r => r.Bookname))].length}
                </Typography>
                <BookIcon sx={{ position: "absolute", right: 20, top: 20, fontSize: "3rem", opacity: 0.3 }} />
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
                placeholder="Search reservations..."
                variant="outlined"
                value={search}
                onChange={handleSearch}
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
                  value={category}
                  label="Course"
                  onChange={handleCategoryChange}
                  sx={{ borderRadius: "8px" }}
                >
                  <MenuItem value="all">All Courses</MenuItem>
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
              <Typography variant="h6" sx={{ mb: 3, fontWeight: "600", color: "#2d3748", display: "flex", alignItems: "center" }}>
                <BarChartIcon sx={{ mr: 1, color: "#4fc3f7" }} />
                Book Reservation Trends
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={getChartData()}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="Bookname" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} />
                  <Tooltip 
                    formatter={(value) => [`${value} reservations`, "Count"]}
                  />
                  <Bar
                    dataKey="count"
                    name="Reservations"
                    radius={[6, 6, 0, 0]}
                  >
                    {getChartData().map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
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
              <Typography variant="h6" sx={{ mb: 3, fontWeight: "600", color: "#2d3748", display: "flex", alignItems: "center" }}>
                <PieChartIcon sx={{ mr: 1, color: "#4fc3f7" }} />
                Course Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={getCourseDistributionData()}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    innerRadius={60}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {getCourseDistributionData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name) => [`${value} reservations`, name]}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>

        {/* Reservations Table */}
        <Paper elevation={0} sx={{ 
          p: 3, 
          borderRadius: "12px",
          background: "#ffffff",
          boxShadow: "0 1px 15px 0 rgba(0,0,0,0.04)"
        }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "600", color: "#2d3748" }}>
              Reservation Details
            </Typography>
            <Chip 
              label={`Showing ${filtered.length} of ${reservations.length}`} 
              color="default" 
              variant="outlined"
              sx={{ px: 2, fontWeight: "500" }}
            />
          </Box>
          
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="reservation table">
              <TableHead>
                <TableRow sx={{ bgcolor: "#f5f7fa" }}>
                  <TableCell sx={{ fontWeight: "600" }}>Student</TableCell>
                  <TableCell sx={{ fontWeight: "600" }}>Course</TableCell>
                  <TableCell sx={{ fontWeight: "600" }}>Book</TableCell>
                  <TableCell sx={{ fontWeight: "600" }}>Reserve Date</TableCell>
                  <TableCell sx={{ fontWeight: "600" }}>Return Date</TableCell>
                  <TableCell sx={{ fontWeight: "600" }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.length > 0 ? (
                  filtered.map((rsv, index) => (
                    <TableRow
                      key={index}
                      hover
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar sx={{ 
                            width: 36, 
                            height: 36, 
                            mr: 2,
                            bgcolor: COLORS[index % COLORS.length],
                            fontSize: "0.875rem"
                          }}>
                            {getInitials(rsv.Name)}
                          </Avatar>
                          <Box>
                            <Typography sx={{ fontWeight: "500" }}>{rsv.Name}</Typography>
                            <Typography variant="body2" color="text.secondary">{rsv.StudentID}</Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={rsv.Course || "Unknown"} 
                          size="small" 
                          color={rsv.Course === "UG" ? "primary" : rsv.Course === "PG" ? "secondary" : "default"}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography sx={{ fontWeight: "500" }}>{rsv.Bookname}</Typography>
                        <Typography variant="body2" color="text.secondary">{rsv.Description}</Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <CalendarIcon sx={{ mr: 1, fontSize: "1rem", color: "text.secondary" }} />
                          {rsv.ReserveDate}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <CalendarIcon sx={{ mr: 1, fontSize: "1rem", color: "text.secondary" }} />
                          {rsv.ReturnDate}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label="Active" 
                          size="small" 
                          color="success"
                          sx={{ backgroundColor: "#e6fffa", color: "#38b2ac" }}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} sx={{ textAlign: "center", py: 4 }}>
                      <Typography variant="body1" color="text.secondary">
                        No reservations found matching your criteria.
                      </Typography>
                      <Button 
                        variant="text" 
                        color="primary" 
                        onClick={() => {
                          setSearch("");
                          setCategory("all");
                        }}
                        sx={{ mt: 1 }}
                      >
                        Clear filters
                      </Button>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Box>
  );
};

export default ReservationDashboard;