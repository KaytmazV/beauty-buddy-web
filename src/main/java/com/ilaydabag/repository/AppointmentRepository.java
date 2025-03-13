
package com.ilaydabag.repository;

import com.ilaydabag.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    
    List<Appointment> findByCustomerId(Long customerId);
    
    List<Appointment> findByAppointmentDateBetween(LocalDateTime start, LocalDateTime end);
    
    List<Appointment> findByStatus(String status);
}
