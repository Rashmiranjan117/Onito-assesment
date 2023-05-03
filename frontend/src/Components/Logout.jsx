import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
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
  IconButton,
} from "@chakra-ui/react";
import "./sass/nav.css";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const cookie = new Cookies();
  const navigate = useNavigate();
  const token = cookie.get("token");
  const toast = useToast();

  const handleLogout = () => {
    toast({
      status: "success",
      title: "Logout Sucessfull",
      duration: 5000,
      isClosable: true,
    });
    cookie.remove("token");
    navigate("/login");
  };
  return (
    <>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<FaRegUserCircle />}
          variant="outline"
          _hover={{ color: "#3C486B", bgColor: "#F0F0F0", transition: "0.4s" }}
        />
        <MenuList>
          <MenuItem
            color="white"
            bgColor="red.400"
            _hover={{ color: "red.400", bgColor: "white", transition: "0.4s" }}
            onClick={handleLogout}
          >
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default Logout;
