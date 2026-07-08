import { getOpenAIResponse } from "./openai-sdk.js";
import { getGeminiResponse } from "./gemini-sdk.js";
import OpenAI from "openai";
import "dotenv/config";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function runSelfConsistency(userPrompt) {
  try {
    console.log("\n========== NEW REQUEST ==========");
    console.log("User Prompt:", userPrompt);

    console.log("Calling OpenAI and Gemini...");

    const [res1, res2] = await Promise.all([
      getOpenAIResponse(userPrompt),
      getGeminiResponse(userPrompt),
    ]);

    console.log("OpenAI:", res1);
    console.log("Gemini:", res2);

    const judgingPrompt = `
Compare these two AI responses.

User Question:
${userPrompt}

GPT Response:
${res1.answer.join(" ")}

Confidence:
${res1.confidence}/5

Gemini Response:
${res2.answer.join(" ")}

Confidence:
${res2.confidence}/5

Judge based on:

- Accuracy
- Clarity
- Relevance
- Completeness

Explain briefly in bullet points and finally mention which response is better.
`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: judgingPrompt,
        },
      ],
    });

    return {
      gpt: res1,
      gemini: res2,
      judgment: completion.choices[0].message.content,
    };

  } catch (error) {
    console.error("❌ Error in runSelfConsistency");
    console.error(error);

    throw error;
  }
}