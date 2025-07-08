package com.official.manpower_management.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.official.manpower_management.model.dto.DepartmentDto;
import com.official.manpower_management.model.response.ApiResponse;
import com.official.manpower_management.model.response.PaginatedResponse;

public interface DepartmentService {

    public ApiResponse<PaginatedResponse<List<DepartmentDto>>> getAllDepartment(Pageable pageable);

    public ApiResponse<DepartmentDto> createDepartment(DepartmentDto dto);

    public ApiResponse<DepartmentDto> updateDepartment(Long id, DepartmentDto dto);

    public ApiResponse<DepartmentDto> getDepartmentById(Long id);

    public ApiResponse<DepartmentDto> updateStatus(Long id, int status);

}
