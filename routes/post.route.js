import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  approvePost,
  create,
  deletePost,
  getMyPosts,
  getPendingPostById,
  getPendingPosts,
  getPosts,
  rejectPost,
  updatePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", verifyToken, create);

router.get("/getposts", getPosts);

router.get("/getmyposts", getMyPosts);

router.delete("/deletepost/:postId/:userId", verifyToken, deletePost);

router.put("/updatepost/:postId/:userId", verifyToken, updatePost);

// Route để admin/censor phê duyệt bài viết
router.put("/approve/:postId", verifyToken, approvePost);

// Route để admin/censor từ chối bài viết
router.put("/reject/:postId", verifyToken, rejectPost);

router.get("/getpendingposts", verifyToken, getPendingPosts);

router.get("/pending/:postId", getPendingPostById);

export default router;
