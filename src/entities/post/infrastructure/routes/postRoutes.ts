import { Router } from "express";
import {
  createPost,
  getPosts,
  updateLikes,
  getPostImage,
  getLikeStatus,
} from "../../application/controllers/postController";
import { check } from "express-validator";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

const router = Router();

router.post("/", upload.single("image"), createPost);

router.get("/", getPosts);

router.put("/", updateLikes);

router.get("/:id", getPostImage);

router.get("/:post_id/:user_id", getLikeStatus);

export default router;
