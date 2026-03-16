import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { techStoreSystemPrompt } from "@/ai/prompts/techstoreSystemPrompt";
import {createSearchProductsTool} from "@/ai/tools/searchProducts";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = body.messages ?? [];

    let foundProducts: any[] = [];

    const searchProducts = createSearchProductsTool((p) => {
      foundProducts = p;
    });

    const result = await generateText({
      model: google("gemini-2.5-flash"),

      messages,
      temperature: 0.7,

      system: techStoreSystemPrompt,

      tools: { searchProducts },
    });

    return Response.json({
      text: result.text,
      products: foundProducts,
    });
  } catch (error) {
    console.error("AI Chat Error:", error);

    return Response.json({ error: "AI Server Error" }, { status: 500 });
  }
}
