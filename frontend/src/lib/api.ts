import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Players API
export const playersAPI = {
  getAll: () => apiClient.get('/players/'),
  getFeatured: () => apiClient.get('/players/featured/'),
  getById: (id: number) => apiClient.get(`/players/${id}/`),
  create: (data: any) => apiClient.post('/players/', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  update: (id: number, data: any) => apiClient.put(`/players/${id}/`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  delete: (id: number) => apiClient.delete(`/players/${id}/`),
};

// Coaches API
export const coachesAPI = {
  getAll: () => apiClient.get('/coaches/'),
  getFeatured: () => apiClient.get('/coaches/featured/'),
  getById: (id: number) => apiClient.get(`/coaches/${id}/`),
  create: (data: any) => apiClient.post('/coaches/', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  update: (id: number, data: any) => apiClient.put(`/coaches/${id}/`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  delete: (id: number) => apiClient.delete(`/coaches/${id}/`),
};

// Club Info API
export const clubInfoAPI = {
  get: () => apiClient.get('/club-info/'),
  update: (id: number, data: any) => apiClient.put(`/club-info/${id}/`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
};

// Programs API
export const programsAPI = {
  getAll: () => apiClient.get('/programs/'),
  getById: (id: number) => apiClient.get(`/programs/${id}/`),
  create: (data: any) => apiClient.post('/programs/', data),
  update: (id: number, data: any) => apiClient.put(`/programs/${id}/`, data),
  delete: (id: number) => apiClient.delete(`/programs/${id}/`),
};

// Testimonials API
export const testimonialsAPI = {
  getAll: () => apiClient.get('/testimonials/'),
  getById: (id: number) => apiClient.get(`/testimonials/${id}/`),
  create: (data: any) => apiClient.post('/testimonials/', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  update: (id: number, data: any) => apiClient.put(`/testimonials/${id}/`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  delete: (id: number) => apiClient.delete(`/testimonials/${id}/`),
};
