export enum Section {
  Chat = 'chat',
  Theology = 'teologia',
  Meanings = 'significados',
  Summaries = 'resumos',
  Devotional = 'devocional',
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  isStreaming?: boolean;
}

export interface SummaryResponse {
  contexto: string;
  revelacao: string;
  aplicacao: string;
}

export interface DevotionalResponse {
  titulo: string;
  versiculo: string;
  textoVersiculo: string;
  reflexao: string;
  oracao: string;
}
