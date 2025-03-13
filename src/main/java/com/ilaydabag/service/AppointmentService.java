
package com.ilaydabag.service;

import com.ilaydabag.dto.AppointmentDTO;
import com.ilaydabag.entity.Appointment;
import com.ilaydabag.entity.Customer;
import com.ilaydabag.repository.AppointmentRepository;
import com.ilaydabag.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AppointmentService {
    
    private final AppointmentRepository appointmentRepository;
    private final CustomerRepository customerRepository;
    
    @Autowired
    public AppointmentService(AppointmentRepository appointmentRepository, CustomerRepository customerRepository) {
        this.appointmentRepository = appointmentRepository;
        this.customerRepository = customerRepository;
    }
    
    public List<AppointmentDTO> getAllAppointments() {
        return appointmentRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public AppointmentDTO getAppointmentById(Long id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Randevu bulunamadı: " + id));
        return convertToDTO(appointment);
    }
    
    @Transactional
    public AppointmentDTO createAppointment(AppointmentDTO appointmentDTO) {
        Customer customer = customerRepository.findById(appointmentDTO.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Müşteri bulunamadı: " + appointmentDTO.getCustomerId()));
        
        Appointment appointment = new Appointment();
        appointment.setCustomer(customer);
        appointment.setAppointmentDate(appointmentDTO.getAppointmentDate());
        appointment.setServices(appointmentDTO.getServices());
        appointment.setStatus(appointmentDTO.getStatus());
        appointment.setNotes(appointmentDTO.getNotes());
        
        Appointment savedAppointment = appointmentRepository.save(appointment);
        
        // Müşteri kaydını güncelle
        customer.setNextAppointment(appointmentDTO.getAppointmentDate());
        customerRepository.save(customer);
        
        return convertToDTO(savedAppointment);
    }
    
    @Transactional
    public AppointmentDTO updateAppointment(Long id, AppointmentDTO appointmentDTO) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Randevu bulunamadı: " + id));
        
        Customer customer = customerRepository.findById(appointmentDTO.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Müşteri bulunamadı: " + appointmentDTO.getCustomerId()));
        
        appointment.setCustomer(customer);
        appointment.setAppointmentDate(appointmentDTO.getAppointmentDate());
        appointment.setServices(appointmentDTO.getServices());
        appointment.setStatus(appointmentDTO.getStatus());
        appointment.setNotes(appointmentDTO.getNotes());
        
        Appointment updatedAppointment = appointmentRepository.save(appointment);
        return convertToDTO(updatedAppointment);
    }
    
    public void deleteAppointment(Long id) {
        appointmentRepository.deleteById(id);
    }
    
    private AppointmentDTO convertToDTO(Appointment appointment) {
        AppointmentDTO dto = new AppointmentDTO();
        dto.setId(appointment.getId());
        dto.setCustomerId(appointment.getCustomer().getId());
        dto.setAppointmentDate(appointment.getAppointmentDate());
        dto.setServices(appointment.getServices());
        dto.setStatus(appointment.getStatus());
        dto.setNotes(appointment.getNotes());
        return dto;
    }
}
