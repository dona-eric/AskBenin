import axios, { AxiosInstance } from 'axios';
import { QuestionRequest, RAGResponse, AudioRequestState } from "@/types/index";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';

class APIClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 60000,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  async chat(question: string, sessionId: string = 'default'): Promise<RAGResponse> {
    try {
      const request: QuestionRequest = { question, session_id: sessionId };
      const response = await this.client.post('/chat', request);
      return response.data as RAGResponse;
    } catch (error: any) {
      if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
        throw new Error('Le serveur AskBenin n\'est pas disponible.');
      }
      if (error.response?.status === 500) {
        throw new Error('Erreur interne du serveur.');
      }
      if (error.code === 'ECONNABORTED') {
        throw new Error('La requête a pris trop de temps.');
      }
      throw new Error('Une erreur inattendue est survenue.');
    }
  }

  async audioToText(audioFile: File): Promise<AudioRequestState> {
    try {
      const formData = new FormData();
      formData.append('file', audioFile);
      const response = await this.client.post('/chat/audio', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 120000,
      });
      return response.data as AudioRequestState;
    } catch {
      throw new Error('Erreur lors de la transcription audio.');
    }
  }

  async resetSession(sessionId: string): Promise<void> {
    try {
      await this.client.delete(`/session/${sessionId}`);
    } catch (error) {
      console.error('Reset session error:', error);
    }
  }

  async health(): Promise<boolean> {
    try {
      const response = await this.client.get('/');
      return response.status === 200;
    } catch {
      return false;
    }
  }
}

export const apiClient = new APIClient();
