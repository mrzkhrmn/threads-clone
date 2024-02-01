import { Flex, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useShowToast } from "../hooks/useShowToast";
import { Post } from "../components/Post";

export const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const toast = useShowToast();

  useEffect(() => {
    async function getFeedPosts() {
      setLoading(true);
      try {
        const res = await fetch(`/api/posts/feed`);
        const data = await res.json();
        if (data.error) {
          toast("Error", data.error, "error");
          return;
        }
        setPosts(data);
      } catch (error) {
        toast("Error", error, "error");
      } finally {
        setLoading(false);
      }
    }
    getFeedPosts();
  }, [toast]);
  console.log(posts);

  if (loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"} />
      </Flex>
    );
  }

  if (!loading && posts.length === 0) {
    return <Text size={"xl"}>Follow some users to see posts</Text>;
  }

  return (
    <Flex flexDirection={"column"}>
      {posts?.map((post) => (
        <Post key={post._id} post={post} postedBy={post.postedBy} />
      ))}
    </Flex>
  );
};
