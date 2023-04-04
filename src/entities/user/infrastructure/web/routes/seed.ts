import { Router } from "express";
import { loadData } from "../../../application/controllers/seed";

const router = Router();

router.get("/", loadData);

export default router;
