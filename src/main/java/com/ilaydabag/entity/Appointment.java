
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
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;
    
    @Column(name = "appointment_date", nullable = false)
    private LocalDateTime appointmentDate;
    
    @ElementCollection
    @CollectionTable(name = "appointment_services", 
        joinColumns = @JoinColumn(name = "appointment_id"))
    @Column(name = "service")
    private List<String> services;
    
    @Column(nullable = false)
    private String status; // SCHEDULED, COMPLETED, CANCELLED
    
    private String notes;
}
