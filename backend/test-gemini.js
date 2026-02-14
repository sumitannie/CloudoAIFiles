import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function run() {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent("Say hello");
    const response = result.response.text();

    console.log("✅ Gemini response:");
    console.log(response);
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

run();
