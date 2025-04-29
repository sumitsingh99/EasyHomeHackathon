package com.payment.reminder.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Generated;

import java.time.LocalDateTime;
import java.util.Date;

import static jakarta.persistence.GenerationType.IDENTITY;

@Data
public abstract class BaseModel {

    @Column(name = "created_at")
    private LocalDateTime createdAt;
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    void createDate(){
        if(createdAt == null){
            setCreatedAt(LocalDateTime.now());
        }
        setUpdatedAt(LocalDateTime.now());
    }

    @PreUpdate
    void updatedAt(){
        setUpdatedAt(LocalDateTime.now());
    }
}
