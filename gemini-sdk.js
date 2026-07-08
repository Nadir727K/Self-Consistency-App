import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";
import "dotenv/config";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

const ResponseSchema = z.object({
  answer: z.array(z.string()).nonempty(),
  confidence: z.number().min(0).max(5),
});

export async function getGeminiResponse(prompt) {
  try {
    console.log("🔴 Calling Gemini...");
    console.log("Prompt:", prompt);

    const result = await model.generateContent(`
You are an AI assistant.

Return ONLY valid JSON.

{
  "answer": ["point 1", "point 2"],
  "confidence": 4
}

User Prompt:
${prompt}
`);

    console.log("✅ Gemini API call completed");

    const text = result.response.text();

    console.log("Raw Gemini Response:");
    console.log(text);

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    console.log("Parsed Gemini:");
    console.log(parsed);

    return ResponseSchema.parse(parsed);

  } catch (error) {
    console.error("❌ Gemini Error:");
    console.error(error);
    throw error;
  }
}