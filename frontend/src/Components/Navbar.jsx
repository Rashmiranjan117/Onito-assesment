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
import Cookies from "universal-cookie";

const Navbar = () => {
  const cookie = new Cookies();
  const navigate = useNavigate();
  const token = cookie.get("token");
  return (
    <Box className="nav">
      <Box className="left">
        <Heading
          as="h2"
          size="lg"
          onClick={() => navigate("/")}
          _hover={{ cursor: "pointer" }}
        >
          FormLab
        </Heading>
      </Box>
      <Box className="right-lg">
        {token && <Link to="/">Add Data</Link>}
        {token && <Link to="/details">Details</Link>}
        {token && <Logout />}
      </Box>
    </Box>
  );
};

export default Navbar;
