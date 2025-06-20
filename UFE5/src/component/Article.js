
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Navbar from "./Navbar";

// const Article = () => {
//   const [articles, setArticles] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [newArticle, setNewArticle] = useState({ title: "", content: "" });

//   const URL1 = "http://localhost:9000/article/postarticle";
//   const URL2 = "http://localhost:9000/article/getarticle";

//   const fetchArticles = () => {
//     axios
//       .get(URL2)
//       .then((response) => {
//         if (response.data && Array.isArray(response.data.message)) {
//           setArticles(response.data.message);
//         } else {
//           console.error("Expected an array but got:", response.data);
//           setArticles([]);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching articles:", error);
//         setArticles([]);
//       });
//   };

//   useEffect(() => {
//     fetchArticles();
//   }, []);

//   const handleChange = (e) => {
//     setNewArticle({ ...newArticle, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!newArticle.title || !newArticle.content) return;

//     try {
//       const response = await axios.post(URL1, newArticle);
//       setArticles([response.data, ...articles]);
//       setShowForm(false);
//       setNewArticle({ title: "", content: "" });
//     } catch (error) {
//       console.error("Error posting article:", error);
//     }
//   };

//   return (
//     <>
//       <Navbar />

//       {/* Top Spacing */}
//       <div className="mt-20 container mx-auto p-6">
//         <div className="max-w-6xl mx-auto">
//           <div className="flex justify-between items-center mb-6">
//             <h1 className="text-3xl font-bold text-gray-800">Articles</h1>
//             <div className="flex gap-3">
//               <button
//                 onClick={fetchArticles}
//                 className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
//               >
//                 Refresh
//               </button>
//               <button
//                 onClick={() => setShowForm(!showForm)}
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//               >
//                 {showForm ? "Close" : "Add Article"}
//               </button>
//             </div>
//           </div>

//           {/* Article Form */}
//           {showForm && (
//             <form
//               className="bg-white p-6 rounded shadow-md mb-6"
//               onSubmit={handleSubmit}
//             >
//               <input
//                 type="text"
//                 name="title"
//                 placeholder="Article Title"
//                 value={newArticle.title}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
//                 required
//               />
//               <textarea
//                 name="content"
//                 placeholder="Article Content"
//                 value={newArticle.content}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
//                 required
//               />
//               <button
//                 type="submit"
//                 className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
//               >
//                 Submit
//               </button>
//             </form>
//           )}

//           {/* Article Table */}
//           {articles.length === 0 ? (
//             <p className="text-xl text-gray-500 mt-4">No articles available</p>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="min-w-full bg-white border border-gray-300 rounded shadow-md">
//                 <thead>
//                   <tr className="bg-gray-100 text-gray-700 text-left">
//                     <th className="py-3 px-4 border-b">#</th>
//                     <th className="py-3 px-4 border-b">Title</th>
//                     <th className="py-3 px-4 border-b">Content</th>
//                     <th className="py-3 px-4 border-b">Date</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {articles.map((article, index) => (
//                     <tr key={article._id} className="hover:bg-gray-50">
//                       <td className="py-2 px-4 border-b">{index + 1}</td>
//                       <td className="py-2 px-4 border-b font-medium">
//                         {article.title}
//                       </td>
//                       <td className="py-2 px-4 border-b">{article.content}</td>
//                       <td className="py-2 px-4 border-b text-sm text-gray-500">
//                         {new Date(article.createdAt).toLocaleDateString()}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Article;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert,
  Chip
} from "@mui/material";
import {
  Add,
  Refresh,
  Edit,
  Delete,
  Close,
  CalendarToday,
  Article as ArticleIcon
} from "@mui/icons-material";
import { format } from "date-fns";
import { styled } from "@mui/material/styles";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
}));

const Article = () => {
  const [articles, setArticles] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [articleData, setArticleData] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  const API_BASE = "http://localhost:9000/article";
  const URL_GET = `${API_BASE}/getarticle`;
  const URL_POST = `${API_BASE}/postarticle`;
  const URL_PUT = `${API_BASE}/updatearticle`;
  const URL_DELETE = `${API_BASE}/deletearticle`;

  const fetchArticles = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(URL_GET);
      if (response.data && Array.isArray(response.data.message)) {
        setArticles(response.data.message);
      } else {
        throw new Error("Invalid data format received");
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
      setError("Failed to load articles. Please try again.");
      showSnackbar("Failed to load articles", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleInputChange = (e) => {
    setArticleData({ ...articleData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!articleData.title || !articleData.content) {
      showSnackbar("Title and content are required", "warning");
      return;
    }

    try {
      if (editingId) {
        // Update existing article
        await axios.put(`${URL_PUT}/${editingId}`, articleData);
        showSnackbar("Article updated successfully", "success");
      } else {
        // Create new article
        await axios.post(URL_POST, articleData);
        showSnackbar("Article created successfully", "success");
      }
      fetchArticles();
      handleCloseForm();
    } catch (error) {
      console.error("Error saving article:", error);
      showSnackbar("Failed to save article", "error");
    }
  };

  const handleEdit = (article) => {
    setArticleData({
      title: article.title,
      content: article.content
    });
    setEditingId(article._id);
    setOpenForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this article?")) return;
    
    try {
      await axios.delete(`${URL_DELETE}/${id}`);
      showSnackbar("Article deleted successfully", "success");
      fetchArticles();
    } catch (error) {
      console.error("Error deleting article:", error);
      showSnackbar("Failed to delete article", "error");
    }
  };

  const handleOpenForm = () => {
    setArticleData({ title: "", content: "" });
    setEditingId(null);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setEditingId(null);
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), "MMM dd, yyyy HH:mm");
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f7fa" }}>
      <Navbar />
      <Box sx={{ mt: 12, px: { xs: 2, sm: 3 }, maxWidth: 1400, mx: "auto", pb: 4 }}>
        {/* Header Section */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 4,
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Typography
            variant="h4"
            sx={{ 
              fontWeight: 700, 
              color: "primary.main",
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <ArticleIcon fontSize="large" /> Knowledge Base
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={fetchArticles}
              disabled={loading}
              sx={{ borderRadius: 2 }}
            >
              Refresh
            </Button>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleOpenForm}
              sx={{ borderRadius: 2 }}
            >
              New Article
            </Button>
          </Box>
        </Box>

        {/* Error Message */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Loading State */}
        {loading ? (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: 300 
          }}>
            <CircularProgress size={60} thickness={4} />
          </Box>
        ) : articles.length === 0 ? (
          <Paper elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
            <ArticleIcon sx={{ fontSize: 60, color: "text.disabled", mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              No articles found
            </Typography>
            <Button 
              variant="contained" 
              sx={{ mt: 2 }}
              onClick={handleOpenForm}
            >
              Create First Article
            </Button>
          </Paper>
        ) : (
          <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 3 }}>
            <Table>
              <TableHead sx={{ backgroundColor: "primary.light" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700, width: 60 }}>#</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Title</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Content</TableCell>
                  <TableCell sx={{ fontWeight: 700, width: 180 }}>
                    <Box display="flex" alignItems="center">
                      <CalendarToday fontSize="small" sx={{ mr: 1 }} />
                      Date
                    </Box>
                  </TableCell>
                 
                </TableRow>
              </TableHead>
              <TableBody>
                {articles.map((article, index) => (
                  <StyledTableRow key={article._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell sx={{ fontWeight: 500 }}>{article.title}</TableCell>
                    <TableCell>
                      <Typography 
                        sx={{ 
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {article.content}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={formatDate(article.createdAt)} 
                        size="small" 
                        icon={<CalendarToday fontSize="small" />}
                      />
                    </TableCell>
                   
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      {/* Article Form Dialog */}
      <Dialog open={openForm} onClose={handleCloseForm} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingId ? "Edit Article" : "Create New Article"}
          <IconButton
            aria-label="close"
            onClick={handleCloseForm}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <form onSubmit={handleSubmit}>
            <TextField
              name="title"
              label="Article Title"
              value={articleData.title}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
              autoFocus
            />
            <TextField
              name="content"
              label="Article Content"
              value={articleData.content}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
              multiline
              rows={8}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm}>Cancel</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            color="primary"
            disabled={!articleData.title || !articleData.content}
          >
            {editingId ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Article;