import File from "../models/File.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import { classifyFile, generateSemanticTokens } from "../utils/fileClassifier.js";
import { generateSmartSuggestions } from "../utils/smartSuggestions.js";

// ---------------- UPLOAD FILES ----------------
export const uploadFile = async (req, res) => {
  try {
    // 1️⃣ Check files
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    const savedFiles = [];

    // 2️⃣ Loop through all uploaded files
    for (const file of req.files) {
      // 3️⃣ Upload to Cloudinary (auto = image/pdf/doc/etc)
      // Decide resource type manually (FIX for PDF issue)
     let resourceType = "raw";

     if (file.mimetype && file.mimetype.startsWith("image/")) {
     resourceType = "image";
     } else if (file.mimetype && file.mimetype.startsWith("video/")) {
     resourceType = "video";

     }

     // Upload to Cloudinary with correct resource type
     const result = await cloudinary.uploader.upload(file.path, {
     resource_type: resourceType,
     folder: "fileVault",
     });
      //smart intelligence features
      const {category, confidence, tags, importance} = classifyFile(
        file.originalname,
        file.mimetype,
      );
      
      const semanticTokens = generateSemanticTokens(category);

      // 4️⃣ Save metadata in mongoDB
      const newFile = await File.create({
        originalName: file.originalname,
        url: result.secure_url,
        public_id: result.public_id,
        resourceType: resourceType,
        mimeType: file.mimetype,
        size: file.size,
        owner: req.userId,

        //AI fields
        category,
        confidence,
        tags,
        importance,

        semanticTokens,

      });

      savedFiles.push(newFile);

      // 5️⃣ SAFELY delete local temp file
      if (file.path && fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
    }

    // 6️⃣ Response
    res.status(201).json({
      msg: "Files uploaded successfully",
      files: savedFiles,
    });
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ error: err.message });
  }
};


//adding pagination - showinig/loading only 10 files at a time
export const getMyFiles = async (req, res) => {
  try {
    const page = Number.parseInt(req.query.page) || 1;
    const limit = Number.parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const query = {
      owner: req.userId,
      isDeleted: false
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
      files
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ---------------- DELETE FILE ----------------
export const deleteFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ msg: "File not found" });

    if (file.owner.toString() !== req.userId) {
      return res.status(403).json({ msg: "Not authorized" });
    }
    
    // SOFT DELETE
    file.isDeleted = true;
    file.deletedAt = new Date();

    await file.save();

    res.json({ msg: "File moved to trash successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
    
};

//----- to restore files  ->
export const restoreFile = async(req, res) => {
   const file = await File.findById(req.params.id);

   if(!file)return res.status(404).json({msg: "File not found"});

   if (file.owner.toString() !== req.userId)
    return res.status(403).json({ msg: "Not authorized" });

  file.isDeleted = false;
  file.deletedAt = null;

  await file.save();

  res.json({ msg: "File restored successfully" });
};

//----delete forever logic->
export const deleteForever = async (req, res) => {
  const file = await File.findById(req.params.id);

  if (!file) return res.status(404).json({ msg: "File not found" });

  if (file.owner.toString() !== req.userId)
    return res.status(403).json({ msg: "Not authorized" });

  await cloudinary.uploader.destroy(file.public_id, {
    resource_type: file.resourceType,
  });

  await file.deleteOne();

  res.json({ msg: "File permanently deleted" });
};


// ---------------- SEARCH FILES ----------------
export const searchFiles = async (req, res) => {
  try {
    const {
      q,
      category,
      type,
      minSize,
      maxSize,
      from,
      to,
    } = req.query;

    // Base query: only user's files
    const query = { owner: req.userId };

    // 🔍 Name search
    if (q) {
      query.originalName = { $regex: q, $options: "i" };
    }

    // 🧠 Category search
    if (category) {
      query.category = category;
    }

    // 📄 Type search (image/pdf/doc)
    if (type) {
      query.mimeType = { $regex: `^${type}`, $options: "i" };
    }

    // 📦 Size search
    if (minSize || maxSize) {
      query.size = {};
      if (minSize) query.size.$gte = Number(minSize);
      if (maxSize) query.size.$lte = Number(maxSize);
    }

    // 🕒 Date search
    if (from || to) {
      query.createdAt = {};
      if (from) query.createdAt.$gte = new Date(from);
      if (to) query.createdAt.$lte = new Date(to);
    }

    const files = await File.find(query).sort({ createdAt: -1 });

    res.json({
      count: files.length,
      files,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---------------- GET TRASH FILES ----------------
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

// // SEMANTIC SEARCH API

// export const semanticSearch = async (req, res) => {
//   try {
//     const { q } = req.query;
//     if (!q) return res.json({ files: [] });

//     const words = q.toLowerCase().split(" ");

//     const files = await File.find({
//       owner: req.userId,
//       isDeleted: false,
//       semanticTokens: { $in: words },
//     });

//     res.json({ files });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

//Smart Suggestions AI controller

export const getSmartSuggestions = async (req, res) => {
  try {
    const files = await File.find({
      owner: req.userId,
      isDeleted: false,
    });

    const suggestions = generateSmartSuggestions(files);

    res.json({
      count: suggestions.length,
      suggestions,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
