'use client';

import React, { useState, useRef, useEffect, lazy, Suspense } from 'react';
import { Send, Loader, ChevronDown } from 'lucide-react';
import { useChatStore } from '@lib/store';
import { apiClient } from '@lib/api';
import clsx from 'clsx';

const Markdown = lazy(() => import('react-markdown'));

const MODELS = [
  { id: 'mixtral-8x7b-32768', name: 'Mixtral 8x7B', provider: 'groq' },
  { id: 'qwen/qwen3-32b', name: 'Qwen 3 32B', provider: 'groq' },
  { id: 'gpt-oss-20b:free', name: 'GPT OSS 20B', provider: 'openrouter' },
];

export const ChatWindow: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedModel, setSelectedModel] = useState(MODELS[0]);
  const [showModelMenu, setShowModelMenu] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const {
    messages,
    isLoading,
    error,
    addMessage,
    setLoading,
    setError,
  } = useChatStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: inputValue,
      timestamp: Date.now(),
    };

    addMessage(userMessage);
    setInputValue('');
    setLoading(true);
    setError(undefined);

    try {
      const response = await apiClient.chat(inputValue, selectedModel.provider, selectedModel.id);
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant' as const,
        content: response.response,
        timestamp: Date.now(),
        source: response.sources?.[0],
      };
      addMessage(assistantMessage);
    } catch (err) {
      setError('Erreur lors de l\'envoi du message');
      console.error('Chat error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Model Selector Bar */}
      <div className="border-b border-gray-200 px-3 xs:px-4 sm:px-6 py-2">
        <div className="relative inline-block">
          <button
            onClick={() => setShowModelMenu(!showModelMenu)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <span className="text-gray-700">{selectedModel.name}</span>
            <ChevronDown size={16} className="text-gray-500" />
          </button>
          
          {showModelMenu && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[200px]">
              {MODELS.map((model) => (
                <button
                  key={model.id}
                  onClick={() => {
                    setSelectedModel(model);
                    setShowModelMenu(false);
                  }}
                  className={clsx(
                    'w-full text-left px-4 py-2.5 text-sm transition-colors',
                    selectedModel.id === model.id
                      ? 'bg-benin-500 text-white'
                      : 'text-gray-700 hover:bg-gray-50'
                  )}
                >
                  {model.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-500">
              <h3 className="text-2xl font-semibold mb-2 text-gray-700">AskBenin</h3>
              <p className="mb-6">Explorez la culture, les traditions et le patrimoine béninois</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
                {['Qui est le fondateur du Bénin?', 'Traditions béninoises', 'Histoire du Bénin', 'Places touristiques'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => {
                      setInputValue(suggestion);
                      document.querySelector('form')?.dispatchEvent(new Event('submit', { bubbles: true }));
                    }}
                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto w-full">
            {messages.map((message) => (
              <div key={message.id} className={clsx('py-4 xs:py-6 sm:py-8 px-3 xs:px-4 sm:px-8 border-b border-gray-100')} style={{ backgroundColor: message.role === 'user' ? 'white' : '#f7f7f8' }}>
                <div className="max-w-3xl mx-auto">
                  <div className={clsx('flex gap-3 xs:gap-4', message.role === 'user' ? 'justify-end' : 'justify-start')}>
                    <div className={clsx('flex gap-3 max-w-xl xs:max-w-2xl', message.role === 'user' && 'flex-row-reverse')}>
                      {message.role === 'assistant' && (
                        <div className="w-6 xs:w-8 h-6 xs:h-8 rounded-full bg-gradient-benin flex items-center justify-center flex-shrink-0 text-white text-xs xs:text-sm font-bold">
                          A
                        </div>
                      )}
                      <div className={clsx('prose prose-sm max-w-none break-words', message.role === 'user' && 'text-right')}>
                        <Suspense fallback={<span className="text-sm">Chargement...</span>}>
                          <Markdown>{message.content}</Markdown>
                        </Suspense>
                      </div>
                    </div>
                  </div>
                  {message.source && (
                    <p className="text-xs text-gray-500 mt-2">Source: {message.source}</p>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="py-4 xs:py-6 sm:py-8 px-3 xs:px-4 sm:px-8 border-b border-gray-100" style={{ backgroundColor: '#f7f7f8' }}>
                <div className="max-w-3xl mx-auto flex gap-3">
                  <div className="w-6 xs:w-8 h-6 xs:h-8 rounded-full bg-gradient-benin flex items-center justify-center flex-shrink-0">
                    <Loader size={16} className="animate-spin text-white" />
                  </div>
                  <span className="text-sm text-gray-600">AskBenin réfléchit...</span>
                </div>
              </div>
            )}

            {error && (
              <div className="py-4 px-4 sm:px-8 max-w-3xl mx-auto">
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area - ChatGPT style */}
      <div className="border-t border-gray-200 p-3 xs:p-4 sm:p-6 bg-white">
        <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto">
          <div className="flex gap-2 xs:gap-3 items-end">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Écrivez votre message..."
              className="flex-1 px-3 xs:px-4 py-2.5 xs:py-3 text-sm xs:text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-benin-500 focus:border-transparent bg-white resize-none"
              disabled={isLoading}
              rows={1}
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className={clsx(
                'p-2 xs:p-2.5 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200',
                isLoading || !inputValue.trim()
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-benin-500 text-white hover:bg-benin-600 active:scale-95'
              )}
              title="Envoyer"
            >
              <Send size={16} className="xs:w-5 xs:h-5" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">AskBenin peut faire des erreurs. Vérifiez les réponses importantes.</p>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
