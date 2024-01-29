import { useEffect, useState } from "react";
import { UserHeader } from "../components/UserHeader";
import { UserPost } from "../components/UserPost";
import { useParams } from "react-router-dom";
import { useShowToast } from "../hooks/useShowToast";

export const UserPage = () => {
  const { username } = useParams();

  const toast = useShowToast();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
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
      }
    }
    getUser();
  }, [toast, username]);

  console.log(user);

  return (
    <div>
      <UserHeader user={user} />
      <UserPost
        likes={1200}
        replies={350}
        postImg={"/post1.png"}
        postTitle={"Let's talk about threads"}
      />
      <UserPost
        likes={342}
        replies={150}
        postImg={"/post2.png"}
        postTitle={"Let's talk about threads"}
      />
      <UserPost
        likes={234}
        replies={123}
        postImg={"/post3.png"}
        postTitle={"Let's talk about threads"}
      />
      <UserPost
        likes={234}
        replies={123}
        postTitle={"Let's talk about threads"}
      />
    </div>
  );
};
