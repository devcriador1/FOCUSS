
export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  details: string;
  features: string[];
  techStack: string[];
  icon: 'code' | 'paint' | 'search' | 'smartphone' | 'shield' | 'cloud';
}

export interface TerminalMessage {
  id: string;
  sender: 'user' | 'system' | 'ai';
  text: string;
  timestamp: Date;
}

export enum BotStatus {
  IDLE = 'IDLE',
  THINKING = 'THINKING',
  TYPING = 'TYPING',
  ERROR = 'ERROR'
}
