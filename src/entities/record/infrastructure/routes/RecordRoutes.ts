import { Router } from "express";
import { createRecord } from "../../application/controllers/RecordController";
import multer from "multer";

const upload = multer({ dest: "uploads/records" });

const router = Router();

router.post("/", upload.single("image"), createRecord);

export default router;
