package com.uco.se.task_management_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.uco.se.task_management_backend.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {}
 