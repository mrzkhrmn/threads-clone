import express from "express";
import {
  followUnfollowUser,
  getAllUsers,
  getUserProfile,
  loginUser,
  logoutUser,
  signupUser,
  updateProfile,
} from "../controllers/userController.js";
import { protectedRoute } from "../middlewares/protectedRoute.js";

const router = express.Router();

router.get("/:query", getUserProfile);
router.get("/", getAllUsers);
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/follow/:id", protectedRoute, followUnfollowUser);
router.put("/update/:id", protectedRoute, updateProfile);

export default router;
