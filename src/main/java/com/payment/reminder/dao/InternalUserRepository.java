package com.payment.reminder.dao;

import com.payment.reminder.models.InternalUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InternalUserRepository extends JpaRepository<InternalUser, Long> {

    Optional<InternalUser> findByUserName(String userName);
}
