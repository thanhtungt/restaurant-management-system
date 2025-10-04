import { AuthCredentials, User } from '../../../types/user';

// Mock users for demo purposes
const MOCK_USERS: User[] = [
  {
    id: '1',
    username: 'admin',
    name: 'Nguyễn Văn A',
    role: 'admin' as const,
    avatar: '/avatars/admin.jpg',
  },
  {
    id: '2',
    username: 'waiter',
    name: 'Trần Văn B',
    role: 'waiter' as const,
    avatar: '/avatars/waiter.jpg',
  },
];

// Mock authentication service
const authService = {
  login: async (credentials: AuthCredentials): Promise<{ user: User; token: string }> => {
    // In a real app, this would be an API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = MOCK_USERS.find(
          (u) => u.username.toLowerCase() === credentials.username.toLowerCase()
        );

        if (user && credentials.password === '123456') {
          // Mock successful login
          resolve({
            user,
            token: `mock-jwt-token-${user.id}-${Date.now()}`,
          });
        } else {
          // Mock login failure
          reject(new Error('Invalid username or password'));
        }
      }, 500); // Simulate network delay
    });
  },

  validateToken: async (token: string): Promise<boolean> => {
    // In a real app, this would validate the JWT with your backend
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simply check if the token exists for this mock implementation
        resolve(!!token);
      }, 100);
    });
  },
};

export default authService;