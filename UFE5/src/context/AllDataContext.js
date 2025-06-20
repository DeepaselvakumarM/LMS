import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AllDataContext = createContext();

export const AllDataProvider = ({ children }) => {
  const [bookData, setBooks] = useState([]);
  const [storyBooks, setStoryBooks] = useState([]);
  const [loginData, setLoginData] = useState(null);
  const [regData, setRegData] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setLoginData(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const storedRegData = localStorage.getItem("regData");
    if (storedRegData) {
      setRegData(JSON.parse(storedRegData));
    }
  }, []);

  const saveRegData = (regData) => {
    setRegData(regData);
    localStorage.setItem("user", JSON.stringify(regData));
  };

  const saveLoginData = (user) => {
    setLoginData(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const booksURL = "http://localhost:9000/books/getbook";
  const storybookURL = "http://localhost:9000/storybook/list";

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(booksURL);
        console.log("Books:", res.data.message);
        setBooks(res.data.message);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    const fetchStoryBooks = async () => {
      try {
        const res = await axios.get(storybookURL);
        console.log("Storybooks:", res.data); // ✅ FIXED: removed .message
        setStoryBooks(res.data);              // ✅ FIXED: removed .message
      } catch (error) {
        console.error("Error fetching storybooks:", error);
      }
    };

    fetchStoryBooks();
  }, []);

  return (
    <AllDataContext.Provider
      value={{
        bookData,
        storyBooks,
        loginData,
        regData,
        saveLoginData,
        saveRegData,
      }}
    >
      {children}
    </AllDataContext.Provider>
  );
};




