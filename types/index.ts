export type AuthMethod = 'google' | 'github' | 'email' | 'apple' | 'facebook' | 'twitter' | 'other';

export interface Credential {
  id: string;
  type: 'apikey' | 'token' | 'password' | 'other';
  name: string;
  value: string;
  createdAt: number;
}

export interface ContextItem {
  id: string;
  type: 'url' | 'chat' | 'note';
  title: string;
  content: string;
  createdAt: number;
}

export interface Account {
  id: string;
  name: string; // e.g., "Personal", "Work", "Project X"
  email?: string;
  username?: string;
  password?: string;
  authMethod: AuthMethod;
  credentials: Credential[];
  contexts: ContextItem[];
  createdAt: number;
}

export interface AppItem {
  id: string;
  name: string;
  description?: string;
  url?: string;
  accounts: Account[];
  createdAt: number;
}
