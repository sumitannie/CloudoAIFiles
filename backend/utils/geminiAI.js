import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


export const analyzeDocumentWithAI = async (text) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are an AI document organizer.

Analyze the following document content and return:

1. Category (one word)
2. Suggested Folder Name
3. Short Summary (1-2 lines)
4. 5 relevant tags (comma separated)

Document Content:
${text}

Analyze the document and return JSON (respond strictly in JSON format):
{
  "category": "",
  "folder": "",
  "summary": "",
  "tags": []
}

Folder rules:
Create a short human-friendly folder name.

Examples:
Resume → Career
Certificate → Achievements
Study notes → Study
Tax / bills → Finance
Personal docs → Personal
Projects → Projects

Document:
${text.slice(0, 3000)}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    let output = response.text();

    // remove markdown if present
    output = output.replace(/```json/g, "")
                   .replace(/```/g, "")
                   .trim();

    console.log("AI OUTPUT:", output);

    return JSON.parse(output);

  } catch (error) {
    console.error("Gemini AI Error:", error.message);
    return null;
  }
};
