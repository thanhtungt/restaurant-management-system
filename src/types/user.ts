export interface User {
  id: string;
  username: string;
  name: string;
  role: 'admin' | 'waiter';
  avatar?: string;
}

export interface AuthCredentials {
  username: string;
  password: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}