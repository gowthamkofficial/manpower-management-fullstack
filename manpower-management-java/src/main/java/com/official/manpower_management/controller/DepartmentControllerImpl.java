package com.official.manpower_management.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.official.manpower_management.model.dto.DepartmentDto;
import com.official.manpower_management.model.response.ApiResponse;
import com.official.manpower_management.model.response.PaginatedResponse;
import com.official.manpower_management.service.DepartmentService;

@RestController
public class DepartmentControllerImpl implements DepartmentController {

    @Autowired
    private DepartmentService departmentService;

    @Override
    public ApiResponse<PaginatedResponse<List<DepartmentDto>>> getAllDepartments(
            @RequestParam(defaultValue = "0") int offset,
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(defaultValue = "departmentName") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDirection) {
        Sort sort = sortDirection.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(offset, limit, sort);

        return departmentService.getAllDepartment(pageable);
    }

    @Override
    public ApiResponse<DepartmentDto> getDepartmentById(Long id) {
        return departmentService.getDepartmentById(id);
    }

    @Override
    public ApiResponse<DepartmentDto> createDepartment(DepartmentDto dto) {
        return departmentService.createDepartment(dto);
    }

    @Override
    public ApiResponse<DepartmentDto> updateDepartment(Long id, DepartmentDto dto) {
        return departmentService.updateDepartment(id, dto);
    }

    @Override
    public ApiResponse<DepartmentDto> updateStatus(Long id, int status) {
        return departmentService.updateStatus(id, status);
    }
}
