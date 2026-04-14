import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'Nenhum arquivo de áudio enviado' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'Chave Gemini não configurada' }, { status: 500 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const fileBuffer = await file.arrayBuffer();
    const base64Audio = Buffer.from(fileBuffer).toString('base64');

    // Gemini consegue ouvir o áudio e transcrever
    const result = await model.generateContent([
      {
        inlineData: {
          data: base64Audio,
          mimeType: file.type
        }
      },
      "Transcreva este áudio exatamente como dito, sem adicionar comentários."
    ]);

    const transcription = result.response.text();

    return NextResponse.json({ text: transcription });

  } catch (error: any) {
    console.error('Erro na Transcrição (Gemini):', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
