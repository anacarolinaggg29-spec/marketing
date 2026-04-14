import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { prisma } from '@/lib/prisma';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export async function POST(req: Request) {
  try {
    const { chatId, message, functionType, areaAtuacao } = await req.json();

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ error: 'Chave Anthropic não configurada' }, { status: 500 });
    }

    // 1. Regra OAB e System Prompt com Caching
    let systemPrompt = `Você é um assistente especializado em marketing jurídico para advogados no Brasil.
    Sua missão é criar conteúdo (roteiros ou legendas) que sejam persuasivos mas que RESPEITEM ESTREITAMENTE o Código de Ética da OAB.
    Área de Atuação do Usuário: ${areaAtuacao || 'Geral'}.
    
    Regras Críticas:
    - Não prometer resultados.
    - Não incitar ao litígio.
    - Focar em caráter informativo e educacional.
    - Nunca usar tom sensacionalista.`;

    // 2. Recuperar histórico (máximo 10 mensagens conforme PRD)
    let history: any[] = [];
    if (chatId) {
      const dbMessages = await prisma.message.findMany({
        where: { chatId },
        orderBy: { createdAt: 'desc' },
        take: 10,
      });
      history = dbMessages.reverse().map(m => ({
        role: m.role,
        content: m.content
      }));
    }

    // 3. Chamada para Anthropic com Prompt Caching (Ephemeral)
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 5000,
      system: [
        {
          type: "text",
          text: systemPrompt,
          // @ts-ignore - Cache control block
          cache_control: { type: "ephemeral" }
        }
      ],
      messages: [
        ...history,
        { role: 'user', content: message }
      ],
    });

    const assistantContent = response.content[0].type === 'text' ? response.content[0].text : '';

    // 4. Salvar no Banco de Dados (Seria ideal criar o chat se não existir)
    // Para brevidade técnica local, retornamos o conteúdo simulando o salvamento
    
    return NextResponse.json({ 
      content: assistantContent,
      usage: response.usage 
    });

  } catch (error: any) {
    console.error('Erro na API de Chat:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
