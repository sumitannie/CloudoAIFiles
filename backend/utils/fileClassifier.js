// export const classifyFile = (originalName, mimeType) => {
//   const safeName = (originalName || "").toLowerCase();
//   const safeMime = mimeType || "";

//   let category = "other";
//   let confidence = 0.5;
//   let tags = [];
//   let importance = "normal";

//   if (safeName.includes("resume") || safeName.includes("cv")) {
//     category = "resume";
//     confidence = 0.9;
//     tags = ["career", "job", "important"];
//     importance = "high";
//   }

//   else if (safeName.includes("certificate") || safeName.includes("cert")) {
//     category = "certificate";
//     confidence = 0.85;
//     tags = ["official", "document"];
//     importance = "high";
//   }

//   else if (safeName.includes("project") || safeName.includes("report")) {
//     category = "project";
//     confidence = 0.8;
//     tags = ["work", "academic"];
//   }

//   else if (safeName.includes("notes") || safeName.includes("lecture")) {
//     category = "notes";
//     confidence = 0.75;
//     tags = ["study", "education"];
//   }

//   else if (safeMime.startsWith("image/")) {
//     category = "image";
//     confidence = 0.95;
//     tags = ["media"];
//   }

//   else if (safeMime.includes("pdf") || safeMime.includes("word")) {
//     category = "document";
//     confidence = 0.6;
//     tags = ["document"];
//   }

//   return {
//     category,
//     confidence,
//     tags,
//     importance,
//   };
// };


// export const generateSemanticTokens = (category) => {
//   const map = {
//     resume: ["job", "career", "cv"],
//     certificate: ["proof", "achievement"],
//     project: ["development", "work"],
//     notes: ["study", "education"],
//     document: ["file", "record"],
//     image: ["photo", "picture"],
//     other: [],
//   };

//   return map[category] || [];
// };
 
//--


// server/utils/fileClassifier.js

export const classifyFile = (originalName, mimeType) => {
  const safeName = (originalName || "").toLowerCase();
  const safeMime = mimeType || "";

  let category = "other";
  let confidence = 0.5;
  let tags = [];
  let importance = "normal";

  // =========================
  // 🧠 RESUME / CV
  // =========================
  if (
    safeName.includes("resume") ||
    safeName.includes("cv") ||
    safeName.includes("curriculum") ||
    safeName.includes("profile") ||
    safeName.includes("biodata")
  ) {
    category = "resume";
    confidence = 0.92;
    tags = [
      "career",
      "job",
      "professional",
      "important",
      "personal",
    ];
    importance = "high";
  }

  // =========================
  // 🎓 CERTIFICATES
  // =========================
  else if (
    safeName.includes("certificate") ||
    safeName.includes("cert") ||
    safeName.includes("award")
  ) {
    category = "certificate";
    confidence = 0.87;
    tags = [
      "achievement",
      "official",
      "verification",
      "important",
    ];
    importance = "high";
  }

  // =========================
  // 📊 PROJECTS / REPORTS
  // =========================
  else if (
    safeName.includes("project") ||
    safeName.includes("report") ||
    safeName.includes("thesis")
  ) {
    category = "project";
    confidence = 0.8;
    tags = [
      "work",
      "academic",
      "development",
      "submission",
    ];
  }

  // =========================
  // 📒 NOTES / STUDY MATERIAL
  // =========================
  else if (
    safeName.includes("notes") ||
    safeName.includes("lecture") ||
    safeName.includes("slides")
  ) {
    category = "notes";
    confidence = 0.75;
    tags = [
      "study",
      "education",
      "learning",
    ];
  }

  // =========================
  // 🖼️ IMAGES
  // =========================
  else if (safeMime.startsWith("image/")) {
    category = "image";
    confidence = 0.95;
    tags = [
      "media",
      "photo",
      "visual",
    ];
  }

  // =========================
  // 📄 GENERIC DOCUMENTS
  // =========================
  else if (
    safeMime.includes("pdf") ||
    safeMime.includes("word") ||
    safeMime.includes("text")
  ) {
    category = "document";
    confidence = 0.6;
    tags = [
      "document",
      "file",
      "record",
    ];
  }

  return {
    category,
    confidence,
    tags,
    importance,
  };
};

