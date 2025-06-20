import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InstitutionBooks = ({ institution, department }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:9000/books/getBooksByDepartment`, {
          params: { institution, department },
        });
        setBooks(res.data.message);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };
    if (institution && department) {
      fetchBooks();
    }
  }, [institution, department]);

  return (
    <div className="institution-books">
      {loading ? (
        <p>Loading books...</p>
      ) : (
        <div className="book-list">
          <h3 className="text-2xl font-bold">Books for {department}</h3>
          <ul>
            {books.map((book) => (
              <li key={book._id}>
                <p><strong>{book.Bookname}</strong></p>
                <p>{book.Discription}</p>
                <p>Availability: {book.Availability}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InstitutionBooks;


