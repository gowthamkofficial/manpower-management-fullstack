package com.official.manpower_management.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.official.manpower_management.model.dto.SessionRequestDto;
import com.official.manpower_management.model.response.ApiResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api")
public class SessionController {

    @PostMapping("/session/signin")
    public ResponseEntity<ApiResponse<?>> signIn(@RequestBody SessionRequestDto dto) {
        try {
            if (!"admin@gmail.com".equals(dto.getEmail())) {
                throw new RuntimeException("Invalid username");
            }

            if (!"12345678".equals(dto.getPassword())) {
                throw new RuntimeException("Invalid password");
            }

            ApiResponse<?> response = new ApiResponse<>(true, "Logged in successfully", null);
            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {
            ApiResponse<?> errorResponse = new ApiResponse<>(false, e.getMessage(), null);
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

}
