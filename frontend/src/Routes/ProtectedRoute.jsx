import React from "react";
import Cookies from "universal-cookie";
import { useToast } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const cookie = new Cookies();
  const toast = useToast();
  const token = cookie.get("token");
  if (!token) {
    toast({
      status: "warning",
      isClosable: true,
      duration: 5000,
      title: "Login First!",
    });
    return <Navigate to="/login" />;
  } else {
    return <>{children}</>;
  }
};

export default ProtectedRoute;
