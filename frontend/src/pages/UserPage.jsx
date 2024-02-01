import { useEffect, useState } from "react";
import { UserHeader } from "../components/UserHeader";
import { UserPost } from "../components/UserPost";
import { useParams } from "react-router-dom";
import { useShowToast } from "../hooks/useShowToast";
import { Flex, Spinner } from "@chakra-ui/react";

export const UserPage = () => {
  const { username } = useParams();

  const toast = useShowToast();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

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
      <UserPost postImg={"/post1.png"} postTitle={"Let's talk about threads"} />
      <UserPost postImg={"/post2.png"} postTitle={"Let's talk about threads"} />
      <UserPost postImg={"/post3.png"} postTitle={"Let's talk about threads"} />
      <UserPost postTitle={"Let's talk about threads"} />
    </div>
  );
};
