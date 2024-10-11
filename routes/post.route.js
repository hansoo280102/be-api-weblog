import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  create,
  getMyPosts,
  getPosts,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", verifyToken, create);

router.get("/getposts", getPosts);

router.get("/getmyposts", verifyToken, getMyPosts);

export default router;
