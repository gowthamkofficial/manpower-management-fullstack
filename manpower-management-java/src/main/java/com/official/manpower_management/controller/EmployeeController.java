package com.official.manpower_management.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.official.manpower_management.model.dto.EmployeeDto;
import com.official.manpower_management.model.response.ApiResponse;
import com.official.manpower_management.model.response.PaginatedResponse;

@RestController
@RequestMapping("/api/employee")
public interface EmployeeController {

    @GetMapping("/")
    public ApiResponse<PaginatedResponse<List<EmployeeDto>>> getAllEmployee(
            @RequestParam(defaultValue = "0") int offset,
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(defaultValue = "") String sortBy,
            @RequestParam(defaultValue = "") String sortDirection);

}
