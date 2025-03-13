
package com.ilaydabag.service;

import com.ilaydabag.dto.CustomerDTO;
import com.ilaydabag.entity.Customer;
import com.ilaydabag.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomerService {
    
    private final CustomerRepository customerRepository;
    
    @Autowired
    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }
    
    public List<CustomerDTO> getAllCustomers() {
        return customerRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public CustomerDTO getCustomerById(Long id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Müşteri bulunamadı: " + id));
        return convertToDTO(customer);
    }
    
    public CustomerDTO getCustomerByPhone(String phone) {
        Customer customer = customerRepository.findByPhone(phone)
                .orElseThrow(() -> new RuntimeException("Telefon numarası ile müşteri bulunamadı: " + phone));
        return convertToDTO(customer);
    }
    
    public CustomerDTO createCustomer(CustomerDTO customerDTO) {
        if (customerRepository.existsByPhone(customerDTO.getPhone())) {
            throw new RuntimeException("Bu telefon numarası ile kayıtlı müşteri zaten var: " + customerDTO.getPhone());
        }
        
        Customer customer = new Customer();
        customer.setName(customerDTO.getName());
        customer.setPhone(customerDTO.getPhone());
        customer.setLastVisit(customerDTO.getLastVisit());
        customer.setNextAppointment(customerDTO.getNextAppointment());
        customer.setTreatments(customerDTO.getTreatments());
        
        Customer savedCustomer = customerRepository.save(customer);
        return convertToDTO(savedCustomer);
    }
    
    public CustomerDTO updateCustomer(Long id, CustomerDTO customerDTO) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Müşteri bulunamadı: " + id));
        
        // Telefon numarası değiştiyse ve bu telefon numarası başka bir müşteride varsa hata ver
        if (!customer.getPhone().equals(customerDTO.getPhone()) && 
                customerRepository.findByPhone(customerDTO.getPhone()).isPresent()) {
            throw new RuntimeException("Bu telefon numarası ile kayıtlı başka bir müşteri var: " + customerDTO.getPhone());
        }
        
        customer.setName(customerDTO.getName());
        customer.setPhone(customerDTO.getPhone());
        customer.setLastVisit(customerDTO.getLastVisit());
        customer.setNextAppointment(customerDTO.getNextAppointment());
        customer.setTreatments(customerDTO.getTreatments());
        
        Customer updatedCustomer = customerRepository.save(customer);
        return convertToDTO(updatedCustomer);
    }
    
    public void deleteCustomer(Long id) {
        customerRepository.deleteById(id);
    }
    
    private CustomerDTO convertToDTO(Customer customer) {
        CustomerDTO dto = new CustomerDTO();
        dto.setId(customer.getId());
        dto.setName(customer.getName());
        dto.setPhone(customer.getPhone());
        dto.setLastVisit(customer.getLastVisit());
        dto.setNextAppointment(customer.getNextAppointment());
        dto.setTreatments(customer.getTreatments());
        return dto;
    }
}
