import { ragChat } from "@/lib/rag-chat";
import { aiUseChatAdapter } from "@upstash/rag-chat/nextjs";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    console.log("Appel en cours...");

    const { messages, sessionId } = await req.json();
    const lastMessage = messages[messages.length - 1].content;
    const promptInFrench = `Réponds en français : ${lastMessage}`;

    const response = await ragChat.chat(promptInFrench, {
      streaming: true,
      sessionId,
    });

    console.log("isStream:", response?.isStream);

    // Afficher la réponse complète dans la console (pour debug)
    if (response?.isStream && response.output) {
      let fullText = "";
      // On clone le comportement : on lit une copie si possible
      // Avec le stream Upstash, on log souvent via debug mode plutôt
      console.log("Stream reçu — la réponse part vers le client.");
    }

    console.log(response);

    return aiUseChatAdapter(response);
  } catch (error: any) {
    console.error("ERREUR:", error?.message);
    console.error(error);
    return new Response("Une erreur est survenue.", { status: 500 });
  }
};