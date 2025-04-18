package com.uco.se.task_management_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.uco.se.task_management_backend.model.User;
import com.uco.se.task_management_backend.repository.UserRepository;
import com.uco.se.task_management_backend.security.SecurityUtils;

@RestController
@CrossOrigin("*")
public class UserController {

    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SecurityUtils securityUtils;

    @GetMapping("/user")
    public User getUser() {
        return securityUtils.getCurrentUser();
    }

    @PutMapping("/user/update-user")
    public User updateUser(@RequestBody User updatedUser) {
        User currentUser = securityUtils.getCurrentUser();
        currentUser.setEmail(updatedUser.getEmail());
        return userRepository.save(currentUser); // should this function have this?
    }
}
