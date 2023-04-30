import React from "react";
import { Routes, Route } from "react-router-dom";
import Form from "../Pages/Form";
import Signup from "../Pages/Signup";
import Login from "../Pages/Login";
import Form from "../Pages/Form";
import Details from "../Pages/Details";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Form />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/form" element={<Form />} />
      <Route path="/details" element={<Details />} />
    </Routes>
  );
};

export default AllRoutes;
