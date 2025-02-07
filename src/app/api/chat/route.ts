import OpenAI from "openai";

const openai = new OpenAI();

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Invalid request format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Você é um professor, com muito conhecimento para oferecer. Ajude o usuário na pergunta dele, indique vídeos relacionados ao assunto, e etc.",
        },
        ...messages,
      ],
    });

    const newMessage = completion.choices[0].message;

    console.log(JSON.stringify({ messages: [newMessage] }));
    return new Response(
      JSON.stringify({ messages: [...messages, newMessage] }), // Retorna histórico atualizado
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
