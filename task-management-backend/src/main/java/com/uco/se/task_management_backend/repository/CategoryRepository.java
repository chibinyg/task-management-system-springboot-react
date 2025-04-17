package com.uco.se.task_management_backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.uco.se.task_management_backend.model.Category;
import com.uco.se.task_management_backend.model.User;

public interface CategoryRepository extends JpaRepository<Category, Long> {
   
   List<Category> findByUser(User user);
   
   //find by id and user
   Optional<Category> findByIdAndUser(Long id, User user);

 
}
