import React, { useState, useEffect } from "react";
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
  Heading,
  useToast,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import "./sass/form/form.css";
import axios from "axios";
import Cookies from "universal-cookie";
import { useLocation } from "react-router-dom";

const GetOne = (id, token) => {
  return axios({
    method: "GET",
    url: `https://rich-plum-sea-lion-veil.cyclic.app/post/${id}`,
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
  });
};

const patchData = (payload, token, id) => {
  return axios({
    method: "PATCH",
    url: `https://rich-plum-sea-lion-veil.cyclic.app/post/${id}`,
    data: JSON.stringify(payload),
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
  });
};

const schema = Yup.object().shape({
  email: Yup.string().email(),
  age: Yup.number().positive().integer().required(),
  phoneNumber: Yup.string().length(10),
  name: Yup.string().required(),
  gender: Yup.string().required(),
  idType: Yup.string().oneOf(["Aadhar", "PAN"]),
  govtId: Yup.string().when("idType", {
    is: "Aadhar",
    then: Yup.string().matches(
      /^[0-9]{12}$/,
      "Aadhar ID must be a 12-digit numeric string"
    ),
    otherwise: Yup.string().matches(
      /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
      "PAN ID must be a 10-digit alphanumeric string"
    ),
  }),
  guardianName: Yup.string(),
  guardianEmail: Yup.string().email(),
  emergencyNumber: Yup.string().length(10),
  address: Yup.string(),
  state: Yup.string(),
  city: Yup.string(),
  country: Yup.string(),
  pincode: Yup.string(),
  occupation: Yup.string(),
  religion: Yup.string(),
  martialStatus: Yup.string(),
  bloodGroup: Yup.string(),
  nationality: Yup.string(),
});

const Editpage = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();
  const toast = useToast();
  const cookies = new Cookies();
  const token = cookies.get("token");
  const location = useLocation();
  const [data, setData] = useState(null);

  const handleGet = () => {
    GetOne(location?.state, token)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSubmitReq = async (data) => {
    const { name, age, gender, phoneNumber, emergencyNumber } = data;
    if (!name.length) {
      toast({
        title: `Name not detected.`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
        description: "Please provide a Valid Name",
      });
      return;
    }
    if (!age.length) {
      toast({
        title: `Age Not Detected.`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
        description: "Please provide a Valid Age",
      });
      return;
    }
    if (!gender.length) {
      toast({
        title: `Gender feild not detected.`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
        description: "Please provide a Valid Gender",
      });
      return;
    }
    if (
      (phoneNumber && phoneNumber.length !== 10) ||
      (emergencyNumber && emergencyNumber.length !== 10)
    ) {
      toast({
        title: `Invalid Phone-Number detected.`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
        description: "Please provide a Valid Phone Number",
      });
      return;
    }
    try {
      // console.log("ok", data);
      patchData(data, token, location?.state)
        .then((res) => {
          toast({
            title: "Data added to server.",
            duration: 5000,
            isClosable: true,
            status: "success",
            description: `${res?.data?.msg}`,
          });
        })
        .catch((err) => {
          toast({
            title: "Error",
            status: "error",
            duration: 5000,
            isClosable: true,
            description: `${err}`,
          });
        });
    } catch (err) {
      console.error(err);
    }
  };

  

  useEffect(() => {
    handleGet();
  }, []);
  console.log(location, data);
  return (
    <Box className="form-page">
      <form onSubmit={handleSubmit(handleSubmitReq)}>
        <Heading as="h2" size="lg" textAlign="center">
          Edit Details
        </Heading>
        <Box className="personal-details">
          <Box className="heading">
            <Text>
              <strong>Personal Details</strong>
            </Text>
          </Box>
          <Box className="content">
            <FormControl isRequired isInvalid={errors.name}>
              <FormLabel>Name</FormLabel>
              <Controller
                control={control}
                name="firstName"
                render={({ field }) => (
                  <Input
                    {...register("name")}
                    type="text"
                    onChange={field.onChange}
                    // value={data?.name}
                    placeholder="Enter name"
                  />
                )}
              />
              {/* <Input
                {...register("name")}
                type="text"
                onChange={(e) => watch("name", e.target.value)}
                value={data?.name}
                placeholder="Enter name"
              /> */}
              {errors?.name && (
                <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={errors.age}>
              <FormLabel>Age</FormLabel>
              <Input
                {...register("age")}
                type="number"
                onChange={(e) => watch("age", e.target.value)}
                // value={data?.age}
                placeholder="Enter Age"
              />
              {errors?.age && (
                <FormErrorMessage>{errors?.age?.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={errors.gender}>
              <FormLabel>Gender</FormLabel>
              <Select
                {...register("gender")}
                onChange={(e) => watch("gender", e.target.value)}
                // value={data?.gender}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Select>
              {errors?.gender && (
                <FormErrorMessage>{errors?.gender?.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                {...register("email")}
                type="email"
                onChange={(e) => watch("email", e.target.value)}
                // value={data?.email}
                placeholder="Enter Your Email"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Mobile</FormLabel>
              <Input
                {...register("phoneNumber")}
                type="number"
                onChange={(e) => watch("phoneNumber", e.target.value)}
                // value={data?.phoneNumber}
                placeholder="Enter Mobile Number"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Govt Issued ID</FormLabel>
              <Select
                {...register("idType")}
                onChange={(e) => watch("idType", e.target.value)}
                // value={data?.idType}
              >
                <option value="">ID type</option>
                <option value="Aadhar">Aadhar</option>
                <option value="PAN">PAN</option>
              </Select>
              <Input
                {...register("govtId")}
                onChange={(e) => watch("govtId", e.target.value)}
                // value={data?.govtId}
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
                onChange={(e) => watch("guardianName", e.target.value)}
                // value={data?.guardianName}
                placeholder="Enter Guardian Name"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                {...register("guardianEmail")}
                onChange={(e) => watch("guardianEmail", e.target.value)}
                // value={data?.guardianEmail}
                placeholder="Enter Guardian Email"
                type="email"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Emergency Contact Number</FormLabel>
              <Input
                type="number"
                {...register("emergencyNumber")}
                onChange={(e) => watch("emergencyNumber", e.target.value)}
                // value={data?.emergencyNumber}
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
              <Input
                {...register("address")}
                onChange={(e) => watch("address", e.target.value)}
                // value={data?.address}
                placeholder="Enter Address"
              />
            </FormControl>
            <FormControl>
              <FormLabel>State</FormLabel>
              <Input
                {...register("state")}
                onChange={(e) => watch("state", e.target.value)}
                // value={data?.state}
                placeholder="Enter state"
              />
            </FormControl>
            <FormControl>
              <FormLabel>City</FormLabel>
              <Input
                {...register("city")}
                onChange={(e) => watch("city", e.target.value)}
                // value={data?.city}
                placeholder="Enter city"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Country</FormLabel>
              <Input
                {...register("country")}
                onChange={(e) => watch("country", e.target.value)}
                // value={data?.country}
                placeholder="Enter country"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Pincode</FormLabel>
              <Input
                {...register("pincode")}
                onChange={(e) => watch("pincode", e.target.value)}
                // value={data?.pincode}
                placeholder="Enter pincode"
              />
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
                onChange={(e) => watch("occupation", e.target.value)}
                // value={data?.occupation}
                placeholder="Enter Occupation"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Religion</FormLabel>
              <Input
                {...register("religion")}
                onChange={(e) => watch("religion", e.target.value)}
                // value={data?.religion}
                placeholder="Enter religion"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Martial Status</FormLabel>
              <Input
                {...register("martialStatus")}
                onChange={(e) => watch("martialStatus", e.target.value)}
                // value={data?.martialStatus}
                placeholder="Enter Martial Status"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Blood Group</FormLabel>
              <Input
                {...register("bloodGroup")}
                onChange={(e) => watch("bloodGroup", e.target.value)}
                // value={data?.bloodGroup}
                placeholder="Enter BloodGroup"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Nationality</FormLabel>
              <Input
                {...register("nationality")}
                onChange={(e) => watch("nationality", e.target.value)}
                // value={data?.nationality}
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

export default Editpage;
