package com.payment.reminder.dao;

import com.payment.reminder.models.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

    List<Payment> findByStatusAndDueDateBefore(String pending, Date yesterdayDate);
}