
package com.ilaydabag.repository;

import com.ilaydabag.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    
    Optional<Customer> findByPhone(String phone);
    
    boolean existsByPhone(String phone);
}
