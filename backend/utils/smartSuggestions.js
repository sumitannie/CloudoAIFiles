export const generateSmartSuggestions = (files) => {
  const suggestions = [];
  const now = new Date();

  // 1️⃣ Resume update reminder
  const resumes = files.filter(f => f.category === "resume");
  resumes.forEach(file => {
    const ageDays =
      (now - new Date(file.createdAt)) / (1000 * 60 * 60 * 24);

    if (ageDays > 30) {
      suggestions.push({
        type: "resume_update",
        message: "Your resume was uploaded over a month ago. Consider updating it.",
        fileId: file._id,
        priority: "high",
      });
    }
  });

  // 2️⃣ Grouping suggestion
  const categoryCount = {};
  files.forEach(f => {
    categoryCount[f.category] = (categoryCount[f.category] || 0) + 1;
  });

  Object.entries(categoryCount).forEach(([category, count]) => {
    if (count >= 3) {
      suggestions.push({
        type: "group_files",
        message: `You have ${count} ${category} files. Group them together?`,
        category,
        priority: "medium",
      });
    }
  });

  // 3️⃣ Important files reminder
  files.forEach(file => {
    if (file.importance === "high" && !file.lastAccessedAt) {
      suggestions.push({
        type: "important_file",
        message: "Important file hasn’t been accessed recently.",
        fileId: file._id,
        priority: "high",
      });
    }
  });

  return suggestions;
};
