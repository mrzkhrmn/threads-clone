import { Container } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";
import { UserPage } from "./pages/UserPage";
import { PostPage } from "./pages/PostPage";
import { Header } from "./components/Header";
import { AuthPage } from "./pages/AuthPage";
import { useRecoilValue } from "recoil";
import { userAtom } from "./atoms/userAtom";
import { HomePage } from "./pages/HomePage";
import { LogoutButton } from "./components/LogoutButton";
import { UpdateProfilePage } from "./pages/UpdateProfilePage";

function App() {
  const user = useRecoilValue(userAtom);
  return (
    <Container maxW="620px">
      <Header />
      <Routes>
        <Route
          path="/"
          element={user ? <HomePage /> : <Navigate to={"/auth"} />}
        />
        <Route
          path="/auth"
          element={user ? <Navigate to={"/"} /> : <AuthPage />}
        />
        <Route path="/:username" element={<UserPage />} />
        <Route path="/:username/post/:pid" element={<PostPage />} />
        <Route
          path="/update"
          element={user ? <UpdateProfilePage /> : <Navigate to={"/auth"} />}
        />
      </Routes>
      {user && <LogoutButton />}
    </Container>
  );
}

export default App;
