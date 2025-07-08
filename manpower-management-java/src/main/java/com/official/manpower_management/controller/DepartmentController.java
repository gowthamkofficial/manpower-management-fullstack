package com.official.manpower_management.controller;

import com.official.manpower_management.model.dto.DepartmentDto;
import com.official.manpower_management.model.response.ApiResponse;
import com.official.manpower_management.model.response.PaginatedResponse;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/departments")
public interface DepartmentController {
    @GetMapping
    ApiResponse<PaginatedResponse<List<DepartmentDto>>> getAllDepartments(
            @RequestParam(defaultValue = "0") int offset,
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(defaultValue = "departmentName") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDirection);

    @GetMapping("/{id}")
    ApiResponse<DepartmentDto> getDepartmentById(@PathVariable Long id);

    @PostMapping
    ApiResponse<DepartmentDto> createDepartment(@RequestBody DepartmentDto dto);

    @PutMapping("/{id}")
    ApiResponse<DepartmentDto> updateDepartment(@PathVariable Long id, @RequestBody DepartmentDto dto);

    @PutMapping("/{id}/status")
    ApiResponse<DepartmentDto> updateStatus(@PathVariable Long id, @RequestParam int status);
}
