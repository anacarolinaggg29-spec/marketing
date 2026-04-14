import ChatInterface from '@/components/ChatInterface';

export default function RoteiroVideoPage() {
  return (
    <ChatInterface 
      functionType="roteiro_video"
      title="Roteiro de Vídeo com Claude"
      welcomeMessage="Bem-vindo ao criador de roteiros para Instagram. Os roteiros dos vídeos serão criados respeitando as restrições da OAB. Por favor, informe sua área de atuação para começarmos."
      promptGuidance="Utilize Claude 3.5 para gerar scripts persuasivos e éticos."
    />
  );
}
