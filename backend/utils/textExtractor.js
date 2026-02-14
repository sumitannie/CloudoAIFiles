import mammoth from "mammoth";
import Tesseract from "tesseract.js";

// Dynamic import for pdf-parse to avoid startup error
let pdfParse;

export const extractText = async (fileBuffer, mimeType = "") => {
  try {
    if (!fileBuffer) return "";

    // PDF - load pdf-parse only when needed
    if (mimeType.includes("pdf")) {
      if (!pdfParse) {
        // Lazy load pdf-parse
        const pdfParseModule = await import("pdf-parse");
        pdfParse = pdfParseModule.default;
      }
      const data = await pdfParse(fileBuffer);
      return data.text || "";
    }

    // DOCX
    if (mimeType.includes("wordprocessingml")) {
      const result = await mammoth.extractRawText({ buffer: fileBuffer });
      return result.value || "";
    }

    // Images (OCR)
    if (mimeType.includes("image/")) {
      console.log("Performing OCR on image...");
      const { data: { text } } = await Tesseract.recognize(
        fileBuffer,
        'eng'
      );
      return text || "";
    }

    // TXT & CSV
    if (mimeType.includes("text/plain") || mimeType.includes("csv")) {
      return fileBuffer.toString("utf-8");
    }

    return "";
  } catch (error) {
    console.error("Text extraction error:", error);
    return "";
  }
};