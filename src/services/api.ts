
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
    // Lovable platformunda doğrudan backend'e erişim olmadığı için mock veri kullanıyoruz
    return ''; // Boş URL, tüm istekler mock veri ile karşılanacak
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

// Local storage değerlerini getirme ve kaydetme yardımcı fonksiyonları
const getLocalStorageItem = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`LocalStorage ${key} okunurken hata:`, error);
    return defaultValue;
  }
};

const setLocalStorageItem = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`LocalStorage ${key} kaydedilirken hata:`, error);
  }
};

// Lovable platform önizlemesi için mock veri döndüren yardımcı fonksiyon
const useMockDataInPreview = <T>(storageKey: string, mockData: T): Promise<T | null> => {
  // Eğer uygulama preview modunda çalışıyorsa mock veriyi döndür
  if (window.location.hostname.includes('lovable.app')) {
    // Önce localStorage'dan veriyi almayı dene
    const storedData = getLocalStorageItem<T | null>(storageKey, null);
    // Eğer localStorage'da veri varsa onu kullan, yoksa varsayılan mock veriyi kullan
    return Promise.resolve(storedData !== null ? storedData : mockData);
  }
  // Aksi halde null döndür (gerçek API çağrısı yapılacak)
  return Promise.resolve(null);
};

// Mock verileri localStorage'a kaydeden yardımcı fonksiyon
const saveMockDataToStorage = <T>(storageKey: string, data: T): void => {
  if (window.location.hostname.includes('lovable.app')) {
    setLocalStorageItem(storageKey, data);
  }
};

// Randevu (Appointment) API servisleri
export const appointmentApi = {
  getAll: async () => {
    // Önizlemede kullanılacak mock randevu verileri
    const defaultAppointments: AppointmentDTO[] = [
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
    ];
    
    const mockAppointments = await useMockDataInPreview('appointments', defaultAppointments);
    
    if (mockAppointments) return mockAppointments;
    
    try {
      const response = await api.get<AppointmentDTO[]>('/Appointment');
      return response.data;
    } catch (error) {
      console.error('Appointments API error:', error);
      return defaultAppointments; // Hata durumunda varsayılan veriler
    }
  },
  getById: async (id: number) => {
    const mockAppointment = await useMockDataInPreview(`appointment_${id}`, {
      id,
      customerId: 1,
      appointmentDate: new Date().toISOString(),
      services: ["Saç Kesimi", "Saç Boyama"],
      status: "SCHEDULED"
    });
    
    if (mockAppointment) return mockAppointment;
    
    try {
      const response = await api.get<AppointmentDTO>(`/Appointment/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Appointment ${id} API error:`, error);
      throw error;
    }
  },
  create: async (appointment: Omit<AppointmentDTO, 'id'>) => {
    if (window.location.hostname.includes('lovable.app')) {
      // Mock veri oluşturma
      const allAppointments = getLocalStorageItem<AppointmentDTO[]>('appointments', []);
      const newId = allAppointments.length > 0 
        ? Math.max(...allAppointments.map(a => a.id || 0)) + 1 
        : 1;
        
      const newAppointment = {
        ...appointment,
        id: newId
      };
      
      // Yeni randevuyu listeye ekleyip localStorage'a kaydet
      const updatedAppointments = [...allAppointments, newAppointment];
      saveMockDataToStorage('appointments', updatedAppointments);
      
      return newAppointment;
    }
    
    try {
      console.log('Appointment data sent to API:', appointment);
      const response = await api.post<AppointmentDTO>('/Appointment', appointment);
      console.log('Appointment create API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Appointment create API error:', error);
      throw error;
    }
  },
  update: async (id: number, appointment: Omit<AppointmentDTO, 'id'>) => {
    if (window.location.hostname.includes('lovable.app')) {
      const allAppointments = getLocalStorageItem<AppointmentDTO[]>('appointments', []);
      const updatedAppointment = { ...appointment, id };
      
      // Randevuyu güncelle
      const updatedAppointments = allAppointments.map(a => 
        a.id === id ? updatedAppointment : a
      );
      
      saveMockDataToStorage('appointments', updatedAppointments);
      saveMockDataToStorage(`appointment_${id}`, updatedAppointment);
      
      return updatedAppointment;
    }
    
    try {
      const response = await api.put<AppointmentDTO>(`/Appointment/${id}`, appointment);
      return response.data;
    } catch (error) {
      console.error(`Appointment update API error:`, error);
      throw error;
    }
  },
  delete: async (id: number) => {
    if (window.location.hostname.includes('lovable.app')) {
      const allAppointments = getLocalStorageItem<AppointmentDTO[]>('appointments', []);
      const updatedAppointments = allAppointments.filter(a => a.id !== id);
      saveMockDataToStorage('appointments', updatedAppointments);
      localStorage.removeItem(`appointment_${id}`);
      return;
    }
    
    try {
      await api.delete(`/Appointment/${id}`);
    } catch (error) {
      console.error(`Appointment delete API error:`, error);
      throw error;
    }
  },
  deleteAll: async () => {
    if (window.location.hostname.includes('lovable.app')) {
      saveMockDataToStorage('appointments', []);
      return;
    }
    
    try {
      await api.delete('/Appointment');
    } catch (error) {
      console.error('Appointments deleteAll API error:', error);
      throw error;
    }
  },
};

// Blog yazısı (BlogPost) API servisleri
export const blogPostApi = {
  getAll: async () => {
    // Önizlemede kullanılacak mock blog verileri
    const defaultBlogPosts: BlogPostDTO[] = [
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
    ];
    
    const mockBlogPosts = await useMockDataInPreview('blogPosts', defaultBlogPosts);
    
    if (mockBlogPosts) return mockBlogPosts;
    
    try {
      const response = await api.get<BlogPostDTO[]>('/blogpost');
      return response.data;
    } catch (error) {
      console.error('Blog posts API error:', error);
      return defaultBlogPosts; // Hata durumunda varsayılan veriler
    }
  },
  getById: async (id: number) => {
    const mockBlogPost = await useMockDataInPreview(`blogPost_${id}`, {
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
    
    try {
      const response = await api.get<BlogPostDTO>(`/blogpost/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Blog post ${id} API error:`, error);
      throw error;
    }
  },
  create: async (blogPost: Omit<BlogPostDTO, 'id'>) => {
    if (window.location.hostname.includes('lovable.app')) {
      const allBlogPosts = getLocalStorageItem<BlogPostDTO[]>('blogPosts', []);
      const newId = allBlogPosts.length > 0 
        ? Math.max(...allBlogPosts.map(b => b.id || 0)) + 1 
        : 1;
        
      const newBlogPost = {
        ...blogPost,
        id: newId,
        createdDate: new Date().toISOString()
      };
      
      const updatedBlogPosts = [...allBlogPosts, newBlogPost];
      saveMockDataToStorage('blogPosts', updatedBlogPosts);
      
      return newBlogPost;
    }
    
    try {
      const response = await api.post<BlogPostDTO>('/blogpost', blogPost);
      return response.data;
    } catch (error) {
      console.error('Blog post create API error:', error);
      throw error;
    }
  },
  update: async (id: number, blogPost: Omit<BlogPostDTO, 'id'>) => {
    if (window.location.hostname.includes('lovable.app')) {
      const allBlogPosts = getLocalStorageItem<BlogPostDTO[]>('blogPosts', []);
      const updatedBlogPost = { ...blogPost, id };
      
      const updatedBlogPosts = allBlogPosts.map(b => 
        b.id === id ? updatedBlogPost : b
      );
      
      saveMockDataToStorage('blogPosts', updatedBlogPosts);
      saveMockDataToStorage(`blogPost_${id}`, updatedBlogPost);
      
      return updatedBlogPost;
    }
    
    try {
      const response = await api.put<BlogPostDTO>(`/blogpost/${id}`, blogPost);
      return response.data;
    } catch (error) {
      console.error(`Blog post update API error:`, error);
      throw error;
    }
  },
  delete: async (id: number) => {
    if (window.location.hostname.includes('lovable.app')) {
      const allBlogPosts = getLocalStorageItem<BlogPostDTO[]>('blogPosts', []);
      const updatedBlogPosts = allBlogPosts.filter(b => b.id !== id);
      saveMockDataToStorage('blogPosts', updatedBlogPosts);
      localStorage.removeItem(`blogPost_${id}`);
      return;
    }
    
    try {
      await api.delete(`/blogpost/${id}`);
    } catch (error) {
      console.error(`Blog post delete API error:`, error);
      throw error;
    }
  },
};

// Müşteri (Customer) API servisleri
export const customerApi = {
  getAll: async () => {
    // Önizlemede kullanılacak mock müşteri verileri
    const defaultCustomers: CustomerDTO[] = [
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
    ];
    
    const mockCustomers = await useMockDataInPreview('customers', defaultCustomers);
    
    if (mockCustomers) return mockCustomers;
    
    try {
      const response = await api.get<CustomerDTO[]>('/customers');
      return response.data;
    } catch (error) {
      console.error('Customers API error:', error);
      return defaultCustomers; // Hata durumunda varsayılan veriler
    }
  },
  getById: async (id: number) => {
    const mockCustomer = await useMockDataInPreview(`customer_${id}`, {
      id,
      name: "Ayşe Yılmaz",
      phone: "532-123-4567",
      lastVisit: new Date(Date.now() - 7 * 86400000).toISOString(),
      treatments: ["Saç Kesimi", "Saç Boyama"]
    });
    
    if (mockCustomer) return mockCustomer;
    
    try {
      const response = await api.get<CustomerDTO>(`/customers/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Customer ${id} API error:`, error);
      throw error;
    }
  },
  create: async (customer: Omit<CustomerDTO, 'id'>) => {
    if (window.location.hostname.includes('lovable.app')) {
      const allCustomers = getLocalStorageItem<CustomerDTO[]>('customers', []);
      const newId = allCustomers.length > 0 
        ? Math.max(...allCustomers.map(c => c.id || 0)) + 1 
        : 1;
        
      const newCustomer = {
        ...customer,
        id: newId
      };
      
      const updatedCustomers = [...allCustomers, newCustomer];
      saveMockDataToStorage('customers', updatedCustomers);
      
      return newCustomer;
    }
    
    try {
      console.log('Customer data sent to API:', customer);
      const response = await api.post<CustomerDTO>('/customers', customer);
      console.log('Customer create API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Customer create API error:', error);
      throw error;
    }
  },
  update: async (id: number, customer: Omit<CustomerDTO, 'id'>) => {
    if (window.location.hostname.includes('lovable.app')) {
      const allCustomers = getLocalStorageItem<CustomerDTO[]>('customers', []);
      const updatedCustomer = { ...customer, id };
      
      const updatedCustomers = allCustomers.map(c => 
        c.id === id ? updatedCustomer : c
      );
      
      saveMockDataToStorage('customers', updatedCustomers);
      saveMockDataToStorage(`customer_${id}`, updatedCustomer);
      
      return updatedCustomer;
    }
    
    try {
      const response = await api.put<CustomerDTO>(`/customers/${id}`, customer);
      return response.data;
    } catch (error) {
      console.error(`Customer update API error:`, error);
      throw error;
    }
  },
  delete: async (id: number) => {
    if (window.location.hostname.includes('lovable.app')) {
      const allCustomers = getLocalStorageItem<CustomerDTO[]>('customers', []);
      const updatedCustomers = allCustomers.filter(c => c.id !== id);
      saveMockDataToStorage('customers', updatedCustomers);
      localStorage.removeItem(`customer_${id}`);
      return;
    }
    
    try {
      await api.delete(`/customers/${id}`);
    } catch (error) {
      console.error(`Customer delete API error:`, error);
      throw error;
    }
  },
  deleteAll: async () => {
    if (window.location.hostname.includes('lovable.app')) {
      saveMockDataToStorage('customers', []);
      return;
    }
    
    try {
      await api.delete('/customers');
    } catch (error) {
      console.error('Customers deleteAll API error:', error);
      throw error;
    }
  },
};

// Hizmet (Service) API servisleri
export const serviceApi = {
  getAll: async () => {
    // Önizlemede kullanılacak mock hizmet verileri
    const defaultServices: ServiceDTO[] = [
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
    ];
    
    const mockServices = await useMockDataInPreview('services', defaultServices);
    
    if (mockServices) return mockServices;
    
    try {
      const response = await api.get<ServiceDTO[]>('/service');
      return response.data;
    } catch (error) {
      console.error('Services API error:', error);
      return defaultServices; // Hata durumunda varsayılan veriler
    }
  },
  getById: async (id: number) => {
    const mockService = await useMockDataInPreview(`service_${id}`, {
      id,
      name: "Saç Kesimi",
      description: "Kadın saç kesimi",
      price: 150,
      duration: 60,
      category: "Saç"
    });
    
    if (mockService) return mockService;
    
    try {
      const response = await api.get<ServiceDTO>(`/service/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Service ${id} API error:`, error);
      throw error;
    }
  },
  create: async (service: Omit<ServiceDTO, 'id'>) => {
    if (window.location.hostname.includes('lovable.app')) {
      const allServices = getLocalStorageItem<ServiceDTO[]>('services', []);
      const newId = allServices.length > 0 
        ? Math.max(...allServices.map(s => s.id || 0)) + 1 
        : 1;
        
      const newService = {
        ...service,
        id: newId
      };
      
      const updatedServices = [...allServices, newService];
      saveMockDataToStorage('services', updatedServices);
      
      return newService;
    }
    
    try {
      const response = await api.post<ServiceDTO>('/service', service);
      return response.data;
    } catch (error) {
      console.error('Service create API error:', error);
      throw error;
    }
  },
  update: async (id: number, service: Omit<ServiceDTO, 'id'>) => {
    if (window.location.hostname.includes('lovable.app')) {
      const allServices = getLocalStorageItem<ServiceDTO[]>('services', []);
      const updatedService = { ...service, id };
      
      const updatedServices = allServices.map(s => 
        s.id === id ? updatedService : s
      );
      
      saveMockDataToStorage('services', updatedServices);
      saveMockDataToStorage(`service_${id}`, updatedService);
      
      return updatedService;
    }
    
    try {
      const response = await api.put<ServiceDTO>(`/service/${id}`, service);
      return response.data;
    } catch (error) {
      console.error(`Service update API error:`, error);
      throw error;
    }
  },
  delete: async (id: number) => {
    if (window.location.hostname.includes('lovable.app')) {
      const allServices = getLocalStorageItem<ServiceDTO[]>('services', []);
      const updatedServices = allServices.filter(s => s.id !== id);
      saveMockDataToStorage('services', updatedServices);
      localStorage.removeItem(`service_${id}`);
      return;
    }
    
    try {
      await api.delete(`/service/${id}`);
    } catch (error) {
      console.error(`Service delete API error:`, error);
      throw error;
    }
  },
};

export default api;
