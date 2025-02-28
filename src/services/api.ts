
import axios from 'axios';
import { 
  AppointmentDTO, 
  BlogPostDTO, 
  CustomerDTO, 
  ServiceDTO 
} from '@/types/api';

// API'nin temel URL'si
// Gerçek uygulamada çalışırken veya geliştirme ortamında çalışırken farklı URL'ler kullanır
const getApiBaseUrl = () => {
  // Eğer uygulama preview modunda çalışıyorsa (Lovable platformu)
  if (window.location.hostname.includes('lovable.app')) {
    // Mock API veri kaynağı veya CORS destekleyen public API kullanabiliriz
    // NOT: Gerçek projede bu değer bir .env dosyasından gelmeli
    return 'https://jsonplaceholder.typicode.com';
  }
  // Yerel geliştirme için localhost
  return 'http://localhost:8080';
};

const API_BASE_URL = getApiBaseUrl();

// Axios instance oluşturma
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Lovable platform önizlemesi için mock veri döndüren yardımcı fonksiyon
const useMockDataInPreview = (mockData: any) => {
  // Eğer uygulama preview modunda çalışıyorsa mock veriyi döndür
  if (window.location.hostname.includes('lovable.app')) {
    return Promise.resolve(mockData);
  }
  // Aksi halde null döndür (gerçek API çağrısı yapılacak)
  return null;
};

// Randevu (Appointment) API servisleri
export const appointmentApi = {
  getAll: async () => {
    // Önizlemede kullanılacak mock randevu verileri
    const mockAppointments = useMockDataInPreview([
      {
        id: 1,
        customerId: 1,
        appointmentDate: new Date().toISOString(),
        services: ["Saç Kesimi", "Saç Boyama"],
        status: "SCHEDULED",
        notes: "İlk randevu"
      },
      {
        id: 2,
        customerId: 2,
        appointmentDate: new Date(Date.now() + 86400000).toISOString(), // Yarın
        services: ["Manikür", "Pedikür"],
        status: "SCHEDULED"
      }
    ]);
    
    if (mockAppointments) return mockAppointments;
    
    const response = await api.get<AppointmentDTO[]>('/Appointment');
    return response.data;
  },
  getById: async (id: number) => {
    const mockAppointment = useMockDataInPreview({
      id,
      customerId: 1,
      appointmentDate: new Date().toISOString(),
      services: ["Saç Kesimi", "Saç Boyama"],
      status: "SCHEDULED"
    });
    
    if (mockAppointment) return mockAppointment;
    
    const response = await api.get<AppointmentDTO>(`/Appointment/${id}`);
    return response.data;
  },
  create: async (appointment: Omit<AppointmentDTO, 'id'>) => {
    const mockCreatedAppointment = useMockDataInPreview({
      ...appointment,
      id: Math.floor(Math.random() * 1000)
    });
    
    if (mockCreatedAppointment) return mockCreatedAppointment;
    
    const response = await api.post<AppointmentDTO>('/Appointment', appointment);
    return response.data;
  },
  update: async (id: number, appointment: Omit<AppointmentDTO, 'id'>) => {
    const mockUpdatedAppointment = useMockDataInPreview({
      ...appointment,
      id
    });
    
    if (mockUpdatedAppointment) return mockUpdatedAppointment;
    
    const response = await api.put<AppointmentDTO>(`/Appointment/${id}`, appointment);
    return response.data;
  },
  delete: async (id: number) => {
    const mockResponse = useMockDataInPreview(null);
    if (mockResponse !== null) return;
    
    await api.delete(`/Appointment/${id}`);
  },
  deleteAll: async () => {
    const mockResponse = useMockDataInPreview(null);
    if (mockResponse !== null) return;
    
    await api.delete('/Appointment');
  },
};

// Blog yazısı (BlogPost) API servisleri
export const blogPostApi = {
  getAll: async () => {
    // Önizlemede kullanılacak mock blog verileri
    const mockBlogPosts = useMockDataInPreview([
      {
        id: 1,
        title: "Yaz Aylarında Saç Bakımı",
        description: "Yaz aylarında saç bakımı için ipuçları ve öneriler.",
        image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        category: "Saç Bakımı",
        author: "İlayda Bağ",
        createdDate: new Date().toISOString(),
        tags: ["Saç", "Yaz", "Bakım"]
      },
      {
        id: 2,
        title: "Doğal Cilt Bakım Rutini",
        description: "Doğal malzemelerle evde yapabileceğiniz cilt bakım rutini.",
        image: "https://images.unsplash.com/photo-1509725626857-bca15a67724c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        category: "Cilt Bakımı",
        author: "İlayda Bağ",
        createdDate: new Date().toISOString(),
        tags: ["Cilt", "Doğal", "Bakım"]
      }
    ]);
    
    if (mockBlogPosts) return mockBlogPosts;
    
    // Lovable önizlemesinde değilsek gerçek API'yi kullan
    const response = await api.get<BlogPostDTO[]>('/blogpost');
    return response.data;
  },
  getById: async (id: number) => {
    const mockBlogPost = useMockDataInPreview({
      id,
      title: "Yaz Aylarında Saç Bakımı",
      description: "Yaz aylarında saç bakımı için ipuçları ve öneriler.",
      image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      category: "Saç Bakımı",
      author: "İlayda Bağ",
      createdDate: new Date().toISOString(),
      tags: ["Saç", "Yaz", "Bakım"]
    });
    
    if (mockBlogPost) return mockBlogPost;
    
    const response = await api.get<BlogPostDTO>(`/blogpost/${id}`);
    return response.data;
  },
  create: async (blogPost: Omit<BlogPostDTO, 'id'>) => {
    const mockCreatedBlogPost = useMockDataInPreview({
      ...blogPost,
      id: Math.floor(Math.random() * 1000),
      createdDate: new Date().toISOString()
    });
    
    if (mockCreatedBlogPost) return mockCreatedBlogPost;
    
    const response = await api.post<BlogPostDTO>('/blogpost', blogPost);
    return response.data;
  },
  update: async (id: number, blogPost: Omit<BlogPostDTO, 'id'>) => {
    const mockUpdatedBlogPost = useMockDataInPreview({
      ...blogPost,
      id
    });
    
    if (mockUpdatedBlogPost) return mockUpdatedBlogPost;
    
    const response = await api.put<BlogPostDTO>(`/blogpost/${id}`, blogPost);
    return response.data;
  },
  delete: async (id: number) => {
    const mockResponse = useMockDataInPreview(null);
    if (mockResponse !== null) return;
    
    await api.delete(`/blogpost/${id}`);
  },
};

// Müşteri (Customer) API servisleri
export const customerApi = {
  getAll: async () => {
    // Önizlemede kullanılacak mock müşteri verileri
    const mockCustomers = useMockDataInPreview([
      {
        id: 1,
        name: "Ayşe Yılmaz",
        phone: "532-123-4567",
        lastVisit: new Date(Date.now() - 7 * 86400000).toISOString(), // 1 hafta önce
        nextAppointment: new Date(Date.now() + 2 * 86400000).toISOString(), // 2 gün sonra
        treatments: ["Saç Kesimi", "Saç Boyama"]
      },
      {
        id: 2,
        name: "Fatma Demir",
        phone: "505-987-6543",
        lastVisit: new Date(Date.now() - 14 * 86400000).toISOString(), // 2 hafta önce
        treatments: ["Manikür", "Pedikür"]
      }
    ]);
    
    if (mockCustomers) return mockCustomers;
    
    const response = await api.get<CustomerDTO[]>('/customers');
    return response.data;
  },
  getById: async (id: number) => {
    const mockCustomer = useMockDataInPreview({
      id,
      name: "Ayşe Yılmaz",
      phone: "532-123-4567",
      lastVisit: new Date(Date.now() - 7 * 86400000).toISOString(),
      treatments: ["Saç Kesimi", "Saç Boyama"]
    });
    
    if (mockCustomer) return mockCustomer;
    
    const response = await api.get<CustomerDTO>(`/customers/${id}`);
    return response.data;
  },
  create: async (customer: Omit<CustomerDTO, 'id'>) => {
    const mockCreatedCustomer = useMockDataInPreview({
      ...customer,
      id: Math.floor(Math.random() * 1000)
    });
    
    if (mockCreatedCustomer) return mockCreatedCustomer;
    
    const response = await api.post<CustomerDTO>('/customers', customer);
    return response.data;
  },
  update: async (id: number, customer: Omit<CustomerDTO, 'id'>) => {
    const mockUpdatedCustomer = useMockDataInPreview({
      ...customer,
      id
    });
    
    if (mockUpdatedCustomer) return mockUpdatedCustomer;
    
    const response = await api.put<CustomerDTO>(`/customers/${id}`, customer);
    return response.data;
  },
  delete: async (id: number) => {
    const mockResponse = useMockDataInPreview(null);
    if (mockResponse !== null) return;
    
    await api.delete(`/customers/${id}`);
  },
  deleteAll: async () => {
    const mockResponse = useMockDataInPreview(null);
    if (mockResponse !== null) return;
    
    await api.delete('/customers');
  },
};

// Hizmet (Service) API servisleri
export const serviceApi = {
  getAll: async () => {
    // Önizlemede kullanılacak mock hizmet verileri
    const mockServices = useMockDataInPreview([
      {
        id: 1,
        name: "Saç Kesimi",
        description: "Kadın saç kesimi",
        price: 150,
        duration: 60,
        category: "Saç"
      },
      {
        id: 2,
        name: "Saç Boyama",
        description: "Tek renk saç boyama",
        price: 300,
        duration: 90,
        category: "Saç"
      },
      {
        id: 3,
        name: "Manikür",
        description: "Klasik manikür",
        price: 120,
        duration: 45,
        category: "Tırnak"
      }
    ]);
    
    if (mockServices) return mockServices;
    
    const response = await api.get<ServiceDTO[]>('/service');
    return response.data;
  },
  getById: async (id: number) => {
    const mockService = useMockDataInPreview({
      id,
      name: "Saç Kesimi",
      description: "Kadın saç kesimi",
      price: 150,
      duration: 60,
      category: "Saç"
    });
    
    if (mockService) return mockService;
    
    const response = await api.get<ServiceDTO>(`/service/${id}`);
    return response.data;
  },
  create: async (service: Omit<ServiceDTO, 'id'>) => {
    const mockCreatedService = useMockDataInPreview({
      ...service,
      id: Math.floor(Math.random() * 1000)
    });
    
    if (mockCreatedService) return mockCreatedService;
    
    const response = await api.post<ServiceDTO>('/service', service);
    return response.data;
  },
  update: async (id: number, service: Omit<ServiceDTO, 'id'>) => {
    const mockUpdatedService = useMockDataInPreview({
      ...service,
      id
    });
    
    if (mockUpdatedService) return mockUpdatedService;
    
    const response = await api.put<ServiceDTO>(`/service/${id}`, service);
    return response.data;
  },
  delete: async (id: number) => {
    const mockResponse = useMockDataInPreview(null);
    if (mockResponse !== null) return;
    
    await api.delete(`/service/${id}`);
  },
};

export default api;
