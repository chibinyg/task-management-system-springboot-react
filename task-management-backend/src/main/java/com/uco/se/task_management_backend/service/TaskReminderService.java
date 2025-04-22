package com.uco.se.task_management_backend.service;

import com.uco.se.task_management_backend.model.Task;
import com.uco.se.task_management_backend.repository.TaskRepository;

import jakarta.transaction.Transactional;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class TaskReminderService {
    private final TaskRepository taskRepository;
    private final EmailService emailService;

    public TaskReminderService(TaskRepository taskRepository, 
                             EmailService emailService) {
        this.taskRepository = taskRepository;
        this.emailService = emailService;
    }

    // Runs daily at 9 AM using the reminderDate field
    @Transactional
    @Scheduled(cron = "0 47 22 * * ?")
    public void sendScheduledReminders() {
        LocalDate today = LocalDate.now();
        List<Task> tasks = taskRepository.findTasksForReminder(today);
        
        tasks.forEach(task -> {
            try {
                emailService.sendTaskReminder(task);
            } catch (Exception e) {
                // Log error but continue with other tasks
                System.err.printf("Failed to send reminder for task %d: %s%n", 
                    task.getId(), e.getMessage());
            }
        });
    }
}