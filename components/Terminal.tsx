import React, { useState, useRef, useEffect } from 'react';
import { TerminalMessage, BotStatus } from '../types';
import { TERMINAL_WELCOME_MSG } from '../constants';
import { sendMessageToGemini } from '../services/geminiService';
import { Terminal as TerminalIcon, Send, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Terminal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<TerminalMessage[]>([
    {
      id: 'init',
      sender: 'system',
      text: TERMINAL_WELCOME_MSG,
      timestamp: new Date()
    }
  ]);
  const [status, setStatus] = useState<BotStatus>(BotStatus.IDLE);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Close terminal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && terminalRef.current && !terminalRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    // Use mousedown to detect the start of the click
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || status === BotStatus.THINKING) return;

    const userMsg: TerminalMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setStatus(BotStatus.THINKING);

    const responseText = await sendMessageToGemini(userMsg.text, messages);

    const aiMsg: TerminalMessage = {
      id: (Date.now() + 1).toString(),
      sender: 'ai',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMsg]);
    setStatus(BotStatus.IDLE);
  };

  return (
    <AnimatePresence mode="wait">
      {!isOpen ? (
        <motion.button
          key="open-btn"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-black/80 border border-[#00ff41] text-[#00ff41] p-4 rounded-full shadow-[0_0_15px_rgba(0,255,65,0.5)]"
        >
          <TerminalIcon size={24} />
        </motion.button>
      ) : (
        <motion.div 
          key="terminal-window"
          initial={{ opacity: 0, y: 100, scale: 0.8, transformOrigin: "bottom right" }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.8 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          ref={terminalRef}
          className="fixed bottom-6 right-6 z-50 w-[90vw] md:w-[450px] h-[500px] bg-black/95 border border-[#00ff41] rounded-lg shadow-[0_0_30px_rgba(0,255,65,0.3)] flex flex-col overflow-hidden font-mono text-sm"
        >
          {/* Header */}
          <div className="bg-[#00ff41]/20 border-b border-[#00ff41] p-2 flex justify-between items-center backdrop-blur-sm">
            <div className="flex items-center gap-2 text-[#00ff41]">
              <TerminalIcon size={16} />
              <span className="font-bold tracking-wider">FOCUSSDEV_TERMINAL_V1.0</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-[#00ff41] hover:text-white transition-colors"
            >
              <Minimize2 size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[#00ff41] scrollbar-track-black">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className={`max-w-[85%] rounded p-2 border ${
                  msg.sender === 'user' 
                    ? 'border-[#ff00c1] text-[#ff00c1] bg-[#ff00c1]/10' 
                    : msg.sender === 'system'
                      ? 'border-gray-500 text-gray-400 italic'
                      : 'border-[#00ff41] text-[#00ff41] bg-[#00ff41]/10'
                }`}>
                  <span className="text-[10px] opacity-70 mb-1 block uppercase">
                    {msg.sender === 'ai' ? 'Mainframe' : msg.sender} // {msg.timestamp.toLocaleTimeString()}
                  </span>
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
            {status === BotStatus.THINKING && (
              <div className="flex items-center gap-2 text-[#00ff41] animate-pulse">
                <span className="w-2 h-4 bg-[#00ff41]"></span>
                <span>PROCESSANDO DADOS...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-[#00ff41] bg-black flex gap-2">
            <span className="text-[#00ff41] py-2">{'>'}</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite um comando ou pergunta..."
              className="flex-1 bg-transparent border-none outline-none text-[#e0e0e0] font-mono placeholder-gray-600 focus:ring-0"
              autoFocus
            />
            <button 
              type="submit" 
              disabled={status === BotStatus.THINKING}
              className="text-[#00ff41] hover:text-white disabled:opacity-50 transition-colors"
            >
              <Send size={18} />
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Terminal;