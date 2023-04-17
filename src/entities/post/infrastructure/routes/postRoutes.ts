import { Router } from "express";
import { createPost } from "../../application/controllers/postControler";
import { check } from "express-validator";

const router = Router();

router.post("/", createPost);

export default router;