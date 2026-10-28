import { ragChat } from "@/lib/rag-chat";
import { toNamespace } from "@/lib/namespace";
import { aiUseChatAdapter } from "@upstash/rag-chat/nextjs";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { messages, sessionId, decodedLink } = await req.json();
    const lastMessage = messages[messages.length - 1].content;
    const promptInFrench = `Réponds en français : ${lastMessage}`;

    const response = await ragChat.chat(promptInFrench, {
      streaming: true,
      sessionId,
      namespace: toNamespace(decodedLink),
    });

    return aiUseChatAdapter(response);
  } catch (error: any) {
    console.error("ERREUR:", error?.message);
    console.error(error);
    return new Response("Une erreur est survenue.", { status: 500 });
  }
};