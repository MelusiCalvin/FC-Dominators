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
  getById: (id) => apiClient.get(`/players/${id}/`),
  create: (data) => apiClient.post('/players/', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  update: (id, data) => apiClient.put(`/players/${id}/`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  delete: (id) => apiClient.delete(`/players/${id}/`),
};

// Coaches API
export const coachesAPI = {
  getAll: () => apiClient.get('/coaches/'),
  getFeatured: () => apiClient.get('/coaches/featured/'),
  getById: (id) => apiClient.get(`/coaches/${id}/`),
  create: (data) => apiClient.post('/coaches/', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  update: (id, data) => apiClient.put(`/coaches/${id}/`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  delete: (id) => apiClient.delete(`/coaches/${id}/`),
};

// Club Info API
export const clubInfoAPI = {
  get: () => apiClient.get('/club-info/'),
  update: (id, data) => apiClient.put(`/club-info/${id}/`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
};

// Programs API
export const programsAPI = {
  getAll: () => apiClient.get('/programs/'),
  getById: (id) => apiClient.get(`/programs/${id}/`),
  create: (data) => apiClient.post('/programs/', data),
  update: (id, data) => apiClient.put(`/programs/${id}/`, data),
  delete: (id) => apiClient.delete(`/programs/${id}/`),
};

// Schedule API
export const scheduleAPI = {
  getAll: () => apiClient.get('/schedule-items/'),
  getFixtures: () => apiClient.get('/schedule-items/fixtures/'),
  getResults: () => apiClient.get('/schedule-items/results/'),
  getById: (id) => apiClient.get(`/schedule-items/${id}/`),
  create: (data) => apiClient.post('/schedule-items/', data),
  update: (id, data) => apiClient.put(`/schedule-items/${id}/`, data),
  delete: (id) => apiClient.delete(`/schedule-items/${id}/`),
};

// Testimonials API
export const testimonialsAPI = {
  getAll: () => apiClient.get('/testimonials/'),
  getById: (id) => apiClient.get(`/testimonials/${id}/`),
  create: (data) => apiClient.post('/testimonials/', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  update: (id, data) => apiClient.put(`/testimonials/${id}/`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  delete: (id) => apiClient.delete(`/testimonials/${id}/`),
};
