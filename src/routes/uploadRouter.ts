import { Router } from "express";
import { upload, handleUpload } from "../controllers/uploadcontroller";
const router = Router();

router.post("/upload", upload.single('image'), handleUpload);

export default router;