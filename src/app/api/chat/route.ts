import { groq } from '@ai-sdk/groq';
import { convertToModelMessages, streamText, UIMessage } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: groq('llama-3.3-70b-versatile'),
    system: "És o assistente virtual da NorteNode AI, uma agência de automação e IA focada exclusivamente em clínicas de estética premium no Porto e Vila Nova de Gaia. O teu objetivo é responder a dúvidas de forma muito breve, profissional, elegante e persuasiva. Deves focar-te em como a IA reduz faltas de pacientes e aumenta as marcações 24/7. Termina sempre convidando o dono da clínica a agendar uma demonstração gratuita.",
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
