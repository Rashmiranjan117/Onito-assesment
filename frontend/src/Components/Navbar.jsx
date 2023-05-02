import React, { useEffect } from "react";
import "./sass/nav.css";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Box,
  Text,
  Button,
  useToast,
  Heading,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import Logout from "./Logout";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <Box className="nav">
      <Box className="left">
        <Heading as="h2" size="lg" onClick={() => navigate("/")}>
          FormLab
        </Heading>
      </Box>
      <Box className="right">
        <Link to="/details">Details</Link>
        <Logout />
      </Box>
    </Box>
  );
};

export default Navbar;
