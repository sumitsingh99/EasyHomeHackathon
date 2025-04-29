package com.payment.reminder.service;

import com.payment.reminder.dao.CustomerRepository;
import com.payment.reminder.exception.MessageNotSentException;
import com.payment.reminder.models.Payment;
import com.twilio.Twilio;
import com.twilio.exception.ApiException;
import com.twilio.rest.api.v2010.account.Message;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class WhatsAppService {

    private final CustomerRepository customerRepository;

    @Value("${twilio.account-sid:}")
    private String accountSid;

    @Value("${twilio.auth-token:}")
    private String authToken;

    @Value("${twilio.whatsapp-sender:}")
    private String whatsappSender;

    public WhatsAppService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
        // Initialize Twilio with credentials
        //Twilio.init(accountSid, authToken);
    }

    public void sendWhatsAppMessage(Payment payment) {

        try {
            String customerMobile = customerRepository.findMobileById(payment.getCustomerId());
            String customerWhatsAppNumber = "whatsapp:+" + customerMobile;

            String messageBody = String.format("Dear Customer, your payment of $%.2f is overdue. Please make the payment immediately.", payment.getAmount());

//            Message message = Message.creator(
//                    new com.twilio.type.PhoneNumber(customerWhatsAppNumber),
//                    new com.twilio.type.PhoneNumber(whatsappSender),
//                    messageBody
//            ).create();

            //System.out.println("WhatsApp message sent: " + message.getSid());

        } catch (final ApiException e) {
            throw new MessageNotSentException("Failed to send WhatsApp message", e);
        }
    }

}
