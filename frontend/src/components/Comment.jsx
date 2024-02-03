import { Avatar, Flex, Text, Divider } from "@chakra-ui/react";

export const Comment = ({ reply, lastReply }) => {
  return (
    <>
      <Flex gap={4} py={2} my={0} w={"full"}>
        <Avatar src={reply.profilePic} size={"sm"} />
        <Flex flexDirection={"column"} w={"full"} gap={2}>
          <Flex
            w={"full"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text fontWeight={"bold"} fontSize={"sm"}>
              {reply.username}
            </Text>
          </Flex>
          <Text>{reply.text}</Text>
        </Flex>
      </Flex>
      {!lastReply && <Divider />}
    </>
  );
};
