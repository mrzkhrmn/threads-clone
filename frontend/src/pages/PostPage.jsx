import {
  Avatar,
  Flex,
  Box,
  Text,
  Image,
  Divider,
  Button,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import Actions from "../components/Actions";
import { useState } from "react";
import { Comment } from "../components/Comment";
import { useShowToast } from "../hooks/useShowToast";
import { formatDistanceToNow } from "date-fns";
import { useRecoilState, useRecoilValue } from "recoil";
import { userAtom } from "../atoms/userAtom";
import { DeleteIcon } from "@chakra-ui/icons";
import { postAtom } from "../atoms/postAtom";

export const PostPage = () => {
  const currentUser = useRecoilValue(userAtom);
  const params = useParams();
  const toast = useShowToast();
  const [posts, setPosts] = useRecoilState(postAtom);
  const [user, setUser] = useState();
  const navigate = useNavigate();

  async function handleDeletePost(e) {
    try {
      e.preventDefault();
      if (!window.confirm("Are you sure you want to delete this post?")) return;
      const res = await fetch(`/api/posts/${params.pid}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.error) {
        toast("Error", data.error, "error");
        return;
      }
      toast("Success", "Post deleted successfully", "success");
      navigate(`/${user.username}`);
    } catch (error) {
      toast("Error", error, "error");
    }
  }

  useState(() => {
    async function getUser() {
      try {
        const res = await fetch(`/api/user/${params.username}`);
        const data = await res.json();
        if (data.error) {
          toast("Getting user", data.error, "error");
          return;
        }
        setUser(data);
      } catch (error) {
        toast("Error", error, "error");
        setUser(null);
      }
    }
    getUser();
  }, [params.username, toast]);

  const currentPost = posts[0];
  useState(() => {
    async function getPosts() {
      try {
        const res = await fetch(`/api/posts/${params.pid}`);
        const data = await res.json();
        if (data.error) {
          toast("Getting post", data.error, "error");
          return;
        }
        // We are setting this with braces because we set the default vallue of global state as an empty array
        setPosts([data]);
      } catch (error) {
        toast("Error", error, "error");
      }
    }

    getPosts();
  }, [params.pid, toast]);

  if (!user || !currentPost) return null;

  return (
    <Flex flexDirection={"column"} gap={4}>
      <Flex justifyContent={"space-between"}>
        <Flex alignItems={"center"} gap={4}>
          <Avatar src={user.profilePic} name={user.name} />
          <Flex alignItems={"center"} gap={1}>
            <Text fontWeight={"bold"}>{user.username}</Text>
            <Image w={4} h={4} src="/verified.png" />
          </Flex>
        </Flex>
        <Flex alignItems={"center"} gap={4}>
          <Text color={"gray.light"}>
            {formatDistanceToNow(new Date(currentPost.createdAt))} ago
          </Text>
          {currentUser?._id === user?._id && (
            <DeleteIcon onClick={handleDeletePost} cursor={"pointer"} />
          )}
        </Flex>
      </Flex>
      <Text>{currentPost.text}</Text>
      {currentPost.img && (
        <Box
          borderRadius={6}
          overflow={"hidden"}
          border={"1px solid"}
          borderColor={"gray.light"}
        >
          <Image src={currentPost.img} w={"full"} />
        </Box>
      )}
      <Flex>
        <Actions post={currentPost} />
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
      {currentPost.replies.map((reply) => (
        <Comment
          key={reply._id}
          reply={reply}
          lastReply={
            reply._id ===
            currentPost.replies[currentPost.replies.length - 1]._id
          }
        />
      ))}
    </Flex>
  );
};
