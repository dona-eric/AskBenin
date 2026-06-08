'use client';

import React, { useState, useRef, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Loader, 
  MapPin, 
  Landmark, 
  Leaf, 
  BookOpen, 
  RotateCcw, 
  Sparkles, 
  Bot, 
  User, 
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { useChatStore } from '@lib/store';
import { apiClient } from '@lib/api';

const Markdown = lazy(() => import('react-markdown'));

const SUGGESTIONS = [
  { icon: Landmark, label: 'Histoire', prompt: "Raconte-moi l'histoire du royaume d'Abomey", color: 'from-gold-500/20 to-gold-600/5' },
  { icon: Leaf, label: 'Agriculture', prompt: 'Quelles sont les principales cultures agricoles au Bénin ?', color: 'from-emerald-500/20 to-emerald-600/5' },
  { icon: MapPin, label: 'Tourisme', prompt: 'Quels sont les sites touristiques incontournables au Bénin ?', color: 'from-blue-500/20 to-blue-600/5' },
  { icon: BookOpen, label: 'Culture', prompt: 'Parle-moi des traditions Vodoun au Bénin', color: 'from-accent-500/20 to-accent-600/5' },
];

/* ─── Avatar Component ─── */
const Avatar = ({ role, loading = false }: { role: string; loading?: boolean }) => {
  const isAssistant = role === 'assistant';
  return (
    <div 
      className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center relative overflow-hidden shadow-lg border border-white/[0.08]"
      style={{
        boxShadow: isAssistant ? '0 0 15px rgba(212, 160, 23, 0.15)' : 'none',
      }}
    >
      {isAssistant ? (
        <div className="absolute inset-0 flex">
          {/* Green band on left */}
          <div className="w-[38%] h-full bg-[#059669]" />
          {/* Yellow and Red on right */}
          <div className="w-[62%] h-full flex flex-col">
            <div className="h-1/2 bg-[#D4A017]" />
            <div className="h-1/2 bg-[#E63946]" />
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-surface-700 via-surface-800 to-surface-900" />
      )}
      <div className="relative z-10 flex items-center justify-center w-full h-full bg-black/10">
        {loading ? (
          <Loader size={16} className="text-white animate-spin" />
        ) : (
          isAssistant ? (
            <Bot size={16} className="text-white" />
          ) : (
            <User size={16} className="text-gold-200" />
          )
        )}
      </div>
    </div>
  );
};

/* ─── Typing Indicator Component ─── */
const TypingIndicator = () => (
  <div className="flex items-center gap-3 py-1">
    <div className="flex gap-1.5">
      {[0, 1, 2].map(i => (
        <div 
          key={i} 
          className="w-2 h-2 rounded-full bg-gold-400 animate-bounce-subtle"
          style={{ animationDelay: `${i * 0.15}s` }} 
        />
      ))}
    </div>
    <span className="text-xs font-medium text-surface-500 tracking-wider">AskBenin formule sa réponse…</span>
  </div>
);

/* ─── Welcome Screen Component ─── */
const WelcomeScreen = ({ onSend }: { onSend: (p: string) => void }) => (
  <div className="flex flex-col items-center justify-center min-h-[75vh] px-4 sm:px-6 text-center py-10 max-w-4xl mx-auto">
    {/* Animated Badge */}
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-gold-500/10 border border-gold-500/25 text-yellow-300 mb-8"
    >
      <Sparkles size={12} className="text-gold-400 animate-pulse" />
      Intelligence Artificielle Béninoise (RAG)
    </motion.div>

    {/* Benin Flag Logo Card */}
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="w-24 h-15 rounded-2xl overflow-hidden flex shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-white/10 relative mb-8 hover:scale-105 transition-transform duration-300 cursor-pointer"
    >
      <div className="absolute inset-0 rounded-2xl animate-glow-pulse pointer-events-none" />
      <div className="w-[38%] h-full bg-[#059669]" />
      <div className="w-[62%] h-full flex flex-col">
        <div className="h-1/2 bg-[#D4A017]" />
        <div className="h-1/2 bg-[#E63946]" />
      </div>
    </motion.div>

    <motion.h1 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="text-3xl sm:text-5xl font-display font-black text-surface-100 tracking-tight mb-3"
    >
      Comment puis-je vous aider ?
    </motion.h1>
    
    <motion.p 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="text-surface-400 text-sm sm:text-base max-w-xl mb-12 leading-relaxed"
    >
      Je suis votre compagnon IA sur le Bénin. Posez-moi des questions sur son histoire,
      sa culture, sa gastronomie, ses opportunités économiques ou ses démarches administratives.
    </motion.p>

    {/* Suggestions Grid */}
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl px-2"
    >
      {SUGGESTIONS.map(({ icon: Icon, label, prompt, color }) => (
        <button
          key={prompt}
          onClick={() => onSend(prompt)}
          className={`p-5 rounded-2xl transition-all duration-300 bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl hover:bg-white/[0.05] hover:border-gold-500/35 hover:shadow-[0_8px_32px_rgba(0,0,0,0.35)] text-left group cursor-pointer relative overflow-hidden`}
        >
          {/* Subtle background color aura */}
          <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-gradient-to-br ${color} blur-2xl group-hover:scale-125 transition-transform duration-500`} />
          
          <div className="flex items-center gap-3 mb-2.5 relative z-10">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gold-500/10 border border-gold-500/20 group-hover:bg-gold-500/20 group-hover:scale-105 transition-all duration-300">
              <Icon size={14} className="text-gold-400" />
            </div>
            <span className="text-[10px] font-bold text-gold-400/80 uppercase tracking-widest">
              {label}
            </span>
          </div>
          <span className="text-xs sm:text-sm text-surface-300 leading-snug group-hover:text-surface-150 transition-colors relative z-10 block pr-6">
            {prompt}
          </span>
          <ArrowRight size={14} className="absolute right-5 bottom-5 text-gold-500/40 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
        </button>
      ))}
    </motion.div>
  </div>
);

/* ─── Message Item Component ─── */
const MessageItem = ({ message }: { message: any }) => {
  const isUser = message.role === 'user';
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`flex gap-4 sm:gap-5 px-4 sm:px-6 py-5 w-full max-w-4xl mx-auto ${
        isUser ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      <Avatar role={message.role} />
      
      {/* Speech bubble */}
      <div 
        className={`flex-1 max-w-[82%] sm:max-w-[80%] rounded-2xl p-4 sm:p-5 relative shadow-lg ${
          isUser 
            ? 'bg-gold-500/10 border border-gold-500/20 rounded-tr-none text-yellow-100/90' 
            : 'bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl rounded-tl-none text-surface-200'
        }`}
      >
        {/* Subtle decorative glow for assistant responses */}
        {!isUser && (
          <div className="absolute top-0 left-0 w-1/4 h-[1px] bg-gradient-to-r from-emerald-500 via-yellow-500 to-transparent" />
        )}
        
        {/* Message content */}
        <div className="text-sm sm:text-base leading-relaxed break-words">
          {isUser ? (
            <div className="whitespace-pre-wrap font-medium">{message.content}</div>
          ) : (
            <div className="prose-dark max-w-none text-[15px] sm:text-base">
              <Suspense fallback={<span className="text-surface-500 text-sm flex items-center gap-2"><Loader size={12} className="animate-spin" /> Rendu du message…</span>}>
                <Markdown>{message.content}</Markdown>
              </Suspense>
            </div>
          )}
        </div>

        {/* Source References */}
        {!isUser && message.sources && message.sources.length > 0 && (
          <div className="mt-4 pt-3.5 border-t border-white/[0.05] flex flex-col gap-2">
            <span className="text-[10px] text-surface-500 uppercase tracking-widest font-bold flex items-center gap-1">
              <HelpCircle size={10} className="text-gold-500/70" />
              Sources & Références vérifiées :
            </span>
            <div className="flex flex-wrap gap-2">
              {message.sources.map((src: string, i: number) => {
                // Shorten URL or show domain for cleaner presentation
                let domain = 'Lien source';
                try {
                  domain = new URL(src).hostname.replace('www.', '');
                } catch(e) {}
                
                return (
                  <a 
                    key={i} 
                    href={src} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/35 transition-all duration-200 shadow-sm"
                  >
                    <MapPin size={10} className="text-emerald-500" />
                    <span>{domain} ({i + 1})</span>
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

/* ══─ ChatWindow Main Component ══─ */
export const ChatWindow = () => {
  const { messages, isLoading, sessionId, error, addMessage, setLoading, setError } = useChatStore();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

  useEffect(() => { scrollToBottom(); }, [messages, isLoading]);

  const sendPrompt = async (prompt: string) => {
    if (!prompt.trim() || isLoading) return;

    const content = prompt.trim();
    const userMsg = {
      id: Date.now().toString(),
      role: 'user' as const,
      content,
      timestamp: Date.now(),
    };
    addMessage(userMsg);
    setInputValue('');
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }
    setLoading(true);
    setError(undefined);

    try {
      const result = await apiClient.chat(content, sessionId);
      const assistantMsg = {
        id: (Date.now() + 1).toString(),
        role: 'assistant' as const,
        content: result.answer,
        timestamp: Date.now(),
        sources: result.sources,
        domaine: result.domaine,
        langue: result.langue,
      };
      addMessage(assistantMsg);
    } catch (err: any) {
      setError(err.message || "Impossible de joindre le serveur AskBenin. Vérifiez votre connexion.");
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendPrompt(inputValue);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendPrompt(inputValue);
  };

  const handleRetry = () => {
    if (messages.length > 0) {
      const lastUserMsg = [...messages].reverse().find(m => m.role === 'user');
      if (lastUserMsg) {
        setError(undefined);
        sendPrompt(lastUserMsg.content);
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-transparent">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {messages.length === 0 ? (
          <WelcomeScreen onSend={sendPrompt} />
        ) : (
          <div className="max-w-4xl mx-auto w-full py-6">
            <AnimatePresence initial={false}>
              {messages.map(msg => (
                <MessageItem key={msg.id} message={msg} />
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4 sm:gap-5 px-4 sm:px-6 py-5 w-full max-w-4xl mx-auto"
              >
                <Avatar role="assistant" loading />
                <div className="flex-1 max-w-[80%] bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl rounded-2xl rounded-tl-none px-5 py-4 shadow-md">
                  <TypingIndicator />
                </div>
              </motion.div>
            )}

            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-4 sm:px-6 py-3 w-full max-w-4xl mx-auto"
              >
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-accent-500/10 border border-accent-500/20 backdrop-blur-lg shadow-lg">
                  <span className="text-accent-400 text-sm font-medium flex-1">{error}</span>
                  <button 
                    onClick={handleRetry} 
                    className="inline-flex items-center justify-center gap-2 p-2 px-3 rounded-xl transition-all duration-200 bg-accent-500/20 text-accent-300 hover:bg-accent-500/30 font-semibold text-xs"
                  >
                    <RotateCcw size={12} className="animate-spin-slow" />
                    Réessayer
                  </button>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Premium Glassmorphic Input area */}
      <div className="px-4 py-5 sm:py-6 bg-gradient-to-t from-surface-950/90 via-surface-950/40 to-transparent backdrop-blur-md border-t border-white/[0.05]">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto relative">
          <div className="flex items-end gap-2.5 p-2.5 sm:p-3.5 rounded-3xl border border-white/[0.1] bg-surface-900/60 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] focus-within:border-gold-500/40 focus-within:shadow-[0_0_30px_rgba(212,160,23,0.12)] transition-all duration-300">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="Posez votre question sur le Bénin…"
              disabled={isLoading}
              rows={1}
              className="flex-1 bg-transparent border-none outline-none text-sm sm:text-base text-surface-200 placeholder-surface-600 px-3 py-1.5 resize-none overflow-hidden max-h-[160px] font-sans"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 disabled:opacity-20 mb-0.5"
              style={{
                background: isLoading || !inputValue.trim()
                  ? 'rgba(255, 255, 255, 0.03)'
                  : 'linear-gradient(135deg, #D4A017 0%, #ca8a04 100%)',
                boxShadow: isLoading || !inputValue.trim()
                  ? 'none'
                  : '0 4px 12px rgba(212, 160, 23, 0.2)',
                cursor: isLoading || !inputValue.trim() ? 'not-allowed' : 'pointer',
              }}
            >
              {isLoading ? (
                <Loader size={16} className="text-surface-500 animate-spin" />
              ) : (
                <Send size={16} className={inputValue.trim() ? 'text-surface-950' : 'text-surface-500'} />
              )}
            </button>
          </div>
          <p className="text-center text-[10px] text-surface-600 mt-2.5 tracking-wide">
            AskBenin est une IA expérimentale. Veuillez croiser les faits importants avec des sources officielles.
          </p>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;