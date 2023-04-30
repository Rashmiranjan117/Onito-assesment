import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Select,
  Text,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import "./sass/form/form.css";

const schema = Yup.object().shape({
  email: Yup.string().email().notRequired(),
  age: Yup.number().positive().integer().required(),
  phoneNumber: Yup.string().length(10).notRequired(),
  name: Yup.string().required(),
  gender: Yup.string().required(),
  idType: Yup.string().oneOf(["Aadhar", "PAN"]).notRequired(),
  govtId: Yup.string().when("idType", {
    is: "Aadhar",
    then: Yup.string()
      .matches(/^[0-9]{12}$/, "Aadhar ID must be a 12-digit numeric string")
      .notRequired(),
    otherwise: Yup.string()
      .matches(
        /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
        "PAN ID must be a 10-digit alphanumeric string"
      )
      .notRequired(),
  }),
  guardianName: Yup.string().notRequired(),
  guardianEmail: Yup.string().email().notRequired(),
  emergencyNumber: Yup.string().length(10).notRequired(),
  address: Yup.string().notRequired(),
  state: Yup.string().notRequired(),
  city: Yup.string().notRequired(),
  country: Yup.string().notRequired(),
  pincode: Yup.number().integer().positive().notRequired(),
  occupation: Yup.string().notRequired(),
  religion: Yup.string().notRequired(),
  martialStatus: Yup.string().notRequired(),
  bloodGroup: Yup.string().notRequired(),
  nationality: Yup.string().notRequired(),
});

const Form = () => {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState(null);
  return (
    <Box className="form-page">
      <form onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}>
        <Box className="personal-details">
          <Box className="heading">
            <Text>
              <strong>Personal Details</strong>
            </Text>
          </Box>
          <Box className="content">
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                {...register("name")}
                type="text"
                placeholder="Enter name"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Age</FormLabel>
              <Input
                {...register("age")}
                type="number"
                placeholder="Enter Age"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Gender</FormLabel>
              <Select {...register("gender")}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Mobile</FormLabel>
              <Input
                {...register("phoneNumber")}
                type="number"
                placeholder="Enter Mobile Number"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Govt Issued ID</FormLabel>
              <Select {...register("idType")}>
                <option value="">ID type</option>
                <option value="Aadhar">Aadhar</option>
                <option value="PAN">PAN</option>
              </Select>
              <Input
                {...register("govtId")}
                placeholder="Enter Mobile Number"
              />
            </FormControl>
          </Box>
        </Box>
        <Button type="submit">Submit</Button>
      </form>
    </Box>
  );
};

export default Form;
