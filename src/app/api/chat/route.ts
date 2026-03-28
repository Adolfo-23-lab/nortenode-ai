import { groq } from '@ai-sdk/groq';
import { convertToModelMessages, streamText, UIMessage } from 'ai';
import { createRateLimiter } from '@/lib/rate-limit';

export const maxDuration = 30;

// Real rate limiter: max 20 requests per 60 seconds per IP
const chatLimiter = createRateLimiter({ windowMs: 60_000, maxRequests: 20 });

const PROMPT_DEMO = `És a assistente virtual de receção de uma clínica de estética premium no Porto/Gaia.
REGRAS CRÍTICAS:
1. Sê extremamente conciso. Responde com um MÁXIMO de 2 a 3 frases curtas.
2. Foca-te em simular um atendimento de clínica de estética altamente profissional.
3. NÃO inventes (não alucines) tratamentos, informações médicas ou preços absurdos. Mantém-te na realidade.
4. NUNCA dês toda a informação de uma vez.
5. Termina sempre a tua mensagem com uma pergunta curta para manter a conversa fluida e natural.`;

const PROMPT_SALES = `És o assistente virtual oficial da agência NorteNode AI. Falas com donos de clínicas no Porto e Gaia.
REGRAS DE OURO:
1. NUNCA inventes funcionalidades, integrações ou preços que não existem. Somos estritamente precisos.
2. Os nossos únicos serviços são: SaaS WhatsApp IA (a partir de 97€/mês + Taxa de Setup) e Soluções Web Premium (Sob consulta).
3. Se o cliente fizer perguntas muito específicas, técnicas ou sobre preços exatos do plano sob consulta, NÃO tentes adivinhar. Diz com naturalidade que o Diretor e Engenheiro da agência (Adolfo) é a pessoa ideal para analisar esse caso e pede o WhatsApp do cliente para o Adolfo entrar em contacto.
4. Sê extremamente conciso (máximo 2-3 frases) e termina com uma pergunta amigável para captar o lead.`;

export async function POST(req: Request) {
  // --- Rate limiting by client IP ---
  const forwarded = req.headers.get('x-forwarded-for');
  const ip = forwarded?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown';

  if (!chatLimiter.check(ip)) {
    return new Response(
      JSON.stringify({ error: 'Too many requests. Please wait before sending more messages.' }),
      { status: 429, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // --- Parse and validate body ---
  let messages: UIMessage[];
  let botType: string | undefined;

  try {
    const body = await req.json();
    messages = body.messages;
    botType = body.botType;
  } catch {
    return new Response(
      JSON.stringify({ error: 'Invalid request body.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  if (!Array.isArray(messages)) {
    return new Response(
      JSON.stringify({ error: 'Messages must be an array.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const systemPrompt = botType === 'demo' ? PROMPT_DEMO : PROMPT_SALES;
  const safeMessages = messages.slice(-20); // Cap context to last 20 messages

  const result = streamText({
    model: groq('llama-3.3-70b-versatile'),
    system: systemPrompt,
    messages: await convertToModelMessages(safeMessages),
  });

  return result.toUIMessageStreamResponse();
}
