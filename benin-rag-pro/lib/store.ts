import { create } from 'zustand';
import { Message, ChatState, AudioState } from '@/types/index';

// Store pour le Chat
export const useChatStore = create<ChatState & {
  addMessage: (message: Message) => void;
  setMessages: (messages: Message[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error?: string) => void;
  clearMessages: () => void;
}>(
  (set) => ({
    messages: [],
    isLoading: false,
    error: undefined,
    
    addMessage: (message) =>
      set((state) => ({
        messages: [...state.messages, message],
      })),
    
    setMessages: (messages) =>
      set({ messages }),
    
    setLoading: (isLoading) =>
      set({ isLoading }),
    
    setError: (error) =>
      set({ error }),
    
    clearMessages: () =>
      set({ messages: [], error: undefined }),
  })
);

// Store pour l'Audio
export const useAudioStore = create<AudioState & {
  setRecording: (recording: boolean) => void;
  setPlaying: (playing: boolean) => void;
  setTranscribing: (transcribing: boolean) => void;
  setAudioURL: (url?: string) => void;
  setTranscript: (transcript?: string) => void;
  setWaveformData: (data: number[]) => void;
  setError: (error?: string) => void;
  reset: () => void;
}>(
  (set) => ({
    isRecording: false,
    isPlaying: false,
    isTranscribing: false,
    audioURL: undefined,
    transcript: undefined,
    waveformData: [],
    error: undefined,
    
    setRecording: (isRecording) =>
      set({ isRecording }),
    
    setPlaying: (isPlaying) =>
      set({ isPlaying }),
    
    setTranscribing: (isTranscribing) =>
      set({ isTranscribing }),
    
    setAudioURL: (audioURL) =>
      set({ audioURL }),
    
    setTranscript: (transcript) =>
      set({ transcript }),
    
    setWaveformData: (waveformData) =>
      set({ waveformData }),
    
    setError: (error) =>
      set({ error }),
    
    reset: () =>
      set({
        isRecording: false,
        isPlaying: false,
        isTranscribing: false,
        audioURL: undefined,
        transcript: undefined,
        waveformData: [],
        error: undefined,
      }),
  })
);

// Store UI
export const useUIStore = create<{
  sidebarOpen: boolean;
  darkMode: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleDarkMode: () => void;
}>(
  (set) => ({
    sidebarOpen: true,
    darkMode: false,
    
    setSidebarOpen: (sidebarOpen) =>
      set({ sidebarOpen }),
    
    toggleDarkMode: () =>
      set((state) => ({ darkMode: !state.darkMode })),
  })
);
