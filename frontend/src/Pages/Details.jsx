import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  Box,
  useToast,
  Button,
  Heading,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";
import $ from "jquery";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net/js/jquery.dataTables.min";
import "./sass/details/details.css";

const GetData = (token) => {
  return axios({
    method: "GET",
    url: "http://localhost:8080/post/",
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
  });
};

const DeleteData = (token, id) => {
  return axios({
    method: "DELETE",
    url: `http://localhost:8080/post/${id}`,
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
  });
};

const Details = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [data, setData] = useState([]);
  const tableRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedRowData, setSelectedRowData] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  const handleGet = () => {
    GetData(token)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleRowClick = (rowData) => {
    setSelectedRowData(rowData);
    onOpen();
  };

  const handleDelete = (id) => {
    DeleteData(token, id)
      .then((res) => {
        toast({
          title: `${res.data.msg}`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        handleGet();
        onClose();
      })
      .catch((err) => {
        toast({
          title: `${err}`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  useEffect(() => {
    handleGet();
    $(tableRef.current).DataTable();
  }, []);

  const memoizedData = useMemo(() => data, [data]);
  console.log(selectedRowData);
  return (
    <Box className="details">
      <TableContainer>
        {(memoizedData && memoizedData?.length) > 0 ? (
          <Table className="table">
            <TableCaption color="whiteAlpha.800">Details</TableCaption>
            <Thead>
              <Tr>
                <Th>Sr. No.</Th>
                <Th>Name</Th>
                <Th>Age</Th>
                <Th>Gender</Th>
              </Tr>
            </Thead>
            <Tbody>
              {memoizedData &&
                memoizedData?.map((el, i) => {
                  return (
                    <Tr
                      key={el._id}
                      className="user-info"
                      onClick={() => handleRowClick(el)}
                    >
                      <Td>{i + 1}</Td>
                      <Td>{el?.name}</Td>
                      <Td>{el?.age}</Td>
                      <Td>{el?.gender}</Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        ) : (
          <Heading as="h2" size="lg">
            No Data Available
          </Heading>
        )}
      </TableContainer>

      <Modal
        isOpen={isOpen}
        size="xl"
        closeOnOverlayClick={true}
        isCentered
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Employee Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedRowData && (
              <Table>
                <TableCaption>Employee Details</TableCaption>
                <Tbody>
                  {Object.entries(selectedRowData).map(([key, value]) => (
                    <Tr key={key}>
                      <Td>{key}</Td>
                      <Td>{value && value ? value : "---"}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => navigate("/edit", { state: selectedRowData?._id })}
            >
              Edit
            </Button>
            <Button onClick={() => handleDelete(selectedRowData?._id)}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Details;
