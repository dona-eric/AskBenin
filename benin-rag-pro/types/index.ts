export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  sources?: string[];
  domaine?: string;
  langue?: string;
}

export interface ChatState {
  conversations: Conversation[];
  messages: Message[];
  isLoading: boolean;
  sessionId: string;
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

// Matches the backend QuestionRequest schema
export interface QuestionRequest {
  question: string;
  session_id: string;
}

// Matches the backend RAG agent response
export interface RAGResponse {
  answer: string;
  domaine: string;
  langue: string;
  sources: string[];
}

export interface AudioRequestState {
  response: string;
}

export interface BeninCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}

export interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: number;
  messageCount: number;
}
