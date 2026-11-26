import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Student API
export const studentApi = {
  getAll: (page = 1, limit = 10) => api.get(`/students?page=${page}&limit=${limit}`),
  getById: (id) => api.get(`/students/${id}`),
  create: (data) => api.post('/students', data),
  update: (id, data) => api.put(`/students/${id}`, data),
  delete: (id) => api.delete(`/students/${id}`),
  searchByClass: (studentClass, section) => api.get(`/students/search/by-class?class=${studentClass}&section=${section}`),
  searchByRollNumber: (rollNumber) => api.get(`/students/search/by-rollnumber/${rollNumber}`),
  addAttendance: (id, data) => api.post(`/students/${id}/attendance`, data),
  getAttendance: (id) => api.get(`/students/${id}/attendance`),
  addGrade: (id, data) => api.post(`/students/${id}/grades`, data),
  getGrades: (id) => api.get(`/students/${id}/grades`),
  getReportCard: (id) => api.get(`/students/${id}/report-card`),
  getClassStatistics: (studentClass, section) => api.get(`/students/analytics/class-statistics?class=${studentClass}&section=${section}`)
};

// User API
export const userApi = {
  register: (data) => api.post('/users/register', data),
  login: (email, password) => api.post('/users/login', { email, password }),
  getAll: () => api.get('/users'),
  getById: (id) => api.get(`/users/${id}`)
};

// Reports API
export const reportsApi = {
  attendanceReport: (studentClass, startDate, endDate) => 
    api.get(`/reports/attendance-report?class=${studentClass}&startDate=${startDate}&endDate=${endDate}`),
  academicReport: (studentClass) => api.get(`/reports/academic-report?class=${studentClass}`),
  dashboard: () => api.get('/reports/dashboard')
};

export default api;
