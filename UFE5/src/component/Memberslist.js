
import React, { useEffect, useState } from "react";
import Adminnav from "./Adminnav";
import axios from "axios";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";

const Memberslist = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:9000/users/senddata");
        setMembers(res.data.message);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ backgroundColor: "#f0f4fa", minHeight: "100vh" }}>
      <Adminnav />
      <Box sx={{ paddingX: 3, paddingTop: 12, maxWidth: "1200px", margin: "auto" }}>
        <Typography
          variant="h4"
          align="center"
          sx={{ color: "#007bff", marginBottom: 3 }}
        >
          Members List
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper} sx={{ boxShadow: 4 }}>
            <Table sx={{ minWidth: 650 }} aria-label="members table">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#007bff" }}>
                  <TableCell sx={{ fontWeight: "bold", color: "white" }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "white" }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "white" }}>Course</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {members.map((member, index) => (
                  <TableRow key={index} hover>
                    <TableCell>{member.Name}</TableCell>
                    <TableCell>{member.Email}</TableCell>
                    <TableCell>{member.Course}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </div>
  );
};

export default Memberslist;
