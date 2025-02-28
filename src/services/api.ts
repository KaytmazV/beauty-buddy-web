
import axios from 'axios';
import { 
  AppointmentDTO, 
  BlogPostDTO, 
  CustomerDTO, 
  ServiceDTO 
} from '@/types/api';

// API'nin temel URL'si - gerçek uygulamada bir .env dosyasından alınmalıdır
const API_BASE_URL = 'http://localhost:8080';

// Axios instance oluşturma
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Randevu (Appointment) API servisleri
export const appointmentApi = {
  getAll: async () => {
    const response = await api.get<AppointmentDTO[]>('/Appointment');
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get<AppointmentDTO>(`/Appointment/${id}`);
    return response.data;
  },
  create: async (appointment: Omit<AppointmentDTO, 'id'>) => {
    const response = await api.post<AppointmentDTO>('/Appointment', appointment);
    return response.data;
  },
  update: async (id: number, appointment: Omit<AppointmentDTO, 'id'>) => {
    const response = await api.put<AppointmentDTO>(`/Appointment/${id}`, appointment);
    return response.data;
  },
  delete: async (id: number) => {
    await api.delete(`/Appointment/${id}`);
  },
  deleteAll: async () => {
    await api.delete('/Appointment');
  },
};

// Blog yazısı (BlogPost) API servisleri
export const blogPostApi = {
  getAll: async () => {
    const response = await api.get<BlogPostDTO[]>('/blogpost');
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get<BlogPostDTO>(`/blogpost/${id}`);
    return response.data;
  },
  create: async (blogPost: Omit<BlogPostDTO, 'id'>) => {
    const response = await api.post<BlogPostDTO>('/blogpost', blogPost);
    return response.data;
  },
  update: async (id: number, blogPost: Omit<BlogPostDTO, 'id'>) => {
    const response = await api.put<BlogPostDTO>(`/blogpost/${id}`, blogPost);
    return response.data;
  },
  delete: async (id: number) => {
    await api.delete(`/blogpost/${id}`);
  },
};

// Müşteri (Customer) API servisleri
export const customerApi = {
  getAll: async () => {
    const response = await api.get<CustomerDTO[]>('/customers');
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get<CustomerDTO>(`/customers/${id}`);
    return response.data;
  },
  create: async (customer: Omit<CustomerDTO, 'id'>) => {
    const response = await api.post<CustomerDTO>('/customers', customer);
    return response.data;
  },
  update: async (id: number, customer: Omit<CustomerDTO, 'id'>) => {
    const response = await api.put<CustomerDTO>(`/customers/${id}`, customer);
    return response.data;
  },
  delete: async (id: number) => {
    await api.delete(`/customers/${id}`);
  },
  deleteAll: async () => {
    await api.delete('/customers');
  },
};

// Hizmet (Service) API servisleri
export const serviceApi = {
  getAll: async () => {
    const response = await api.get<ServiceDTO[]>('/service');
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get<ServiceDTO>(`/service/${id}`);
    return response.data;
  },
  create: async (service: Omit<ServiceDTO, 'id'>) => {
    const response = await api.post<ServiceDTO>('/service', service);
    return response.data;
  },
  update: async (id: number, service: Omit<ServiceDTO, 'id'>) => {
    const response = await api.put<ServiceDTO>(`/service/${id}`, service);
    return response.data;
  },
  delete: async (id: number) => {
    await api.delete(`/service/${id}`);
  },
};

export default api;
