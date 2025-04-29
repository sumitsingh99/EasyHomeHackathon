package com.payment.reminder.dao;

import com.payment.reminder.models.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    Notification findTopByPaymentIdOrderBySuccessOnDesc(long paymentId);

    @Query("SELECT n, c.mobile FROM Notification n JOIN Customer c ON n.customerId = c.id " +
            "WHERE n.createdAt >= :startOfDay ")
    Page<Object[]> findNotificationsWithMobile(LocalDateTime startOfDay, PageRequest of);

}