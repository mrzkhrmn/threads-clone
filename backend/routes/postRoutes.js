import express from "express";
import {
  createPost,
  deletePost,
  getFeedPosts,
  getPost,
  likeDislikePost,
  replyPost,
} from "../controllers/postController.js";
import { protectedRoute } from "../middlewares/protectedRoute.js";

const router = express.Router();

router.get("/feed", protectedRoute, getFeedPosts);
router.get("/:id", getPost);
router.post("/", protectedRoute, createPost);
router.post("/like/:id", protectedRoute, likeDislikePost);
router.put("/reply/:id", protectedRoute, replyPost);
router.delete("/:id", protectedRoute, deletePost);

export default router;
