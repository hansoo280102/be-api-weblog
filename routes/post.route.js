import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  create,
  deletePost,
  getMyPosts,
  getPosts,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", verifyToken, create);

router.get("/getposts", getPosts);

router.get("/getmyposts", getMyPosts);

router.delete("/deletepost/:postId/:userId", verifyToken, deletePost);

export default router;
