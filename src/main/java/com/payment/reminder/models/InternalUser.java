package com.payment.reminder.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "internal_users")
@AllArgsConstructor
@NoArgsConstructor
public class InternalUser extends BaseModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private long id;
    @Column(name = "mobile")
    private String mobile;
    @Column(name = "user_name")
    private String userName;
    @Column(name = "password")
    private String password;
}
