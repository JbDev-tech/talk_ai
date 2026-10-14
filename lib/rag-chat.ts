import { RAGChat, groq } from "@upstash/rag-chat";
import { redis } from "./redis";

export const ragChat = new RAGChat({
  model: groq("openai/gpt-oss-20b", {
    apiKey: process.env.GROQ_AI_KEY,
  }),
  redis: redis,
});