console.log("📁 imageRoutes.js LOADED");
import express from "express";
import upload from "../config/multer.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { uploadImage, getMyImages, deleteImage } from "../controllers/imageController.js";

const router = express.Router();

router.post("/upload", authMiddleware, upload.single("image"), uploadImage);
router.get("/my-images", authMiddleware, getMyImages);
router.delete("/:id", authMiddleware, deleteImage);

export default router;
