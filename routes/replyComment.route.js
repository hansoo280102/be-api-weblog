import express from "express";
import {
  createReply,
  deleteReply,
  editReply,
  getReplies,
  likeReply,
} from "../controllers/replyComment.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/", verifyToken, createReply); // Tạo reply
router.get("/:commentId", getReplies); // Lấy các reply cho comment
router.put("/like/:replyId", verifyToken, likeReply); // Thích reply
router.put("/edit/:replyId", verifyToken, editReply); // Chỉnh sửa reply
router.delete("/:replyId", verifyToken, deleteReply); // Xóa reply

export default router;
