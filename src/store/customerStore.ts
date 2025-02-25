
import { create } from 'zustand';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface CustomerStore {
  customers: Customer[];
  addCustomer: (customer: Omit<Customer, 'id'>) => void;
  deleteCustomer: (id: string) => void;
}

export const useCustomerStore = create<CustomerStore>((set) => ({
  customers: [],
  addCustomer: (newCustomer) => 
    set((state) => ({
      customers: [...state.customers, { ...newCustomer, id: Math.random().toString(36).substr(2, 9) }]
    })),
  deleteCustomer: (id) =>
    set((state) => ({
      customers: state.customers.filter((customer) => customer.id !== id)
    })),
}));
