
package com.ilaydabag.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class AppointmentDTO {
    
    private Long id;
    
    @NotNull(message = "Müşteri ID zorunludur")
    private Long customerId;
    
    @NotNull(message = "Randevu tarihi zorunludur")
    private LocalDateTime appointmentDate;
    
    private List<String> services;
    
    @NotNull(message = "Durum zorunludur")
    private String status;
    
    private String notes;
}
