package com.payment.reminder.service;

import com.payment.reminder.dao.NotificationRepository;
import com.payment.reminder.dto.ResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class DashBoardService {
    private final NotificationRepository notificationRepository;

    public DashBoardService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }



    public ResponseDto<?> getAllNotifications(int page, int size) {
        LocalDateTime startOfDay = LocalDateTime.now().toLocalDate().atStartOfDay();
        Page<Object[]> notifications = notificationRepository.findNotificationsWithMobile(startOfDay, PageRequest.of(page, size));
        return new ResponseDto<>("sending notification ",notifications);

    }
}
