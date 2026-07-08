import OpenAI from "openai";
import { z } from "zod";
import "dotenv/config";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const ResponseSchema = z.object({
  answer: z.array(z.string()).nonempty(),
  confidence: z.number().min(0).max(5),
});

export async function getOpenAIResponse(prompt) {
  try {
    console.log("🔵 Calling OpenAI...");
    console.log("Prompt:", prompt);

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an AI assistant.

Always respond ONLY with valid JSON.

Format:

{
  "answer": ["point 1", "point 2"],
  "confidence": 4
}`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: {
        type: "json_object",
      },
    });

    const parsed = JSON.parse(completion.choices[0].message.content);

    console.log("✅ OpenAI Parsed:");
    console.log(parsed);

    return ResponseSchema.parse(parsed);

  } catch (error) {
    console.error("❌ OpenAI Error:");
    console.error(error);
    throw error;
  }
}