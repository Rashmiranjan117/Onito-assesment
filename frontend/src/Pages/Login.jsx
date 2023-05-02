import React from "react";
import {
  Box,
  Input,
  Button,
  Text,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  useToast,
} from "@chakra-ui/react";
import "./sass/login/login.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Cookies from "universal-cookie";

const schema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

const Signin = (payload) => {
  return axios.post("http://localhost:8080/auth/login", payload);
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const toast = useToast();
  const navigate = useNavigate();
  const cookies = new Cookies();

  const handleLogin = async (data) => {
    try {
      await schema.validate(data, { abortEarly: false });
      console.log("Valid data:", data);
      Signin(data)
        .then((res) => {
          toast({
            status: "success",
            title: "Login Successfull.",
            isClosable: true,
            duration: 5000,
            description: `${res.data.msg}`,
          });
          cookies.set("token", res.data.token);
          navigate("/");
          // console.log(res.data);
        })
        .catch((err) => {
          toast({
            status: "error",
            title: "Something went wrong.",
            isClosable: true,
            duration: 5000,
            description: `${err}`,
          });
        });
    } catch (err) {
      console.error("Validation error:", err.errors);
      toast({
        status: "error",
        title: "Something went wrong.",
        isClosable: true,
        duration: 5000,
        description: `${err.errors}`,
      });
    }
  };
  return (
    <Box className="login">
      <form onSubmit={handleSubmit(handleLogin)}>
        <Heading>Login</Heading>
        <FormControl>
          <Input
            {...register("email")}
            type="email"
            className="inp"
            placeholder="Enter Email"
          />
        </FormControl>
        <FormControl>
          <Input
            {...register("password")}
            type="password"
            className="inp"
            placeholder="Enter Password"
          />
        </FormControl>
        <Button type="submit">Signin</Button>
        <Text>
          Don't have an Account?{" "}
          <span className="link" onClick={(e) => navigate("/signup")}>
            Signup
          </span>
        </Text>
      </form>
    </Box>
  );
};

export default Login;
