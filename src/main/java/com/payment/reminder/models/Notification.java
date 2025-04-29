package com.payment.reminder.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
@Table(name = "notifications")
public class Notification extends BaseModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private long id;
    @Column(name = "customer_id")
    private Long customerId;

    @Column(name = "description")
    private String description;

    @Column(name = "status")
    private String status;

    @Column(name = "payment_id")
    private Long paymentId;

    @Column(name = "success_on")
    private Date successOn;
}
