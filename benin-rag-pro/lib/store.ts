import { create } from 'zustand';
import { Message, ChatState, AudioState, Conversation } from '@/types/index';

// Generate a unique session ID
const generateSessionId = (): string => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('askbenin_session_id');
    if (stored) return stored;
    const id = `session_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    localStorage.setItem('askbenin_session_id', id);
    return id;
  }
  return 'default';
};

const getInitialConversations = (): Conversation[] => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('askbenin_conversations');
    if (stored) return JSON.parse(stored);
  }
  return [];
};

const loadMessagesForSession = (sessionId: string): Message[] => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(`askbenin_messages_${sessionId}`);
    if (stored) return JSON.parse(stored);
  }
  return [];
};

// Chat Store
export const useChatStore = create<ChatState & {
  addMessage: (message: Message) => void;
  setMessages: (messages: Message[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error?: string) => void;
  clearMessages: () => void;
  newSession: () => void;
  loadSession: (sessionId: string) => void;
  deleteSession: (sessionId: string) => void;
}>((set, get) => {
  const initialSessionId = generateSessionId();
  return {
    conversations: getInitialConversations(),
    messages: loadMessagesForSession(initialSessionId),
    isLoading: false,
    sessionId: initialSessionId,
    error: undefined,

    addMessage: (message) => set((state) => {
      const newMessages = [...state.messages, message];
      
      // Update or create conversation
      let updatedConversations = [...state.conversations];
      const existingIdx = updatedConversations.findIndex(c => c.id === state.sessionId);
      
      if (existingIdx >= 0) {
        updatedConversations[existingIdx] = {
          ...updatedConversations[existingIdx],
          lastMessage: message.content,
          timestamp: message.timestamp,
          messageCount: newMessages.length,
        };
      } else {
        // Find title: usually the first user message
        const title = newMessages.find(m => m.role === 'user')?.content || message.content;
        updatedConversations.push({
          id: state.sessionId,
          title: title.slice(0, 40) + (title.length > 40 ? '...' : ''),
          lastMessage: message.content,
          timestamp: message.timestamp,
          messageCount: newMessages.length,
        });
      }
      
      // Sort conversations by timestamp desc
      updatedConversations.sort((a, b) => b.timestamp - a.timestamp);

      if (typeof window !== 'undefined') {
        localStorage.setItem(`askbenin_messages_${state.sessionId}`, JSON.stringify(newMessages));
        localStorage.setItem('askbenin_conversations', JSON.stringify(updatedConversations));
      }

      return { messages: newMessages, conversations: updatedConversations };
    }),

    setMessages: (messages) => set((state) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem(`askbenin_messages_${state.sessionId}`, JSON.stringify(messages));
      }
      return { messages };
    }),

    setLoading: (isLoading) => set({ isLoading }),

    setError: (error) => set({ error }),

    clearMessages: () => set((state) => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(`askbenin_messages_${state.sessionId}`);
      }
      return { messages: [], error: undefined };
    }),

    newSession: () => {
      const id = `session_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
      if (typeof window !== 'undefined') {
        localStorage.setItem('askbenin_session_id', id);
      }
      set({ messages: [], error: undefined, sessionId: id });
    },

    loadSession: (sessionId: string) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('askbenin_session_id', sessionId);
      }
      set({ 
        sessionId, 
        messages: loadMessagesForSession(sessionId),
        error: undefined
      });
    },

    deleteSession: (sessionId: string) => set((state) => {
      const updatedConversations = state.conversations.filter(c => c.id !== sessionId);
      if (typeof window !== 'undefined') {
        localStorage.setItem('askbenin_conversations', JSON.stringify(updatedConversations));
        localStorage.removeItem(`askbenin_messages_${sessionId}`);
      }
      // If we are deleting the active session, start a new one
      if (state.sessionId === sessionId) {
        const id = `session_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
        if (typeof window !== 'undefined') {
          localStorage.setItem('askbenin_session_id', id);
        }
        return { conversations: updatedConversations, messages: [], sessionId: id, error: undefined };
      }
      return { conversations: updatedConversations };
    }),
  };
});

// Audio Store
export const useAudioStore = create<AudioState & {
  setRecording: (recording: boolean) => void;
  setPlaying: (playing: boolean) => void;
  setTranscribing: (transcribing: boolean) => void;
  setAudioURL: (url?: string) => void;
  setTranscript: (transcript?: string) => void;
  setWaveformData: (data: number[]) => void;
  setError: (error?: string) => void;
  reset: () => void;
}>((set) => ({
  isRecording: false,
  isPlaying: false,
  isTranscribing: false,
  audioURL: undefined,
  transcript: undefined,
  waveformData: [],
  error: undefined,

  setRecording: (isRecording) => set({ isRecording }),
  setPlaying: (isPlaying) => set({ isPlaying }),
  setTranscribing: (isTranscribing) => set({ isTranscribing }),
  setAudioURL: (audioURL) => set({ audioURL }),
  setTranscript: (transcript) => set({ transcript }),
  setWaveformData: (waveformData) => set({ waveformData }),
  setError: (error) => set({ error }),
  reset: () => set({
    isRecording: false, isPlaying: false, isTranscribing: false,
    audioURL: undefined, transcript: undefined, waveformData: [], error: undefined,
  }),
}));

// UI Store
export const useUIStore = create<{
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}>((set) => ({
  sidebarOpen: false,
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));
