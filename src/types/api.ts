
// API yanıt tipi
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

// Randevu tipleri
export interface AppointmentDTO {
  id?: number;
  customerId: number;
  appointmentDate: string; // ISO formatında datetime
  services: string[];
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
  notes?: string;
}

// Blog yazısı tipleri
export interface BlogPostDTO {
  id?: number;
  title: string;
  description: string;
  image?: string;
  category: string;
  author: string;
  createdDate?: string; // ISO formatında datetime
  tags?: string[];
}

// Müşteri tipleri
export interface CustomerDTO {
  id?: number;
  name: string;
  phone: string;
  lastVisit?: string; // ISO formatında datetime
  nextAppointment?: string; // ISO formatında datetime
  treatments: string[];
}

// Hizmet tipleri
export interface ServiceDTO {
  id?: number;
  name: string;
  description: string;
  price: number;
  duration: number; // dakika cinsinden
  category: string;
}
