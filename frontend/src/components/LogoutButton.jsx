import { Button, useToast } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../atoms/userAtom";

export const LogoutButton = () => {
  const setUser = useSetRecoilState(userAtom);
  const toast = useToast();
  async function handleLogout() {
    try {
      // fetch
      const res = await fetch("/api/user/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.error) {
        toast({
          title: "Error",
          description: data.error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      localStorage.removeItem("userInfo");
      setUser(null);
    } catch (error) {
      toast({
        title: "Error",
        description: error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  return (
    <Button
      position={"fixed"}
      top={"30px"}
      right={"30px"}
      size={"sm"}
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};
