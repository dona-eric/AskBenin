export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  source?: string;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error?: string;
}

export interface AudioState {
  isRecording: boolean;
  isPlaying: boolean;
  isTranscribing: boolean;
  audioURL?: string;
  transcript?: string;
  waveformData: number[];
  error?: string;
}

export interface RequestState {
  messages: string;
  provider: string;
  model_name: string;
}

export interface AudioRequestState {
  response: string;
}

export interface RAGResponse {
  response: string;
  sources?: string[];
  confidence?: number;
}

export interface BeninCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}
