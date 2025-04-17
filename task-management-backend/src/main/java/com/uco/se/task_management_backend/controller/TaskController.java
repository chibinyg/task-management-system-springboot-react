package com.uco.se.task_management_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RestController;

import com.uco.se.task_management_backend.exception.ResourceNotFoundException;
import com.uco.se.task_management_backend.model.Category;
import com.uco.se.task_management_backend.model.Task;
import com.uco.se.task_management_backend.model.User;
import com.uco.se.task_management_backend.repository.CategoryRepository;
import com.uco.se.task_management_backend.repository.TaskRepository;
import com.uco.se.task_management_backend.security.SecurityUtils;

@RestController
@CrossOrigin("*")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private SecurityUtils securityUtils;

    // Create a new task for a specific category
    @PostMapping("/categories/{categoryId}/tasks")
    public Task createTask(@PathVariable Long categoryId, @RequestBody Task newTask) {
        // Get the current user
        User currentUser = securityUtils.getCurrentUser();
        // Find the category by ID and user
        Category category = categoryRepository.findByIdAndUser(categoryId, currentUser)
            .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + categoryId));
        // Set the category for the new task
        newTask.setCategory(category);
        // Set the user for the new task
        newTask.setUser(currentUser);
        // Save the new task
        return taskRepository.save(newTask);
    }

    @GetMapping("/tasks")
    public List<Task> getAllTasks() {
        // Get the current user
        User currentUser = securityUtils.getCurrentUser();
        // Find all tasks for the current user
        return taskRepository.findByUser(currentUser);
    }

    @GetMapping("/tasks/{id}")
    public Task getTaskById(@PathVariable Long id) {
        // Get the current user
        User currentUser = securityUtils.getCurrentUser();
        // Find the task by ID and user
        return taskRepository.findByIdAndUser(id, currentUser)
            .orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + id));
    }

    @PutMapping("/tasks/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task updatedTask) {
        // Get the current user
        User currentUser = securityUtils.getCurrentUser();
        Task task = taskRepository.findByIdAndUser(id, currentUser)
            .orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + id));
        task.setName(updatedTask.getName());
        task.setDescription(updatedTask.getDescription());
        task.setDueDate(updatedTask.getDueDate());
        return taskRepository.save(task);
    }

    @DeleteMapping("/tasks/{id}")
    public String deleteTask(@PathVariable Long id) {
        // Get the current user
        User currentUser = securityUtils.getCurrentUser();
        Task task = taskRepository.findByIdAndUser(id, currentUser)
            .orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + id));
        taskRepository.delete(task);
        return "Task deleted successfully!";
    }

    @PutMapping("/add-reminder/{id}")
    public Task addReminder(@PathVariable Long id, @RequestBody Task addedReminder) {
        // Get the current user
        User currentUser = securityUtils.getCurrentUser();
        Task task = taskRepository.findByIdAndUser(id, currentUser)
            .orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + id));
        if (addedReminder.getReminderInterval() != null) {
            task.setReminderInterval(addedReminder.getReminderInterval());
        }    
        if (addedReminder.getReminderDate() != null) {
            task.setReminderDate(addedReminder.getReminderDate());
        }
        return taskRepository.save(task);
    }

    @DeleteMapping("/delete-reminder/{id}")
    public Task deleteReminder(@PathVariable Long id) {
    // Get the current user
    User currentUser = securityUtils.getCurrentUser();
    Task task = taskRepository.findByIdAndUser(id, currentUser)
        .orElseThrow(() -> new ResourceNotFoundException("Task not found"));
    task.setReminderDate(null);
    task.setReminderInterval(null);
    return taskRepository.save(task);
    }
}
