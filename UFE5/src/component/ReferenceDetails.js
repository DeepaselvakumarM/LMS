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
import AdminNav from "./Adminnav"; // Adjust the path if needed

const ReferenceDetails = () => {
  const [referenceBooks, setReferenceBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:9000/api/referencebooks/")
      .then((res) => {
        setReferenceBooks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch reference books:", err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <AdminNav />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom color="primary" align="center">
          Reference Books
        </Typography>

        {loading ? (
          <CircularProgress sx={{ display: "block", mx: "auto", mt: 4 }} />
        ) : (
          <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
            <Table>
              <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                <TableRow>
                  <TableCell>Book ID</TableCell>
                  <TableCell>Book Name</TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Availability</TableCell>
                  <TableCell>Rack Number</TableCell>
                  <TableCell>Category</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {referenceBooks.map((book) => (
                  <TableRow key={book._id}>
                    <TableCell>{book.Bookid}</TableCell>
                    <TableCell>{book.Bookname}</TableCell>
                    <TableCell>{book.Author}</TableCell>
                    <TableCell>{book.Description}</TableCell>
                    <TableCell>{book.Availability}</TableCell>
                    <TableCell>{book.RackNumber}</TableCell>
                    <TableCell>{book.Category}</TableCell>
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

export default ReferenceDetails;
