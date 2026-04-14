import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from '@/lib/prisma';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const { chatId, message, areaAtuacao } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'Chave Gemini não configurada' }, { status: 500 });
    }

    // 1. Regra OAB e System Prompt
    let systemPrompt = `Você é um assistente especializado em marketing jurídico para advogados no Brasil.
    Sua missão é gerar roteiros para vídeos no instagram para advogados, conforme sua área de atuação e critérios da OAB.
    
    Ao receber uma solicitação de criação de roteiro de vídeo, você deve solicitar obrigatoriamente:
    1 - A área de atuação 
    2 - Tipo de vídeo: Reels, Feed, Story ou outro
    3 - Objetivo do Vídeo

    Crie os roteiros somente após receber essas informações.
    Informe sempre que os roteiros dos vídeos serão criados respeitando as restrições da OAB.
    
    Regras Críticas:
    - Não prometer resultados.
    - Não incitar ao litígio.
    - Focar em caráter informativo e educacional.
    - Nunca usar tom sensacionalista.`;

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: systemPrompt
    });

    // 2. Recuperar histórico (máximo 10 mensagens conforme PRD)
    let history: any[] = [];
    if (chatId) {
      const dbMessages = await prisma.message.findMany({
        where: { chatId },
        orderBy: { createdAt: 'desc' },
        take: 10,
      });
      history = dbMessages.reverse().map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content || '' }]
      }));
    }

    // 3. Chamada para Gemini
    const chat = model.startChat({
      history: history,
      generationConfig: {
        maxOutputTokens: 5000,
      },
    });

    const result = await chat.sendMessage(message);
    const assistantContent = result.response.text();

    return NextResponse.json({ 
      content: assistantContent
    });

  } catch (error: any) {
    console.error('Erro na API de Chat (Gemini):', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
