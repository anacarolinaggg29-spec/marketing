import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'Nenhuma imagem enviada' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
       return NextResponse.json({ error: 'Chave Gemini não configurada' }, { status: 500 });
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

    // 2. Mock de geração (Removido OpenAI DALL-E)
    // Para esta fase de teste somente com Gemini Key, retornamos a análise refinada.
    // A geração real de Imagens via Gemini (Imagen 3) geralmente ocorre via Vertex AI.
    
    return NextResponse.json({ 
      originalAnalysis: description,
      dalleImageUrl: "", // Desativado (OpenAI removida)
      geminiImageUrl: "https://via.placeholder.com/1024x1024.png?text=Gemini+Vision+Analysis+Done", 
      format: "1:1",
      status: "Only Gemini Key active. OpenAI generation skipped."
    });

  } catch (error: any) {
    console.error('Erro na Geração de Imagens (Gemini):', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
