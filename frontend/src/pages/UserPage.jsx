import { UserHeader } from "../components/UserHeader";
import { UserPost } from "../components/UserPost";

export const UserPage = () => {
  return (
    <div>
      <UserHeader />
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
