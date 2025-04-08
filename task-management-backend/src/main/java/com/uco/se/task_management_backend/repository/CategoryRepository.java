package com.uco.se.task_management_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.uco.se.task_management_backend.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {}
