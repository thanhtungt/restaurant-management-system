export interface User {
  id: string;
  name: string;
  role: 'admin' | 'staff';
  avatar?: string;
}