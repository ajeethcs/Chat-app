import { Box, Text } from "@chakra-ui/react";
import React from "react";
// import { ChatState } from "../../context/chatProvider";
function UserListItem({ user, handleFunction }) {
  //   const user = ChatState();
  //   console.log("User name in userlistItem:::", user.name);
  return (
    <Box
      onClick={handleFunction}
      curser="pointer"
      bg={"lightblue"}
      w="100%"
      display={"flex"}
      alignItems="center"
      color={"black"}
      px={3}
      py={2}
      mb={2}
      borderRadius="sm"
    >
      <Box>
        <Text color={"black"}>{user.name}</Text>
      </Box>
    </Box>
  );
}

export default UserListItem;
