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
import "./sass/signup/signup.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const schema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

const Register = (payload) => {
  return axios.post("https://rich-plum-sea-lion-veil.cyclic.app/auth/register", payload);
};

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const toast = useToast();
  const navigate = useNavigate();
  const handleRegister = async (data) => {
    try {
      await schema.validate(data, { abortEarly: false });
      console.log("Valid data:", data);
      Register(data)
        .then((res) => {
          toast({
            status: "success",
            title: "Registration Successfull.",
            isClosable: true,
            duration: 5000,
            description: `${res.data.msg}`,
          });
          navigate("/login");
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
    <Box className="signup">
      <form onSubmit={handleSubmit(handleRegister)}>
        <Heading>Signup</Heading>
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
        <Button type="submit">Register</Button>
        <Text>
          Already have an account?{" "}
          <span className="link" onClick={(e) => navigate("/login")}>Login</span>
        </Text>
      </form>
    </Box>
  );
};

export default Signup;
