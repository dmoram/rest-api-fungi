import { Router } from "express";
import {
  createPost,
  getPosts,
  updateLikes,
  getPostImage,
  getLikeStatus,
  getPostLike
} from "../../application/controllers/postController";
import { check } from "express-validator";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

const router = Router();

router.post("/", upload.single("image"), createPost);

router.get("/", getPosts);

router.get("/like", getPostLike);

router.put("/likes", updateLikes);

router.get("/:id", getPostImage);

router.get("/likes/:post_id/:user_id", getLikeStatus);

export default router;
