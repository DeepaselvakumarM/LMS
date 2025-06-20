import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./component/Login";
import Home from "./component/Home";
import Register from "./component/Register";
import InstitutionCourses from "./component/InstitutionCourses";
import CourseBooks from "./component/CourseBooks";
import Admin from "./component/Admin";
import AdminHome from "./component/AdminHome";
import Adminlogin from "./component/Adminlogin";
import Member from "./component/Memberslist";
import Addadmin from "./component/Addadmin";
import AddBook from "./component/AddBoook";
import BookDetails from "./component/BookDetials";
import Adminreserve from "./component/Adminreserve";
import Suggestion from "./component/Suggestion";
import Userprofile from "./component/Userprofile";
import Adminsuggest from "./component/Adminsuggest";
import Article from "./component/Article";
import Adminstory from "./component/Adminstory";

// New components for dashboards and story books
import MemberDashboard from "./component/dashboard/MemberDashboard";
import ReservationDashboard from "./component/dashboard/ReservationDashboard";
import HomeBook from "./component/HomeBook";
import HomeArticle from "./component/HomeArticle";
import ReferenceBooks from "./component/ReferenceBooks";
import AddReferenceBook from "./component/AddReferenceBook";
import ReferenceDetails from "./component/ReferenceDetails";
import HomeSugg from "./component/HomeSugg";
// import BooksDashboard from "./component/dashboard/BooksDashboard";
import AddstoryBook from "./component/AddstoryBook";
import StoryBookList from "./component/StoryBookList";
import Pgcourse from "./component/PgCourse"
import PgBookList from "./component/PgBookList";

import SuperNav from "./component/SuperNav"
import SuperEBook from "./component/SuperEBook"
import SuperReserve from "./component/SuperReserve";
import SuperRefbook from "./component/SuperRefbook"
import SuperNonacc from "./component/SuperNonacc"
import SuperPg from "./component/SuperPg";
import Footer from "./component/Footer";
import Homepg from "./component/Homepg";
import Mail from "./component/Mail"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/institutions/:institution" element={<InstitutionCourses />} />
      <Route path="/courses/:institution/:course" element={<CourseBooks />} />
      <Route path="/book-details/:bookName" element={<BookDetails />} />
      <Route path="/suggest" element={<Suggestion />} />
      <Route path="/profile" element={<Userprofile />} />
      <Route path="/adminlogin" element={<Adminlogin />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/memberlist" element={<Member />} />
      <Route path="/addadmin" element={<Addadmin />} />
      <Route path="/addbook" element={<AddBook />} />
      <Route path="/reserve" element={<Adminreserve />} />
      <Route path="/adminsuggest" element={<Adminsuggest />} />
      <Route path="/article" element={<Article />} />
      <Route path="/adminHome" element={<AdminHome />} />
      <Route path="/homebook" element={<HomeBook />} />
      <Route path="/homearticle" element={<HomeArticle />} />
      <Route path="/reference" element={<ReferenceDetails />} />
      <Route path="/homesugg" element={<HomeSugg />} />
      <Route path="/adminstory" element={<Adminstory />} />

      {/* New Routes for Dashboards */}
      <Route path="/member-dashboard" element={<MemberDashboard />} />
      <Route path="/reservation-dashboard" element={<ReservationDashboard />} />
      <Route path="/referencebooks" element={<ReferenceBooks />} />
      <Route path="/addreferencebook" element={<AddReferenceBook />} />
      {/* <Route path="/books-dashboard" element={<BooksDashboard />} /> */}
      <Route path="/addstorybook" element={<AddstoryBook />} />
      <Route path="/storybook" element={<StoryBookList />} />
     
      <Route path="/pgcourse" element={<Pgcourse />} />
      <Route path="/pgbooks" element={<PgBookList />} />
      


      <Route path="/supernav" element={<SuperNav />} />
      <Route path="/superebook" element={<SuperEBook />} />
      <Route path="/superreserve" element={<SuperReserve />} />
      <Route path="/superef" element={<SuperRefbook />} />
      <Route path="/superna" element={<SuperNonacc />} />
      <Route path="/superpg" element={<SuperPg />} />
      <Route path="/footer" element={<Footer />} />
      <Route path="/homepg" element={<Homepg />} />
      <Route path="/mail" element={<Mail />} />
    </Routes>
  );
}

export default App;

