import React, { useState, useEffect, useRef } from 'react';
import { Send, Mic, Play, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Message } from '../models/simulation';

export function ChatView() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'patient',
      content: 'A ver, el dolor de cabeza no es tanto punzante, es más bien una presión constante, como si me apretaran la cabeza con una vincha, ¿entendés? Y la siento muy pesada.',
      timestamp: new Date(),
      hasAudio: true,
    },
    {
      id: '2',
      sender: 'doctor',
      content: 'Hola, buenas, ¿cómo estás?',
      timestamp: new Date(),
    },
    {
      id: '3',
      sender: 'patient',
      content: 'Hola, doc. Acá andamos, no muy bien, la verdad. Sigo medio zombi con esto.',
      timestamp: new Date(),
      hasAudio: true,
    }
  ]);
  
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'doctor',
      content: input,
      timestamp: new Date(),
    };
    setMessages([...messages, newMessage]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-8 bg-[#f8fafb]">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex flex-col ${msg.sender === 'doctor' ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-2 mb-1 px-2">
                {msg.hasAudio && (
                  <>
                    <span className="text-[10px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100">Audio listo</span>
                    <button className="text-[10px] font-bold text-slate-400 hover:text-slate-600">Repetir</button>
                  </>
                )}
              </div>
              
              <div className={`max-w-[85%] px-5 py-4 rounded-3xl shadow-sm ${
                msg.sender === 'doctor' 
                  ? 'bg-sky-50 text-sky-900 rounded-tr-none border border-sky-100' 
                  : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
              }`}>
                <p className="text-sm leading-relaxed">{msg.content}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="p-4 bg-white border-t border-slate-100 flex items-center gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Escribí al paciente y presioná Enter"
            className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-sky-500/20 transition-all outline-none"
          />
        </div>
        <button 
          onClick={handleSend}
          className="bg-[#003d4c] hover:bg-[#002d38] text-white px-8 py-3.5 rounded-2xl font-bold text-sm transition-all shadow-lg active:scale-95"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
