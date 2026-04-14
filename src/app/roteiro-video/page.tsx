import ChatInterface from '@/components/ChatInterface';

export default function RoteiroVideoPage() {
  return (
    <ChatInterface 
      functionType="roteiro_video"
      title="Roteiro de Vídeos"
      welcomeMessage="Bem-vindo ao criador de roteiros para Instagram. Os roteiros serão criados respeitando as restrições da OAB. Para começarmos, por favor informe: 
      1 - Sua área de atuação 
      2 - Tipo de vídeo (Reels, Feed, Story ou outro)
      3 - Objetivo do Vídeo"
      promptGuidance="Geração de roteiros persuasivos e éticos."
    />
  );
}
