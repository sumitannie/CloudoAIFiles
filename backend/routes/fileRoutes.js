import express from "express";
import upload from "../config/multer.js";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  uploadFile,
  getMyFiles,
  deleteFile,
  searchFiles,
  restoreFile,
  deleteForever,
  getTrashFiles,
  emptyTrash,
} from "../controllers/fileController.js";


const router = express.Router();

router.post("/upload", authMiddleware, upload.any(), uploadFile);
router.get("/my-files", authMiddleware, getMyFiles);
router.get("/search", authMiddleware, searchFiles);
router.get("/trash", authMiddleware, getTrashFiles);

router.delete("/empty-trash", authMiddleware, emptyTrash);

router.patch("/restore/:id", authMiddleware, restoreFile);
router.delete("/permanent/:id", authMiddleware, deleteForever);

router.delete("/:id", authMiddleware, deleteFile);


export default router;


//new token-

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5Nzk4MjVkOTUxOTM5NDQ2ZDFlYjRkZiIsImlhdCI6MTc2OTU3MDkzMCwiZXhwIjoxNzcwMTc1NzMwfQ.iDoSAj7OyQ9ljMk7V3pyRY-ivxdMWFz2YhegO6p5fe8