import { useEffect, useState } from "react";
import { UserHeader } from "../components/UserHeader";
import { useParams } from "react-router-dom";
import { useShowToast } from "../hooks/useShowToast";
import { Flex, Spinner, Text } from "@chakra-ui/react";
import { Post } from "../components/Post";

export const UserPage = () => {
  const { username } = useParams();

  const toast = useShowToast();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isFetchingPosts, setIsFetchingPosts] = useState(false);

  useEffect(() => {
    async function getUser() {
      setLoading(true);
      try {
        const res = await fetch(`/api/user/${username}`);
        const data = await res.json();
        if (data.error) {
          console.log(data.error);
          toast("Getting user", data.error, "error");
          return;
        }
        setUser(data);
      } catch (error) {
        toast("Error", error, "error");
      } finally {
        setLoading(true);
      }
    }
    async function getUserPosts() {
      setIsFetchingPosts(true);
      try {
        const res = await fetch(`/api/posts/user/${username}`);
        const data = await res.json();
        if (data.error) {
          console.log(data.error);
          toast("Getting user", data.error, "error");
          return;
        }
        setPosts(data);
      } catch (error) {
        toast("Error", error, "error");
      } finally {
        setIsFetchingPosts(false);
      }
    }
    getUserPosts();
    getUser();
  }, [toast, username]);

  if (!user && loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"} />
      </Flex>
    );
  }

  if (!user && !loading) {
    return <h1>User not found!</h1>;
  }

  return (
    <div>
      <UserHeader user={user} />
      {!isFetchingPosts && posts.length === 0 && (
        <Text mt={10} textAlign={"center"} fontSize={"xl"}>
          Currently this user has not posts.
        </Text>
      )}
      {isFetchingPosts && (
        <Flex justifyContent={"center"}>
          <Spinner size={"xl"} />
        </Flex>
      )}
      {posts &&
        posts.map((post) => (
          <Post key={post._id} post={post} postedBy={post.postedBy} />
        ))}
    </div>
  );
};
