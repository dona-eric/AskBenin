'use client';

import React, { useState, useRef, useEffect, lazy, Suspense } from 'react';
import { Send, Loader, MapPin, Landmark, Leaf, BookOpen, RotateCcw } from 'lucide-react';
import { useChatStore } from '@lib/store';
import { apiClient } from '@lib/api';

const Markdown = lazy(() => import('react-markdown'));

const SUGGESTIONS = [
  { icon: Landmark, label: 'Histoire', prompt: "Raconte-moi l'histoire du royaume d'Abomey" },
  { icon: Leaf, label: 'Agriculture', prompt: 'Quelles sont les principales cultures agricoles au Bénin ?' },
  { icon: MapPin, label: 'Tourisme', prompt: 'Quels sont les sites touristiques incontournables au Bénin ?' },
  { icon: BookOpen, label: 'Culture', prompt: 'Parle-moi des traditions Vodoun au Bénin' },
];

/* ─── Avatar ─── */
const Avatar = ({ role, loading = false }: { role: string; loading?: boolean }) => (
  <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center"
    style={{
      background: role === 'assistant'
        ? 'linear-gradient(135deg, #D4A017 0%, #065f46 100%)'
        : 'linear-gradient(135deg, #475569 0%, #64748b 100%)',
      boxShadow: role === 'assistant' ? '0 2px 10px rgba(212,160,23,0.25)' : 'none',
    }}
  >
    {loading
      ? <Loader size={14} className="text-white animate-spin" />
      : <span className="text-white text-xs font-bold font-display">
          {role === 'assistant' ? 'A' : 'U'}
        </span>
    }
  </div>
);

/* ─── Typing indicator ─── */
const TypingIndicator = () => (
  <div className="flex items-center gap-2 py-1">
    <div className="flex gap-1.5">
      {[0, 1, 2].map(i => (
        <div key={i} className="w-2 h-2 rounded-full bg-gold-500 animate-bounce-subtle"
          style={{ animationDelay: `${i * 0.15}s` }} />
      ))}
    </div>
    <span className="text-xs text-surface-500">AskBenin recherche…</span>
  </div>
);

/* ─── Welcome Screen ─── */
const WelcomeScreen = ({ onSend }: { onSend: (p: string) => void }) => (
  <div className="flex flex-col items-center justify-center h-full px-4 sm:px-6 text-center">
    {/* Logo */}
    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 relative"
      style={{ background: 'linear-gradient(135deg, #D4A017 0%, #065f46 100%)' }}
    >
      <div className="absolute inset-0 rounded-2xl animate-glow-pulse" />
    </div>

    <h1 className="text-2xl sm:text-3xl font-display font-bold text-surface-100 mb-2">
      AskBenin
    </h1>
    <p className="text-surface-400 text-sm sm:text-base max-w-md mb-8 leading-relaxed">
      Votre guide intelligent sur le Bénin — histoire, culture,
      économie, santé, tourisme et bien plus.
    </p>

    {/* Suggestions */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
      {SUGGESTIONS.map(({ icon: Icon, label, prompt }) => (
        <button
          key={prompt}
          onClick={() => onSend(prompt)}
          className="card-glass p-4 text-left group cursor-pointer hover:border-gold-500/30 transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #D4A017, #065f46)' }}
            >
              <Icon size={14} className="text-white" />
            </div>
            <span className="text-xs font-semibold text-gold-400/80 uppercase tracking-wider">
              {label}
            </span>
          </div>
          <span className="text-sm text-surface-300 leading-snug">{prompt}</span>
        </button>
      ))}
    </div>
  </div>
);

/* ─── Message ─── */
const MessageItem = ({ message }: { message: any }) => {
  const isUser = message.role === 'user';
  return (
    <div className="flex gap-4 sm:gap-6 px-4 sm:px-6 py-6 w-full max-w-4xl mx-auto group hover:bg-white/[0.02] transition-colors">
      <Avatar role={message.role} />
      <div className="flex-1 flex flex-col gap-2 min-w-0">
        <div className="text-sm sm:text-base leading-relaxed text-surface-200">
          {isUser ? (
            <div className="whitespace-pre-wrap">{message.content}</div>
          ) : (
            <div className="prose-dark max-w-none">
              <Suspense fallback={<span className="text-surface-500 text-sm">Chargement…</span>}>
                <Markdown>{message.content}</Markdown>
              </Suspense>
            </div>
          )}
        </div>
        {/* Sources */}
        {message.sources && message.sources.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {message.sources.map((src: string, i: number) => (
              <a key={i} href={src} target="_blank" rel="noreferrer"
                className="badge-green hover:bg-emerald-500/20 transition-colors"
              >
                <MapPin size={10} /> Source {i + 1}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/* ═══ ChatWindow ═══ */
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
      setError(err.message || "Erreur lors de l'envoi du message.");
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
    <div className="flex flex-col h-full bg-surface-950">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {messages.length === 0 ? (
          <WelcomeScreen onSend={sendPrompt} />
        ) : (
          <div className="max-w-3xl mx-auto w-full py-4">
            {messages.map(msg => (
              <div key={msg.id} className="animate-fade-in">
                <MessageItem message={msg} />
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-4 sm:gap-6 px-4 sm:px-6 py-6 w-full max-w-4xl mx-auto animate-fade-in">
                <Avatar role="assistant" loading />
                <div className="flex-1 min-w-0 pt-1">
                  <TypingIndicator />
                </div>
              </div>
            )}

            {error && (
              <div className="px-4 sm:px-6 py-2 animate-fade-in">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-accent-500/10 border border-accent-500/20">
                  <span className="text-accent-400 text-sm flex-1">{error}</span>
                  <button onClick={handleRetry} className="btn-ghost !text-accent-400 !p-2">
                    <RotateCcw size={14} />
                  </button>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

        {/* Input area */}
      <div className="bg-surface-950 px-3 sm:px-4 py-4 sm:py-6">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto relative">
          <div className="flex items-end gap-2 p-2 sm:p-3 rounded-2xl sm:rounded-3xl border border-white/[0.1] bg-surface-850/50 shadow-lg focus-within:border-gold-500/40 focus-within:bg-surface-850 transition-all duration-200">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="Posez votre question sur le Bénin…"
              disabled={isLoading}
              rows={1}
              className="flex-1 bg-transparent border-none outline-none text-sm sm:text-base text-surface-200 placeholder-surface-600 px-2 sm:px-3 py-1.5 resize-none overflow-hidden max-h-[200px]"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-200 disabled:opacity-30 mb-0.5 sm:mb-1"
              style={{
                background: isLoading || !inputValue.trim()
                  ? 'rgba(255,255,255,0.05)'
                  : 'linear-gradient(135deg, #D4A017, #ca8a04)',
                cursor: isLoading || !inputValue.trim() ? 'not-allowed' : 'pointer',
              }}
            >
              {isLoading
                ? <Loader size={16} className="text-surface-500 animate-spin" />
                : <Send size={16} className={inputValue.trim() ? 'text-surface-950' : 'text-surface-600'} />
              }
            </button>
          </div>
          <p className="text-center text-[10px] sm:text-xs text-surface-600 mt-2 sm:mt-3 px-4">
            AskBenin peut faire des erreurs. Vérifiez les informations importantes.
          </p>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;