
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String phone;
    
    @Column(name = "last_visit")
    private LocalDateTime lastVisit;
    
    @Column(name = "next_appointment")
    private LocalDateTime nextAppointment;
    
    @ElementCollection
    @CollectionTable(name = "customer_treatments", 
        joinColumns = @JoinColumn(name = "customer_id"))
    @Column(name = "treatment")
    private List<String> treatments;
    
    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    private List<Appointment> appointments;
}
