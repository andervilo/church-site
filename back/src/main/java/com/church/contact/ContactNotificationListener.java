package com.church.contact;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.event.EventListener;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class ContactNotificationListener {

    private final JavaMailSender mailSender;

    @Value("${app.admin.email:}")
    private String adminEmail;

    @Async
    @EventListener
    public void onContactMessageCreated(ContactMessageCreatedEvent event) {
        if (adminEmail.isBlank()) {
            log.warn("E-mail do admin não configurado, notificação ignorada");
            return;
        }

        ContactMessage msg = event.getMessage();
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(adminEmail);
        mail.setSubject("Nova mensagem de contato: " + msg.getSubject());
        mail.setText(String.format(
                "De: %s (%s)\nTelefone: %s\n\n%s",
                msg.getName(), msg.getEmail(), msg.getPhone(), msg.getMessage()));

        try {
            mailSender.send(mail);
            log.info("Notificação enviada para {}", adminEmail);
        } catch (Exception e) {
            log.error("Erro ao enviar notificação: {}", e.getMessage());
        }
    }
}
