package com.payment.reminder.scheduler;

import com.payment.reminder.enums.PaymentStatus;
import com.payment.reminder.models.Notification;
import com.payment.reminder.models.Payment;
import com.payment.reminder.dao.NotificationRepository;
import com.payment.reminder.dao.PaymentRepository;
import com.payment.reminder.service.WhatsAppService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

@Component
public class NotificationScheduler {

    private final PaymentRepository paymentRepository;
    private final NotificationRepository notificationRepository;
    private final WhatsAppService whatsAppService;

    public NotificationScheduler(PaymentRepository paymentRepository,
                                 NotificationRepository notificationRepository,
                                 WhatsAppService whatsAppService) {
        this.paymentRepository = paymentRepository;
        this.notificationRepository = notificationRepository;
        this.whatsAppService = whatsAppService;
    }

    @Scheduled(cron = "0 0 9 * * ?") // Runs every day at 9 AM
    public void sendPendingPaymentNotifications() {
        LocalDate yesterday = LocalDate.now().minusDays(1);
        Date yesterdayDate = Date.from(yesterday.atStartOfDay(ZoneId.systemDefault()).toInstant());

        // Fetch pending payments with due_date passed by 1 day
        List<Payment> pendingPayments = paymentRepository.findByStatusAndDueDateBefore(PaymentStatus.PENDING.name(), yesterdayDate);

        for (Payment payment : pendingPayments) {
            // Check notification history
            Notification lastNotification = notificationRepository.findTopByPaymentIdOrderBySuccessOnDesc(payment.getId());

            if (lastNotification == null || isMoreThanThreeDaysOld(lastNotification.getSuccessOn())) {
                whatsAppService.sendWhatsAppMessage(payment);

                Notification notification = new Notification();
                notification.setPaymentId(payment.getId());
                notification.setCustomerId(payment.getCustomerId());
                notification.setSuccessOn(new Date());
                notificationRepository.save(notification);
            }
        }
    }

    private boolean isMoreThanThreeDaysOld(Date sentDate) {
        LocalDate threeDaysAgo = LocalDate.now().minusDays(3);
        return sentDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate().isBefore(threeDaysAgo);
    }
}
