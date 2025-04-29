package com.payment.reminder.models;

import com.payment.reminder.enums.PaymentStatus;
import com.payment.reminder.enums.PaymentType;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
@Table(name = "payments")
public class Payment extends BaseModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private long id;

    @Column(name = "customer_id")
    private Long customerId;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_type")
    private PaymentType paymentType;

    @Column(name = "amount")
    private Double amount;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private PaymentStatus status;

    @Column(name = "due_date")
    private Date dueDate;

    @Column(name = "description")
    private String description;

    @Column(name = "txn_id")
    private String txnId;
}
