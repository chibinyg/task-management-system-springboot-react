// Controller used to test java mail API
// Go to http://localhost:8080/api/test/send-email in browser to test

package com.uco.se.task_management_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class TestController {

    @Autowired
    private JavaMailSender mailSender;

    @GetMapping("/send-email")
    public String testEmail() {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo("example@gmail.com");
            message.setSubject("Test Email from Spring Boot");
            message.setText("This is a test email sent from your application!");
            
            mailSender.send(message);
            return "Email sent successfully!";
        } catch (Exception e) {
            return "Failed to send email: " + e.getMessage();
        }
    }
}