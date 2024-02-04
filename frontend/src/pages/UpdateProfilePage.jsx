import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  Center,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { userAtom } from "../atoms/userAtom";
import { usePreviewImage } from "../hooks/usePreviewImage";
import { useShowToast } from "../hooks/useShowToast";
import { useNavigate } from "react-router-dom";

export const UpdateProfilePage = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [inputData, setInputData] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
    bio: user.bio,
    password: "",
  });
  const [updating, setUpdating] = useState(false);

  const fileRef = useRef(null);
  const toast = useShowToast();
  const navigate = useNavigate();

  const { handleImageChange, imgUrl } = usePreviewImage();

  function handleInputDataChange(e) {
    setInputData({ ...inputData, [e.target.id]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setUpdating(true);
    try {
      const res = await fetch(`/api/user/update/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...inputData, profilePic: imgUrl }),
      });
      const data = await res.json();
      if (data.error) {
        toast("Error while fetching", data.error, "error");
        setUpdating(false);
        return;
      }
      toast("User update", "User updated successfully", "success");
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setUpdating(false);
    } catch (error) {
      toast("Error while submitting", error, "error");
    } finally {
      setUpdating(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Flex align={"center"} justify={"center"} my={6}>
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.dark")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
            User Profile Edit
          </Heading>
          <FormControl id="userName">
            <Stack direction={["column", "row"]} spacing={6}>
              <Center>
                <Avatar
                  size="xl"
                  src={imgUrl || user.profilePic}
                  boxShadow={"md"}
                />
              </Center>
              <Center w="full">
                <Button w="full" onClick={() => fileRef.current.click()}>
                  Change Avatar
                </Button>
                <Input
                  type="file"
                  hidden
                  ref={fileRef}
                  onChange={handleImageChange}
                />
              </Center>
            </Stack>
          </FormControl>
          <FormControl>
            <FormLabel>Full name</FormLabel>
            <Input
              placeholder="John Doe"
              _placeholder={{ color: "gray.500" }}
              type="text"
              id="name"
              value={inputData.name}
              onChange={handleInputDataChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>User name</FormLabel>
            <Input
              placeholder="johndoe"
              _placeholder={{ color: "gray.500" }}
              type="text"
              id="username"
              value={inputData.username}
              onChange={handleInputDataChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input
              placeholder="your-email@example.com"
              _placeholder={{ color: "gray.500" }}
              type="email"
              id="email"
              value={inputData.email}
              onChange={handleInputDataChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Bio</FormLabel>
            <Input
              placeholder="Somethings about you..."
              _placeholder={{ color: "gray.500" }}
              type="text"
              id="bio"
              value={inputData.bio}
              onChange={handleInputDataChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="password"
              _placeholder={{ color: "gray.500" }}
              type="password"
              id="password"
              onChange={handleInputDataChange}
            />
          </FormControl>
          <Stack spacing={6} direction={["column", "row"]}>
            <Button
              bg={"red.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "red.500",
              }}
              isLoading={updating}
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button
              bg={"green.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "green.500",
              }}
              type="submit"
              isLoading={updating}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </form>
  );
};
