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
import com.uco.se.task_management_backend.model.User;
import com.uco.se.task_management_backend.repository.CategoryRepository;
import com.uco.se.task_management_backend.security.SecurityUtils;

@RestController
@CrossOrigin("*")
public class CategoryController {
    
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private SecurityUtils securityUtils;

    @PostMapping("/categories")
    public Category createCategory(@RequestBody Category newCategory) {
        User currentUser = securityUtils.getCurrentUser();
        newCategory.setUser(currentUser);
        return categoryRepository.save(newCategory);
    }

    @GetMapping("/categories")
    public List<Category> getAllCategories() {
        User currentUser = securityUtils.getCurrentUser();
        return categoryRepository.findByUser(currentUser);
    }

    @GetMapping("/categories/{id}")
    public Category getCategoryById(@PathVariable Long id) {
        User currentUser = securityUtils.getCurrentUser();
        return categoryRepository.findByIdAndUser(id, currentUser)
            .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));
    }

    @PutMapping("/categories/{id}")
    public Category updateCategory(@PathVariable Long id, @RequestBody Category updatedCategory) {
        User currentUser = securityUtils.getCurrentUser();
        Category category = categoryRepository.findByIdAndUser(id, currentUser)
            .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));
        category.setName(updatedCategory.getName());
        return categoryRepository.save(category);
    }

    @DeleteMapping("/categories/{id}")
    public String deleteCategory(@PathVariable Long id) {
        User currentUser = securityUtils.getCurrentUser();
        Category category = categoryRepository.findByIdAndUser(id, currentUser)
            .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));
        categoryRepository.delete(category);
        return "Category deleted successfully!";
    }
}
