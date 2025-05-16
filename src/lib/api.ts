
import axios from 'axios';

// Base API client
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 responses by logging out
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Waitlist related API calls
export const waitlistApi = {
  register: (email: string) => api.post('/waitlist', { email }),
  getCount: () => api.get('/waitlist/count'),
};

// User related API calls
export const userApi = {
  me: () => api.get('/me'),
  updateProfile: (data: any) => api.post('/me', data),
};

// Progress related API calls
export const progressApi = {
  get: () => api.get('/progress'),
  update: (data: any) => api.post('/progress', data),
};

// Auth related API calls
export const authApi = {
  login: (email: string, password: string) => 
    api.post('/auth/login', { email, password }),
  signup: (email: string, password: string, displayName?: string) => 
    api.post('/auth/signup', { email, password, displayName }),
  requestPasswordReset: (email: string) => 
    api.post('/auth/request-reset', { email }),
  resetPassword: (token: string, password: string) => 
    api.post('/auth/reset-password', { token, password }),
};
