package com.official.manpower_management.controller;

import org.springframework.web.bind.annotation.RequestMapping;

import com.official.manpower_management.model.dto.EmployeeDto;
import com.official.manpower_management.model.response.ApiResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RequestMapping("/api/employee")
public interface EmployeeController {

    @PostMapping("/")
    public ApiResponse<EmployeeDto> createEmployee(@RequestBody EmployeeDto dto);

}
