import Image from "../models/Image.js";
import cloudinary from "../config/cloudinary.js";

// ---------------- Upload Image ----------------
export const uploadImage = async (req, res) => {
  try {
    const file = req.file; // multer stores file info here

    if (!file) return res.status(400).json({ msg: "No file uploaded" });

    // Cloudinary gives url + public_id in file.path / file.filename
    const newImage = await Image.create({
      url: file.path,
      public_id: file.filename,
      owner: req.userId,
    });

    res.json({ msg: "Image uploaded successfully", image: newImage });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --------------- Get User Images ----------------
export const getMyImages = async (req, res) => {
  try {
    const images = await Image.find({ owner: req.userId }).sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---------------- Delete Image ----------------
export const deleteImage = async (req, res) => {
  try {
    const imageId = req.params.id;

    const image = await Image.findById(imageId);
    if (!image) return res.status(404).json({ msg: "Image not found" });

    // Delete from cloudinary
    await cloudinary.uploader.destroy(image.public_id);

    // Remove from DB
    await image.deleteOne();

    res.json({ msg: "Image deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
