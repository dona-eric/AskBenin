import axios, { AxiosInstance } from 'axios';
import { RequestState, AudioRequestState, RAGResponse } from "@/types/index";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

class APIClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Envoyer une question texte au RAG
   */
  async chat(query: string, provider: string = 'groq', modelName: string = 'mixtral-8x7b-32768'): Promise<RAGResponse> {
    try {
      const request: RequestState = {
        messages: query,
        provider,
        model_name: modelName,
      };
      
      const response = await this.client.post('/chat', request);
      return response.data as RAGResponse;
    } catch (error) {
      console.error('Chat error:', error);
      throw error;
    }
  }

  /**
   * Envoyer un fichier audio pour transcription et RAG
   */
  async audioToText(audioFile: File, provider: string = 'groq', modelName: string = 'whisper-large-v3'): Promise<AudioRequestState> {
    try {
      const formData = new FormData();
      formData.append('file', audioFile);

      const response = await this.client.post('/chat/audio', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data as AudioRequestState;
    } catch (error) {
      console.error('Audio transcription error:', error);
      throw error;
    }
  }

  /**
   * Vérifier la santé de l'API
   */
  async health(): Promise<boolean> {
    try {
      const response = await this.client.get('/');
      return response.status === 200;
    } catch (error) {
      console.error('Health check error:', error);
      return false;
    }
  }

  /**
   * Méthodegénérique pour les requêtes GET
   */
  async get<T>(endpoint: string): Promise<T> {
    const response = await this.client.get(endpoint);
    return response.data;
  }

  /**
   * Méthode générique pour les requêtes POST
   */
  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await this.client.post(endpoint, data);
    return response.data;
  }
}

export const apiClient = new APIClient();
