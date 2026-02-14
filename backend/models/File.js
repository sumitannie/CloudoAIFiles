import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    originalName: { type: String, required: true },
    url: { type: String, required: true },
    public_id: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // SYSTEM FILE TYPE (basic detection)
    category: {
      type: String,
      default: "document",
    },

    // AI TOPIC CLASSIFICATION (dynamic)
    aiCategory: {
      type: String,
      default: null,
    },

    confidence: {
      type: Number,
      default: 0.5,
    },

    tags: {
      type: [String],
      default: [],
    },

    importance: {
      type: String,
      enum: ["low", "normal", "high"],
      default: "normal",
    },

    // AI GENERATED FOLDER
    folder: {
      type: String,
      default: "General",
    },

    // AI SUMMARY
    aiSummary: {
      type: String,
      default: null,
    },

    resourceType: {
      type: String,
      enum: ["image", "raw", "video"],
      required: true,
    },

    // Trash system
    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: {
      type: Date,
      default: null,
    },

    lastAccessedAt: {
      type: Date,
      default: null,
    },

    accessCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("File", fileSchema);
