import ChatInterface from '@/components/ChatInterface';

export default function RoteiroLegendaPage() {
  return (
    <ChatInterface 
      functionType="roteiro_legenda"
      title="Roteiro de Legendas para Post's"
      welcomeMessage="Olá! Vamos criar legendas estratégicas para seus posts. Os roteiros serão criados respeitando as restrições da OAB. Qual sua área de atuação?"
      promptGuidance="Utilize Claude 3.5 para legendas que educam e engajam com ética."
    />
  );
}
