import express from "express";
import {
  createPost,
  deletePost,
  getPost,
} from "../controllers/postController.js";
import { protectedRoute } from "../middlewares/protectedRoute.js";

const router = express.Router();

router.get("/:id", getPost);
router.post("/", protectedRoute, createPost);
router.delete("/:id", protectedRoute, deletePost);

export default router;
