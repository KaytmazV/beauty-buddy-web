
package com.ilaydabag.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class CustomerDTO {
    
    private Long id;
    
    @NotBlank(message = "İsim zorunludur")
    private String name;
    
    @NotBlank(message = "Telefon numarası zorunludur")
    private String phone;
    
    private LocalDateTime lastVisit;
    
    private LocalDateTime nextAppointment;
    
    private List<String> treatments;
}
