

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";
import AdminNav from "./Adminnav"; // Adjust path if needed

const Adminstory = () => {
  const [storyBooks, setStoryBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:9000/storybook/list")
      .then((res) => {
        setStoryBooks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch story books:", err);
        setError("Failed to load story books.");
        setLoading(false);
      });
  }, []);

  return (
    <>
      <AdminNav />
      <Container maxWidth="lg" sx={{ mt: 14 }}>
        <Typography variant="h4" gutterBottom color="primary" align="center">
        Non Academic Books
        </Typography>

        {loading ? (
          <CircularProgress sx={{ display: "block", mx: "auto", mt: 4 }} />
        ) : error ? (
          <Typography color="error" align="center" mt={4}>
            {error}
          </Typography>
        ) : (
          <TableContainer component={Paper} sx={{ borderRadius: 3, mt: 2 }}>
            <Table>
              <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                <TableRow>
                <TableCell>Book ID</TableCell>
                  <TableCell>Book Name</TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Rack Number</TableCell>
                  <TableCell>Availability</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {storyBooks.map((book) => (
                  <TableRow key={book._id}>
                     <TableCell>{book.Bookid}</TableCell>
                    <TableCell>{book.Bookname}</TableCell>
                    <TableCell>{book.Author}</TableCell>
                    <TableCell>{book.Description}</TableCell>
                    <TableCell>{book.RackNumber}</TableCell>
                    <TableCell>{book.Availability}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}




        
      </Container>
    </>
  );
};

export default Adminstory;



