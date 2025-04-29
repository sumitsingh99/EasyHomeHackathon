package com.payment.reminder.service;

import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    public void sendNotification(String message) {
        // Logic to send notification
        System.out.println("Notification sent: " + message);
    }

    public void sendEmail(String email, String subject, String body) {
        // Logic to send email
        System.out.println("Email sent to " + email + " with subject: " + subject);
    }

    public void sendSMS(String phoneNumber, String message) {
        // Logic to send SMS
        System.out.println("SMS sent to " + phoneNumber + ": " + message);
    }
}
