import { Box, FormControl, IconButton, Input, Text } from "@chakra-ui/react";
import React from "react";
import { ChatState } from "../context/chatProvider";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender } from "../config/logics";
import { useState, useEffect } from "react";
import axios from "axios";
import "../components/styles.css";

function SingleChat({ fetchAgain, setFetchAgain }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const { user, selectedChat, setSelectedChat } = ChatState();

  const fetchMessages = async () => {
    if (!selectedChat) {
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      setLoading(true);
      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      console.log(messages);
      setMessages(data);
      setLoading(false);
    } catch (error) {
      window.alert("Error");
    }
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        console.log(data);
        setNewMessage("");
        setMessages([...messages, data]);
      } catch (error) {
        window.alert("error.message");
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  return (
    <>
      {selectedChat ? (
        <div>
          <Text
            pb={3}
            px={2}
            w={"100%"}
            fontFamily="Work sans"
            justifyContent={"space-between"}
            alignItems="center"
          >
            <IconButton
              d={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />

            {!selectedChat.isGroupChat ? (
              <>{getSender(user, selectedChat.users)}</>
            ) : (
              <>{selectedChat.chatName.toUpperCase()}</>
            )}
          </Text>
          <Box
            display={"flex"}
            flexDir={"column"}
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w={"100%"}
            h={"35rem"}
            borderRadius="lg"
            overflowY={"hidden"}
          >
            {/* Messages here */}
            {loading ? (
              <span>Loading...</span>
            ) : (
              <div className="messages">Messages</div>
            )}
            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
              <Input
                variant={"filled"}
                bg="#E0E0E0"
                placeholder="Chat comes here..."
                onChange={typingHandler}
                value={newMessage}
              />
            </FormControl>
          </Box>
        </div>
      ) : (
        <Box
          display={"flex"}
          alignItems="center"
          justifyContent={"center"}
          h="100%"
          color={"grey"}
        >
          click on a user to start chatting
        </Box>
      )}
    </>
  );
}

export default SingleChat;
