
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;
    
    @Column(name = "appointment_date")
    private LocalDateTime appointmentDate;
    
    @ElementCollection
    @CollectionTable(name = "appointment_services", 
        joinColumns = @JoinColumn(name = "appointment_id"))
    @Column(name = "service")
    private List<String> services;
    
    private String status; // SCHEDULED, COMPLETED, CANCELLED
    
    private String notes;
}
