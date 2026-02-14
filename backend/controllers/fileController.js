import File from "../models/File.js";
import axios from "axios";
import { classifyFile } from "../utils/fileClassifier.js";
import { analyzeDocumentWithAI } from "../utils/geminiAI.js";
import { extractText } from "../utils/textExtractor.js";

export const uploadFile = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    const savedFiles = [];

    for (const file of req.files) {
      const fileUrl = file.path;
      const publicId = file.filename;

      const {
        category,
        confidence,
        tags,
        importance,
      } = classifyFile(file.originalname, file.mimetype);

      let aiCategory = null;
      let aiTags = tags;
      let aiImportance = importance;
      let aiFolder = "General";
      let aiSummary = null;

      if (file.mimetype.startsWith("image/")) {
        aiFolder = "Images";
        aiCategory = "Media";
        aiSummary = "Image file";
      } else if (file.mimetype.startsWith("video/")) {
        aiFolder = "Videos";
        aiCategory = "Media";
        aiSummary = "Video file";
      }
      else if (
        file.mimetype.includes("pdf") ||
        file.mimetype.includes("word") ||
        file.mimetype.includes("text")
      ) {
        try {
          const response = await axios.get(fileUrl, {
            responseType: "arraybuffer",
          });

          const text = await extractText(
            Buffer.from(response.data),
            file.mimetype
          );

          console.log("========= TEXT EXTRACTED =========");
          console.log(text.slice(0, 200));
          console.log("==================================");

          if (text && text.length > 50) {
            const aiResult = await analyzeDocumentWithAI(text);

            console.log("AI OUTPUT:", aiResult);

            if (aiResult?.category) aiCategory = aiResult.category;
            if (aiResult?.folder) aiFolder = aiResult.folder;
            if (aiResult?.summary) aiSummary = aiResult.summary;
            if (aiResult?.tags) aiTags = aiResult.tags;
          }
        } catch (err) {
          console.log("AI analysis skipped");
        }
      }

      const newFile = await File.create({
        originalName: file.originalname,
        url: fileUrl,
        public_id: publicId,
        resourceType: file.mimetype.startsWith("image/")
          ? "image"
          : file.mimetype.startsWith("video/")
          ? "video"
          : "raw",
        mimeType: file.mimetype,
        size: file.size,
        owner: req.userId,

        // system classification
        category,

        // AI intelligence
        aiCategory,
        confidence,
        tags: aiTags,
        importance: aiImportance,
        folder: aiFolder,
        aiSummary,
      });

      savedFiles.push(newFile);
    }

    res.status(201).json({
      msg: "Files uploaded successfully",
      files: savedFiles,
    });
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ error: err.message });
  }
};

export const getMyFiles = async (req, res) => {
  try {
    const page = Number.parseInt(req.query.page) || 1;
    const limit = Number.parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const query = {
      owner: req.userId,
      isDeleted: false,
    };

    const totalFiles = await File.countDocuments(query);

    const files = await File.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      page,
      limit,
      totalFiles,
      totalPages: Math.ceil(totalFiles / limit),
      files,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ msg: "File not found" });

    if (file.owner.toString() !== req.userId) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    file.isDeleted = true;
    file.deletedAt = new Date();
    await file.save();

    res.json({ msg: "File moved to trash successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const restoreFile = async (req, res) => {
  const file = await File.findById(req.params.id);
  if (!file) return res.status(404).json({ msg: "File not found" });

  if (file.owner.toString() !== req.userId)
    return res.status(403).json({ msg: "Not authorized" });

  file.isDeleted = false;
  file.deletedAt = null;
  await file.save();

  res.json({ msg: "File restored successfully" });
};

export const deleteForever = async (req, res) => {
  const file = await File.findById(req.params.id);
  if (!file) return res.status(404).json({ msg: "File not found" });

  if (file.owner.toString() !== req.userId)
    return res.status(403).json({ msg: "Not authorized" });

  await file.deleteOne();

  res.json({ msg: "File permanently deleted" });
};

export const searchFiles = async (req, res) => {
  try {
    const { q } = req.query;

    const query = { owner: req.userId, isDeleted: false };

    if (q) {
      query.originalName = { $regex: q, $options: "i" };
    }

    const files = await File.find(query).sort({ createdAt: -1 });

    res.json({ files });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTrashFiles = async (req, res) => {
  try {
    const files = await File.find({
      owner: req.userId,
      isDeleted: true,
    }).sort({ deletedAt: -1 });

    res.json({ files });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
