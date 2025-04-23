package com.uco.se.task_management_backend.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.uco.se.task_management_backend.model.Task;
import com.uco.se.task_management_backend.model.User;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByUser(User user);

    Optional<Task> findByIdAndUser(Long id, User user);

    @Query("SELECT t FROM Task t WHERE t.reminderDate = :today AND t.user.email IS NOT NULL")
    List<Task> findTasksForReminder(@Param("today") LocalDate today);
}
 