import { Router } from "express";
import {
  createPost,
  getPosts,
  putLikes,
} from "../../application/controllers/postControler";
import { check } from "express-validator";

const router = Router();

router.post("/", createPost);

router.get("/", getPosts);

router.put("/", putLikes);

export default router;
