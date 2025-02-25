
export interface Customer {
  id: number;
  name: string;
  phone: string;
  lastVisit: string;
  nextAppointment: string;
  treatments: string[];
}

export interface CustomerFormData {
  name: string;
  phone: string;
  treatments: string;
}
