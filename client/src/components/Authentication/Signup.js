import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";

const Signup = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [password, setpassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  // const [pic, setPic] = useState("");

  const handleClick = () => {
    setShow(!show);
  };

  // const postDetails = (pics) => {
  //   console.log("Hey");
  // };

  const submitHandler = async () => {
    setLoading(true);
    //check whether all areas are filled
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please fill all the required fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return;
    }
    //check if passwords match
    if (password !== confirmpassword) {
      toast({
        title: "Passwords do not match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    //make api 'POST' request to store the credentials into DB
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        { name, email, password },
        config
      );
      toast({
        title: "Successfully registered",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      toast({
        title: "Oops! try again",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing="5px">
      {/* name */}
      <FormControl id="name" isRequired>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          id="name"
          placeholder="Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </FormControl>
      {/* email */}
      <FormControl id="email" isRequired>
        <FormLabel htmlFor="email">e-mail</FormLabel>
        <Input
          id="email"
          placeholder="abc@example.com"
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </FormControl>

      {/* password */}
      <FormControl id="password" isRequired>
        <FormLabel htmlFor="password">Password</FormLabel>
        <InputGroup>
          <Input
            id="password"
            placeholder="Enter a strong password"
            type={show ? "text" : "password"}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
          <InputRightElement width={"4.5rem"}>
            <Button
              variant={"ghost"}
              h={"1.75rem"}
              size="sm"
              onClick={handleClick}
              colorScheme="gray"
            >
              {show ? "hide" : "show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      {/* confirm password */}
      <FormControl id="confirmpassword" isRequired>
        <FormLabel htmlFor="confirmpassword">Confirm Password</FormLabel>
        <InputGroup>
          <Input
            id="confirmpassword"
            placeholder="re-enter the password"
            type={show ? "text" : "password"}
            onChange={(e) => {
              setConfirmpassword(e.target.value);
            }}
          />
        </InputGroup>
      </FormControl>

      {/* picture */}
      {/* <FormControl>
        <FormLabel id="pic">Upload profile picture</FormLabel>
        <Input
          type={"file"}
          p="1.5"
          accept="image/*"
          onChange={(e) => {
            postDetails(e.target.files[0]);
          }}
        ></Input>
      </FormControl> */}

      {/* SUBMIT BUTTON */}
      <Button
        colorScheme={"blue"}
        w="25%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Signup
      </Button>
    </VStack>
  );
};

export default Signup;
