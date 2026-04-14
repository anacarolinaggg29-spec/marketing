'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Mic, X, FileText, Play, Square, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  audioUrl?: string;
  files?: Array<{ name: string; type: string }>;
}

interface ChatInterfaceProps {
  functionType: 'roteiro_video' | 'roteiro_legenda' | 'criacao_imagem';
  title: string;
  welcomeMessage: string;
  promptGuidance?: string;
}

export default function ChatInterface({ 
  functionType, 
  title, 
  welcomeMessage,
  promptGuidance 
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: welcomeMessage }
  ]);
  const [input, setInput] = useState('');
  const [areaAtuacao, setAreaAtuacao] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isWaitingForArea, setIsWaitingForArea] = useState(true);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() && files.length === 0) return;

    // Se estivermos esperando a área de atuação (Regra OAB)
    if (isWaitingForArea && functionType !== 'criacao_imagem') {
      setAreaAtuacao(input);
      setIsWaitingForArea(false);
      setMessages(prev => [...prev, 
        { id: Date.now().toString(), role: 'user', content: input },
        { id: (Date.now()+1).toString(), role: 'assistant', content: `Entendido. Área de atuação definida como: ${input}. Como posso ajudar com seu marketing hoje?` }
      ]);
      setInput('');
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      files: files.map(f => ({ name: f.name, type: f.type }))
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      let endpoint = '/api/chat';
      let body: any = { message: input, functionType, areaAtuacao };

      // Se for criação de imagem e houver arquivo
      if (functionType === 'criacao_imagem' && files.length > 0) {
        const formData = new FormData();
        formData.append('file', files[0]);
        const imgRes = await fetch('/api/images', { method: 'POST', body: formData });
        const imgData = await imgRes.json();
        
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          role: 'assistant',
          content: `Aqui estão suas fotos profissionais (1:1):\n\n[Gemini Version](${imgData.geminiImageUrl})\n[ChatGPT Version](${imgData.dalleImageUrl})\n\nAnálise: ${imgData.originalAnalysis}`
        }]);
        setFiles([]);
        setIsLoading(false);
        return;
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();

      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: data.content
      }].slice(-11));
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      audioChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.current.onstop = async () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        setIsLoading(true);
        try {
          const formData = new FormData();
          formData.append('file', audioBlob, 'recording.wav');
          const res = await fetch('/api/audio', { method: 'POST', body: formData });
          const data = await res.json();
          
          setInput(data.text);
          // Opcional: enviar automaticamente após transcrição
          // handleSend(); 
        } catch (err) {
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      };

      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Erro ao acessar microfone:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col h-full relative overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-[rgba(255,255,255,0.08)] bg-[rgba(0,0,0,0.2)]">
        <h2 className="text-xl font-semibold text-[var(--accent-gold)]">{title}</h2>
        {promptGuidance && (
          <p className="text-xs text-gray-400 mt-1">{promptGuidance}</p>
        )}
      </div>

      {/* Messages area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
      >
        {messages.map((m) => (
          <div 
            key={m.id}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
          >
            <div 
              className={`max-w-[80%] p-4 rounded-2xl ${
                m.role === 'user' 
                  ? 'bg-[var(--chat-user-bg)] border border-[rgba(207,170,107,0.2)]' 
                  : 'bg-[var(--chat-assistant-bg)] border border-[rgba(255,255,255,0.05)]'
              } glass-panel`}
            >
              <div className="text-sm leading-relaxed whitespace-pre-wrap">
                {m.content}
              </div>
              
              {m.audioUrl && (
                <div className="mt-3 flex items-center space-x-2 p-2 bg-black/20 rounded-lg">
                  <Play size={14} className="text-[var(--accent-gold)]" />
                  <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--accent-gold)] w-1/3" />
                  </div>
                  <span className="text-[10px] text-gray-400">0:12</span>
                </div>
              )}

              {m.files && m.files.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {m.files.map((f, i) => (
                    <div key={i} className="flex items-center space-x-2 text-[10px] bg-white/5 border border-white/10 px-2 py-1 rounded-md">
                      <FileText size={12} className="text-blue-400" />
                      <span className="truncate max-w-[100px]">{f.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start animate-pulse">
            <div className="bg-[var(--chat-assistant-bg)] border border-[rgba(255,255,255,0.05)] p-4 rounded-2xl glass-panel">
              <Loader2 className="animate-spin text-[var(--accent-gold)]" size={18} />
            </div>
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="p-6 pt-0">
        <div className="max-w-4xl mx-auto space-y-4">
          {/* File previews */}
          {files.length > 0 && (
            <div className="flex flex-wrap gap-2 px-2">
              {files.map((file, i) => (
                <div key={i} className="flex items-center space-x-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-xs animate-fade-in">
                  <FileText size={14} className="text-blue-400" />
                  <span className="truncate max-w-[150px]">{file.name}</span>
                  <button onClick={() => removeFile(i)} className="hover:text-red-400">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Actual input box */}
          <div className="glass-panel p-2 flex items-center space-x-2 border-[rgba(255,255,255,0.12)]">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="p-3 text-gray-400 hover:text-[var(--accent-gold)] transition-colors hover:bg-white/5 rounded-xl"
            >
              <Paperclip size={20} />
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              multiple 
              onChange={handleFileChange}
            />
            
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Digite sua mensagem ou anexe arquivos..."
              className="flex-1 bg-transparent border-none focus:outline-none text-sm px-2 text-white placeholder:text-gray-500"
            />

            {!input.trim() && !isRecording && (
              <button 
                onClick={startRecording}
                className="p-3 text-gray-400 hover:text-red-400 transition-colors hover:bg-white/5 rounded-xl"
              >
                <Mic size={20} />
              </button>
            )}

            {isRecording && (
              <button 
                onClick={stopRecording}
                className="p-3 text-red-500 hover:bg-red-500/10 rounded-xl flex items-center space-x-2 animate-pulse"
              >
                <Square size={20} fill="currentColor" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Gravando</span>
              </button>
            )}

            <button 
              onClick={handleSend}
              disabled={isLoading || (!input.trim() && files.length === 0)}
              className="p-3 bg-[var(--accent-gold)] hover:bg-[var(--accent-gold-hover)] text-black rounded-xl transition-all shadow-[0_0_15px_rgba(207,170,107,0.3)] disabled:opacity-50 disabled:shadow-none"
            >
              <Send size={20} />
            </button>
          </div>
          
          <p className="text-[9px] text-center text-gray-500 uppercase tracking-widest">
            Privacidade Garantida • Conformidade OAB • Célula IA
          </p>
        </div>
      </div>
    </div>
  );
}
