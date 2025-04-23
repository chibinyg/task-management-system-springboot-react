package com.uco.se.task_management_backend.service;

import com.uco.se.task_management_backend.model.Task;
import com.uco.se.task_management_backend.model.User;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.time.format.DateTimeFormatter;

@Service
public class EmailService {
    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendTaskReminder(Task task) throws MessagingException {
        User user = task.getUser();
        if (user == null || user.getEmail() == null) {
            throw new IllegalArgumentException("Task has no valid user email");
        }

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        
        helper.setTo(user.getEmail());
        helper.setSubject("Reminder: " + task.getName() + " is Due Soon");
        
        String formattedDate = task.getDueDate().format(DateTimeFormatter.ISO_DATE);
        String htmlContent = String.format(
            "<h3>Task Reminder</h3>" +
            "<p><b>%s</b> is due on %s.</p>" +
            "<p>Category: %s</p>" +
            "<p>Description: %s</p>",
            task.getName(),
            formattedDate,
            task.getCategory().getName(),
            task.getDescription()
        );
        
        helper.setText(htmlContent, true);
        mailSender.send(message);
    }
}