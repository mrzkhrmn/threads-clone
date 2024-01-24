import {
  Avatar,
  Flex,
  Box,
  Text,
  Image,
  Divider,
  Button,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { useParams } from "react-router-dom";
import Actions from "../components/Actions";
import { useState } from "react";
import { Comment } from "../components/Comment";

export const PostPage = () => {
  const params = useParams();
  const [liked, setLiked] = useState(false);
  return (
    <Flex flexDirection={"column"} gap={4}>
      <Flex justifyContent={"space-between"}>
        <Flex alignItems={"center"} gap={4}>
          <Avatar src="/zuck-avatar.png" />
          <Flex alignItems={"center"} gap={1}>
            <Text fontWeight={"bold"}>{params.username}</Text>
            <Image w={4} h={4} src="/verified.png" />
          </Flex>
        </Flex>
        <Flex alignItems={"center"} gap={4}>
          <Text color={"gray.light"}>1d</Text>
          <BsThreeDots />
        </Flex>
      </Flex>
      <Text>Let&apos;s talk about threads</Text>
      <Box
        borderRadius={6}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"gray.light"}
      >
        <Image src={"/post1.png"} w={"full"} />
      </Box>
      <Flex>
        <Actions liked={liked} setLiked={setLiked} />
      </Flex>
      <Flex gap={2} alignItems={"center"}>
        <Text color={"gray.light"} fontSize="sm">
          {"123"} replies
        </Text>
        <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
        <Text color={"gray.light"} fontSize="sm">
          {"132123"} likes
        </Text>
      </Flex>
      <Divider />
      <Flex justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize={"2xl"}>👋</Text>
          <Text color={"gray.light"}>Get the app to like, reply and post.</Text>
        </Flex>
        <Button>Get</Button>
      </Flex>
      <Divider />
      <Comment
        comment={"Its really nice!"}
        createdAt={"2d"}
        likes={100}
        username={"johndoe"}
        avatarUrl={"https://bit.ly/dan-abramov"}
      />
      <Comment
        comment={"I like this one!"}
        createdAt={"1d"}
        likes={23}
        username={"maryjane"}
        avatarUrl={"https://bit.ly/code-beast"}
      />
      <Comment
        comment={"I dont like it!"}
        createdAt={"2h"}
        likes={1}
        username={"garyosborn"}
        avatarUrl={"https://bit.ly/sage-adebayo"}
      />
    </Flex>
  );
};
