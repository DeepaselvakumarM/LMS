import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import AdminNav from "./Adminnav"; // Make sure this path is correct

const AddReferenceBook = () => {
  const [Bookid, setBookid] = useState("");
  const [Bookname, setBookname] = useState("");
  const [Author, setAuthor] = useState("");
  const [Description, setDescription] = useState("");
  const [Availability, setAvailability] = useState("");
  const [RackNumber, setRackNumber] = useState("");
  const [Category, setCategory] = useState("Reference");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBook = {
      Bookid: Bookid.trim(),
      Bookname: Bookname.trim(),
      Author: Author.trim(),
      Description: Description.trim(),
      Availability: parseInt(Availability),
      RackNumber: RackNumber.trim(),
      Category,
    };

    axios
      .post("http://localhost:9000/api/referencebooks/", newBook)
      .then(() => {
        alert("✅ Reference Book Added Successfully!");
        // navigate("/referencebooks");
      })
      .catch(() => {
        alert("❌ Failed to add the reference book. Please try again.");
      });
  };

  return (
    <>
      <AdminNav />
      <Container maxWidth="sm" sx={{ mt: 6, mb: 4 }}>
        <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" align="center" color="primary" gutterBottom>
            Add Reference Book
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Book ID"
              variant="outlined"
              margin="normal"
              value={Bookid}
              onChange={(e) => setBookid(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Book Name"
              variant="outlined"
              margin="normal"
              value={Bookname}
              onChange={(e) => setBookname(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Author"
              variant="outlined"
              margin="normal"
              value={Author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              margin="normal"
              multiline
              rows={3}
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Availability"
              type="number"
              variant="outlined"
              margin="normal"
              inputProps={{ min: 1 }}
              value={Availability}
              onChange={(e) => setAvailability(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Rack Number"
              variant="outlined"
              margin="normal"
              value={RackNumber}
              onChange={(e) => setRackNumber(e.target.value)}
              required
            />
            <TextField
              select
              fullWidth
              label="Category"
              variant="outlined"
              margin="normal"
              value={Category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="Reference">Reference</MenuItem>
              <MenuItem value="Textbook">Textbook</MenuItem>
            </TextField>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 3, borderRadius: 2 }}
            >
              Add Reference Book
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default AddReferenceBook;
