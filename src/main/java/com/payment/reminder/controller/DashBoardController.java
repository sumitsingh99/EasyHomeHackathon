package com.payment.reminder.controller;

import com.payment.reminder.dao.NotificationRepository;
import com.payment.reminder.dto.ResponseDto;
import com.payment.reminder.service.DashBoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/v1/dashboard")
public class DashBoardController {

   private final DashBoardService dashBoardService;

    public DashBoardController(DashBoardService dashBoardService) {
        this.dashBoardService = dashBoardService;
    }

    @GetMapping("/notifications")
    public ResponseDto<?> getNotifications(@RequestParam int page, @RequestParam int size) {
        return dashBoardService.getAllNotifications(page, size);
    }
}



