import { Router } from "express";
import { createComment, getComments } from "../../application/controllers/commentController";

const router = Router();

router.post("/", createComment);

router.get("/:post_id", getComments);

export default router;