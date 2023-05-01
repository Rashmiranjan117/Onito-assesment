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
import axios from "axios";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [data, setData] = useState(null);

  const handleSubmitReq = (data) => {
    console.log(data);
  };
  return (
    <Box className="form-page">
      <form onSubmit={handleSubmit(handleSubmitReq)}>
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
              {errors?.name && (
                <FormErrorMessage>Name is required.</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Age</FormLabel>
              <Input
                {...register("age")}
                type="number"
                placeholder="Enter Age"
              />
              {errors?.age && (
                <FormErrorMessage>Age is required.</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Gender</FormLabel>
              <Select {...register("gender")}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Select>
              {errors?.name && (
                <FormErrorMessage>Name is required.</FormErrorMessage>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                {...register("email")}
                type="email"
                placeholder="Enter Your Email"
              />
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
                placeholder="Enter Govt. ID Number"
              />
              <FormHelperText>
                Select the type of ID, and enter the details accordingly.
              </FormHelperText>
            </FormControl>
          </Box>
        </Box>

        <Box className="contact-details">
          <Box className="heading">
            <Text>
              <strong>Contact Details</strong>
            </Text>
          </Box>
          <Box className="content">
            <FormControl>
              <FormLabel>Guardian Name</FormLabel>
              <Input
                {...register("guardianName")}
                placeholder="Enter Guardian Name"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                {...register("guardianEmail")}
                placeholder="Enter Guardian Email"
                type="email"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Emergency Contact Number</FormLabel>
              <Input
                type="number"
                {...register("emergencyNumber")}
                placeholder="Enter Emergency No."
              />
            </FormControl>
          </Box>
        </Box>

        <Box className="address-details">
          <Box className="heading">
            <Text>
              <strong>Address Details</strong>
            </Text>
          </Box>
          <Box className="content">
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input {...register("address")} placeholder="Enter Address" />
            </FormControl>
            <FormControl>
              <FormLabel>State</FormLabel>
              <Input {...register("state")} placeholder="Enter state" />
            </FormControl>
            <FormControl>
              <FormLabel>City</FormLabel>
              <Input {...register("city")} placeholder="Enter city" />
            </FormControl>
            <FormControl>
              <FormLabel>Country</FormLabel>
              <Input {...register("country")} placeholder="Enter country" />
            </FormControl>
            <FormControl>
              <FormLabel>Pincode</FormLabel>
              <Input {...register("pincode")} placeholder="Enter pincode" />
            </FormControl>
          </Box>
        </Box>

        <Box className="other-details">
          <Box className="heading">
            <Text>
              <strong>Address Details</strong>
            </Text>
          </Box>
          <Box className="content">
            <FormControl>
              <FormLabel>Occupation</FormLabel>
              <Input
                {...register("occupation")}
                placeholder="Enter Occupation"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Religion</FormLabel>
              <Input {...register("religion")} placeholder="Enter religion" />
            </FormControl>
            <FormControl>
              <FormLabel>Martial Status</FormLabel>
              <Input
                {...register("martialStatus")}
                placeholder="Enter Martial Status"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Blood Group</FormLabel>
              <Input
                {...register("bloodGroup")}
                placeholder="Enter BloodGroup"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Nationality</FormLabel>
              <Input
                {...register("nationality")}
                placeholder="Enter Nationality"
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
