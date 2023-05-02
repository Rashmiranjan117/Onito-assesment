import React from "react";
import { Routes, Route } from "react-router-dom";
// import Form from "../Pages/Form";
import Signup from "../Pages/Signup";
import Login from "../Pages/Login";
import Form from "../Pages/Form";
import Details from "../Pages/Details";
import ProtectedRoute from "./ProtectedRoute";

const AllRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Form />
          </ProtectedRoute>
        }
      />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/form" element={<Form />} /> */}
      <Route
        path="/details"
        element={
          <ProtectedRoute>
            <Details />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AllRoutes;
