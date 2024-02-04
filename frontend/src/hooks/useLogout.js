import { useSetRecoilState } from "recoil";
import { userAtom } from "../atoms/userAtom";
import { useShowToast } from "./useShowToast";

export const useLogout = () => {
  const setUser = useSetRecoilState(userAtom);
  const toast = useShowToast();

  async function logout() {
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
      toast("Success", "Logged out", "success");
      setUser(null);
    } catch (error) {
      toast("Error", error, "error");
    }
  }

  return logout;
};

export default useLogout;
