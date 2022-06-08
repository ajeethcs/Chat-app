import { Box } from "@chakra-ui/react";
import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";

function UserBadgeItem({ user, handleFunction }) {
  return (
    <Box
      px={2}
      py={1}
      display="flex"
      alignItems={"center"}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      colorScheme={"blue"}
      cursor="pointer"
      onClick={handleFunction}
      bgColor="purple"
      color="white"
    >
      <span> {user.name} </span>
      <AiFillCloseCircle />
    </Box>
  );
}

export default UserBadgeItem;
