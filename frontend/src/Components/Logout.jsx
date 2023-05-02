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
  IconButton
} from "@chakra-ui/react";

const Logout = () => {
  return (
    <>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<FaRegUserCircle />}
          variant="outline"
        />
        <MenuList>
         hello
        </MenuList>
      </Menu>
    </>
  );
};

export default Logout;
