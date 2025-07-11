package com.official.manpower_management.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.official.manpower_management.model.dto.SessionRequestDto;
import com.official.manpower_management.model.response.ApiResponse;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/session")
public class SessionController {

    @PostMapping("/signin")
    public ApiResponse<?> signIn(@RequestBody SessionRequestDto dto) {
        String message = "";
        boolean status = false;
        if (dto.getEmail().equals("admin@gmail.com")) {
            if (dto.getPassword().equals("12345678")) {

                message = "Logged in successfully";
                status = true;
            } else {
                message = "Invalid password";
                status = false;

            }

        } else {
            message = "Invalid username";
            status = false;
        }

        return new ApiResponse<>(status, message, null);
    }

}
