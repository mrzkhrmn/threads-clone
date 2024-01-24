import { Avatar, Flex, Text, Divider } from "@chakra-ui/react";
import Actions from "./Actions";
import { BsThreeDots } from "react-icons/bs";
import { useState } from "react";

export const Comment = ({ comment, createdAt, likes, username, avatarUrl }) => {
  const [liked, setLiked] = useState(false);
  return (
    <>
      <Flex gap={4} py={2} my={2} w={"full"}>
        <Avatar src={avatarUrl} size={"sm"} />
        <Flex flexDirection={"column"} w={"full"} gap={2}>
          <Flex
            w={"full"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text fontWeight={"bold"} fontSize={"sm"}>
              {username}
            </Text>
            <Flex alignItems={"center"} gap={1}>
              <Text color={"gray.light"}>{createdAt}</Text>
              <BsThreeDots />
            </Flex>
          </Flex>
          <Text>{comment}</Text>
          <Actions liked={liked} setLiked={setLiked} />
          <Text color={"gray.light"}>{likes} Likes</Text>
        </Flex>
      </Flex>
      <Divider />
    </>
  );
};
