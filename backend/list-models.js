import dotenv from "dotenv";
dotenv.config();

async function listModels() {
  const API_KEY = process.env.GEMINI_API_KEY;
  
  const url = `https://generativelanguage.googleapis.com/v1/models?key=${API_KEY}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (response.ok) {
      console.log("✅ Available models:");
      data.models?.forEach(model => {
        console.log(`  - ${model.name}`);
        console.log(`    Methods: ${model.supportedGenerationMethods.join(", ")}`);
      });
      
      if (!data.models || data.models.length === 0) {
        console.log("❌ No models available for this API key!");
        console.log("This means your API key doesn't have Gemini access.");
      }
    } else {
      console.log("❌ Cannot list models");
      console.log("Error:", JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.error("Request failed:", error.message);
  }
}

listModels();