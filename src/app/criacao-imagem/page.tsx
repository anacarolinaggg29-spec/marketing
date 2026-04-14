import ChatInterface from '@/components/ChatInterface';

export default function CriacaoImagemPage() {
  return (
    <ChatInterface 
      functionType="criacao_imagem"
      title="Criação de Imagens Profissionais"
      welcomeMessage="Bem-vindo ao estúdio de imagem. Faça o upload de uma foto sua e gerarei versões profissionais em formato 1:1 utilizando Gemini e ChatGPT simultaneamente."
      promptGuidance="Utilize Gemini Vision e DALL-E 3 para resultados de alta qualidade."
    />
  );
}
