import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { AiOutlineBell, AiFillCaretDown } from "react-icons/ai";
import { ChatState } from "../../context/chatProvider";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ChatLoading from "../ChatLoading";
import UserListItem from "../useravatar/UserListItem";

const SideDrawer = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const { user, setSelectedChat, chats, setChats } = ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const toast = useToast();

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  useEffect(() => {
    chats.filter(onlyUnique);
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const accessChat = async (userId) => {
    try {
      console.log("Daa enne ippo thanne vilivhu");
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please enter something to search",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }
    try {
      setLoading(true);
      //   console.log(search);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      ///api/user?search=gmail
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      //   console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      console.log(error.message);
      toast({
        title: "oops something went wrong!",
        description: "please try again later",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <>
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems={"center"}
        bg="white"
        w={"100%"}
        p="5px 10px 5px 10px"
        borderWidth={"2px"}
      >
        <Button
          color={"black"}
          variant={"ghost"}
          colorScheme="green"
          ref={btnRef}
          onClick={onOpen}
          //   bgColor={"lightblue"}
        >
          <BiSearch />
          <Text color={"black"} display={{ base: "none", md: "flex" }} px="4">
            Search User
          </Text>
        </Button>
        <Text
          fontSize={"3xl"}
          fontWeight="extrabold"
          color="black"
          fontFamily="Work sans"
        >
          CHAT
        </Text>
        <div display="flex" px={2}>
          <Menu color="black">
            <MenuButton color="black" fontSize={"xl"} p={1}>
              <AiOutlineBell />
            </MenuButton>
            <MenuList>{/* <MenuItem></MenuItem> */}</MenuList>
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              color="black"
              colorScheme="green"
              variant="ghost"
              rightIcon={<AiFillCaretDown />}
            >
              <span>{user.name}</span>
            </MenuButton>
            <MenuList color="black">
              <Profile user={user}>
                <MenuItem>Profile</MenuItem>
              </Profile>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          {/* <DrawerCloseButton /> */}
          {/* <DrawerHeader></DrawerHeader> */}

          <DrawerBody>
            <Box display="flex" pb={2}>
              {/* //searchbar */}
              <Input
                placeholder="type here.."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              ></Input>
              <Button onClick={handleSearch}>search</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
