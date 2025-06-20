import React from "react";
import Navbar from "./Navbar";
import campus from "../img2.jpg";
import HomeBook from "./HomeBook";
import HomeArticle from "./HomeArticle";
import HomeSugg from "./HomeSugg";
import Footer from "./Footer";
import Homepg from "./Homepg";
import LibraryCarousel from "./LibraryCarousel";

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Space between Navbar and Institution Title */}
      <div className="pt-28" />

      {/* Institution Title inside a styled box */}
      <div className="flex justify-center mb-10">
        <div className="bg-gradient-to-r from-blue-900 to-blue-600 text-white py-6 px-10 rounded-xl shadow-lg w-full max-w-3xl mx-4">
          <h1 className="text-3xl md:text-4xl text-center font-bold tracking-wide">
            Sri Shanmugha Institutions
          </h1>
          

        </div>
      </div>
      <h2 className="text-2xl md:text-3xl font-semibold text-blue-700 mb-4 text-center">
          Welcome to the Library Management System
        </h2>
      {/* Main Content */}
      {/* <main className="flex-grow flex flex-col items-center px-4 py-10 bg-white shadow-md mx-4 rounded-xl">
        <h2 className="text-2xl md:text-3xl font-semibold text-blue-700 mb-4 text-center">
          Welcome to the Library Management System
        </h2>

        <p className="text-base md:text-lg text-gray-600 mb-8 max-w-2xl text-center leading-relaxed">
          Explore a comprehensive collection of books and academic resources. Manage
          reservations, track borrowing history, and stay connected to your learning journey.
        </p>

        <div className="w-full max-w-md md:max-w-lg">
          <img
            src={campus}
            alt="Campus"
            className="rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>
      </main> */}

      {/* Extra Sections */}
      <LibraryCarousel />
      <HomeBook />
      <Homepg/>
      <HomeArticle />
      <HomeSugg />
      <Footer/>
    </div>
  );
};

export default Home;
