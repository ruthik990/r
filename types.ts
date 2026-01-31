
export enum RiskLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export interface ContractRisk {
  clause: string;
  riskLevel: RiskLevel;
  description: string;
  simplifiedWarning: string;
}

export interface KeyDeadline {
  date: string;
  description: string;
}

export interface ContractAnalysis {
  title: string;
  summary: string;
  simpleExplanation: string;
  parties: string[];
  risks: ContractRisk[];
  deadlines: KeyDeadline[];
  keyObligations: string[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
