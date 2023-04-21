import { Router } from "express";
import {
  createPost,
  getPosts,
  putLikes,
} from "../../application/controllers/postControler";
import { check } from "express-validator";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

const router = Router();

router.post("/", upload.single("image"), createPost);

router.get("/", getPosts);

router.put("/", putLikes);

export default router;
