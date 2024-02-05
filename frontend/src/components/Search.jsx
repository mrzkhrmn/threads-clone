import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  Text,
  Input,
  Flex,
  List,
  ListItem,
  Avatar,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useShowToast } from "../hooks/useShowToast";
import { useRecoilState } from "recoil";
import { allUsersAtom } from "../atoms/allUsersAtom";
import { useNavigate } from "react-router-dom";

export const Search = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useRecoilState(allUsersAtom);
  const toast = useShowToast();
  const navigate = useNavigate();

  useEffect(() => {
    async function getAllUsers() {
      try {
        const res = await fetch(`/api/user/`);
        const data = await res.json();
        if (data.error) {
          toast("Error", data.error, "error");
        }
        setUsers(data);
      } catch (error) {
        toast("Error", error, "error");
      }
    }
    getAllUsers();
  }, [toast, setUsers]);

  return (
    <>
      <AiOutlineSearch size={24} onClick={onOpen} cursor={"pointer"} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Search Profiles:</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Input
                type="text"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </FormControl>
            <List>
              {users &&
                searchTerm.length > 2 &&
                users
                  .filter((user) =>
                    user.name.toLowerCase().includes(searchTerm)
                  )
                  .map((user) => (
                    <ListItem key={user._id} mt={5}>
                      <Flex
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        rounded={"lg"}
                        backgroundColor={"#283040"}
                        paddingX={4}
                        paddingY={2}
                        _hover={{ backgroundColor: "#1c222e" }}
                        cursor={"pointer"}
                        onClick={() => {
                          navigate(`/${user.username}`);
                          setSearchTerm("");
                          onClose();
                        }}
                      >
                        <Flex alignItems={"center"} gap={3}>
                          <Avatar name={user.name} src={user.profilePic} />{" "}
                          <Text>{user.name}</Text>
                        </Flex>
                        <Text>{user.username}</Text>
                      </Flex>
                    </ListItem>
                  ))}
            </List>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
