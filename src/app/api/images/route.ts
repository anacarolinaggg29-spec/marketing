import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from "@google/generative-ai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'Nenhuma imagem enviada' }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY || !process.env.GEMINI_API_KEY) {
       return NextResponse.json({ error: 'Chaves de API não configuradas' }, { status: 500 });
    }

    // 1. Analisar a imagem original com Gemini (Vision) para criar um prompt profissional
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const fileBuffer = await file.arrayBuffer();
    const base64Image = Buffer.from(fileBuffer).toString('base64');

    const promptAnalysis = "Analise esta foto de uma pessoa e descreva suas características físicas e vestimenta de forma técnica para que eu possa gerar um retrato corporativo profissional idêntico em formato 1:1.";
    
    const result = await model.generateContent([
      promptAnalysis,
      {
        inlineData: {
          data: base64Image,
          mimeType: file.type
        }
      }
    ]);
    const description = result.response.text();

    // 2. Gerar com ChatGPT (DALL-E 3) - 1:1
    const dalleResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt: `Professional corporate headshot, 1:1 aspect ratio, based on this description: ${description}. High-end photography, cinematic lighting.`,
      n: 1,
      size: "1024x1024",
    });

    // 3. Simular geração Gemini (usando a análise para produzir o visual profissional)
    // Nota: Geração direta de imagem no Google AI SDK (Imagen 3) requer acesso específico. 
    // Para esta versão local, entregaremos o resultado do DALL-E e a análise refinada.
    
    return NextResponse.json({ 
      originalAnalysis: description,
      dalleImageUrl: dalleResponse.data[0].url,
      geminiImageUrl: dalleResponse.data[0].url, // Mocking gemini output or using a placeholder
      format: "1:1"
    });

  } catch (error: any) {
    console.error('Erro na Geração de Imagens:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
