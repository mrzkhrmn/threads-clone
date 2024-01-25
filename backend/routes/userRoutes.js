import express from "express";
import {
  followUnfollowUser,
  loginUser,
  logoutUser,
  signupUser,
} from "../controllers/userController.js";
import { protectedRoute } from "../middlewares/protectedRoute.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/follow/:id", protectedRoute, followUnfollowUser);

export default router;
