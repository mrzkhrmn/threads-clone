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
import { useNavigate, useParams } from "react-router-dom";
import Actions from "../components/Actions";
import { useState } from "react";
import { Comment } from "../components/Comment";
import { useShowToast } from "../hooks/useShowToast";
import { formatDistanceToNow } from "date-fns";
import { useRecoilValue } from "recoil";
import { userAtom } from "../atoms/userAtom";
import { DeleteIcon } from "@chakra-ui/icons";

export const PostPage = () => {
  const currentUser = useRecoilValue(userAtom);
  const params = useParams();
  const toast = useShowToast();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState();
  const navigate = useNavigate();

  async function handleDeletePost(e) {
    try {
      e.preventDefault();
      if (!window.confirm("Are you sure you want to delete this post?")) return;
      const res = await fetch(`/api/posts/${post._id}`, {
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
          console.log(data.error);
          toast("Getting user", data.error, "error");
          return;
        }
        setUser(data);
        console.log("User:", data);
      } catch (error) {
        toast("Error", error, "error");
        setUser(null);
      }
    }
    getUser();
  }, [params.username, toast]);

  useState(() => {
    async function getPosts() {
      try {
        const res = await fetch(`/api/posts/${params.pid}`);
        const data = await res.json();
        if (data.error) {
          console.log(data.error);
          toast("Getting post", data.error, "error");
          return;
        }
        setPost(data);
        console.log("Post:", data);
      } catch (error) {
        toast("Error", error, "error");
        setPost(null);
      }
    }

    getPosts();
  }, [params.pid, toast]);

  if (!user || !post) return null;

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
            {formatDistanceToNow(new Date(post.createdAt))} ago
          </Text>
          {currentUser?._id === user?._id && (
            <DeleteIcon onClick={handleDeletePost} cursor={"pointer"} />
          )}
        </Flex>
      </Flex>
      <Text>{post.text}</Text>
      {post.img && (
        <Box
          borderRadius={6}
          overflow={"hidden"}
          border={"1px solid"}
          borderColor={"gray.light"}
        >
          <Image src={post.img} w={"full"} />
        </Box>
      )}
      <Flex>
        <Actions post={post} />
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
      {post.replies.map((reply) => (
        <Comment
          key={reply._id}
          reply={reply}
          lastReply={reply._id === post.replies[post.replies.length - 1]._id}
        />
      ))}
    </Flex>
  );
};
