import Fastify from "fastify";
import cors from "@fastify/cors";
import { runSelfConsistency } from "./orchestrator.js";

const fastify = Fastify({
  logger: true,
});

await fastify.register(cors, {
  origin: "*",
});

fastify.get("/", async () => {
  return {
    status: "Server is running!",
  };
});

fastify.post("/ask", async (request, reply) => {
  try {
    const { prompt } = request.body;

    console.log("Received prompt:", prompt);
    console.log("Calling runSelfConsistency...");

    const result = await runSelfConsistency(prompt);

    console.log("Completed successfully.");

    return result;

  } catch (error) {
    console.error("FULL ERROR TRACE:");
    console.error(error);

    return reply.status(500).send({
      error: error.message,
      stack: error.stack,
    });
  }
});

fastify.listen({ port: 3002 }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  console.log("🚀 Server running at http://localhost:3002");
});