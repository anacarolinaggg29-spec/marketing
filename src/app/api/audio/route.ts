import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'Nenhum arquivo de áudio enviado' }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'Chave OpenAI não configurada' }, { status: 500 });
    }

    // OpenAI Whisper requer um arquivo real ou buffer com metadados
    const transcription = await openai.audio.transcriptions.create({
      file: file,
      model: "whisper-1",
    });

    return NextResponse.json({ text: transcription.text });

  } catch (error: any) {
    console.error('Erro na Transcrição:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
