import {
  FormControl,
  FormLabel,
  VStack,
  Input,
  InputRightElement,
  InputGroup,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

import { useState } from "react";

const Login = () => {
  const toast = useToast();
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setShow(!show);
  };

  const submitHandler = async () => {
    setLoading(true);
    //check whether all areas are filled
    if (!email || !password) {
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

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );
      toast({
        title: "Login successfull",
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
    <div>
      <VStack spacing="5px">
        <FormControl id="email" isRequired>
          <FormLabel htmlFor="email">e-mail</FormLabel>
          <Input
            value={email}
            id="email"
            placeholder=""
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
              value={password}
              id="password"
              placeholder=""
              type={show ? "text" : "password"}
              onChange={(e) => {
                setPassword(e.target.value);
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
        <Button
          colorScheme={"blue"}
          w="25%"
          style={{ marginTop: 15 }}
          onClick={submitHandler}
          isLoading={loading}
        >
          Login
        </Button>

        <Button
          colorScheme={"red"}
          variant={"solid"}
          style={{ marginTop: 15 }}
          onClick={() => {
            setEmail("guest@example.com");
            setPassword("12345678");
            // submitHandler();
          }}
        >
          Login as guest
        </Button>
      </VStack>
    </div>
  );
};

export default Login;
