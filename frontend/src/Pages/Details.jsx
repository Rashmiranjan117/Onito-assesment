import React, { useEffect, useRef, useState, useMemo } from "react";
import { Box, useToast, Button, Heading } from "@chakra-ui/react";
import Cookies from "universal-cookie";
import axios from "axios";
import $ from "jquery";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net/js/jquery.dataTables.min";

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

const Details = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [data, setData] = useState([]);
  const tableRef = useRef(null);

  const handleGet = () => {
    GetData(token)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    handleGet();
    $(tableRef.current).DataTable();
  }, []);

  const memoizedData = useMemo(() => data, [data]);

  return <div>Details</div>;
};

export default Details;
