import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { generateHairAdvice } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIConsultant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hello! I'm HairSphere AI, your personal trichologist. Whether you need a new routine, product ingredient advice, or help identifying your hair porosity, I'm here to help. How is your hair feeling today?",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const history = messages.map(m => ({ role: m.role, text: m.text }));
    const responseText = await generateHairAdvice(userMsg.text, history);

    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col bg-white rounded-3xl shadow-sm border border-peach-200 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-peach-100 bg-peach-50 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-peach-400 to-peach-600 flex items-center justify-center text-white">
          <Sparkles size={20} />
        </div>
        <div>
          <h2 className="font-bold text-gray-800">Hair Consultant</h2>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Online • Powered by Gemini
          </p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex items-start gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
          >
            <div className={`
              w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center
              ${msg.role === 'user' ? 'bg-gray-200 text-gray-600' : 'bg-peach-100 text-peach-600'}
            `}>
              {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            
            <div className={`
              p-4 rounded-2xl text-sm leading-relaxed
              ${msg.role === 'user' 
                ? 'bg-gray-800 text-white rounded-tr-none' 
                : 'bg-peach-50 text-gray-800 border border-peach-100 rounded-tl-none'}
            `}>
              {msg.text.split('\n').map((line, i) => (
                <p key={i} className={i > 0 ? 'mt-2' : ''}>{line}</p>
              ))}
              <span className={`text-[10px] mt-2 block opacity-60 ${msg.role === 'user' ? 'text-gray-300' : 'text-gray-400'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-peach-100 text-peach-600 flex items-center justify-center">
              <Bot size={16} />
            </div>
            <div className="bg-peach-50 p-4 rounded-2xl rounded-tl-none border border-peach-100 flex gap-1">
              <span className="w-2 h-2 bg-peach-400 rounded-full animate-bounce" style={{ animationDelay: '0ms'}}></span>
              <span className="w-2 h-2 bg-peach-400 rounded-full animate-bounce" style={{ animationDelay: '150ms'}}></span>
              <span className="w-2 h-2 bg-peach-400 rounded-full animate-bounce" style={{ animationDelay: '300ms'}}></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-peach-100">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask about routines, products, or hair problems..."
            className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-peach-400 focus:ring-2 focus:ring-peach-100 resize-none h-[52px]"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-2 p-2 bg-peach-500 text-white rounded-xl hover:bg-peach-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-center text-xs text-gray-400 mt-2">
          AI can make mistakes. Verify important hair care information.
        </p>
      </div>
    </div>
  );
};

export default AIConsultant;
