package com.payment.reminder.dao;

import com.payment.reminder.models.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    String findMobileById(Long customerId);
}
