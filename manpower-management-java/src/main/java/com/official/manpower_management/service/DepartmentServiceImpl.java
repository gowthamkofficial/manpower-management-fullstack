package com.official.manpower_management.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.official.manpower_management.entity.Department;
import com.official.manpower_management.model.dto.DepartmentDto;
import com.official.manpower_management.model.enums.DepartmentStatus;
import com.official.manpower_management.model.response.ApiResponse;
import com.official.manpower_management.model.response.PaginatedResponse;
import com.official.manpower_management.repository.DepartmentRepository;

@Service
public class DepartmentServiceImpl implements DepartmentService {

    @Autowired
    private DepartmentRepository departmentRepo;

    @Override
    public ApiResponse<PaginatedResponse<List<DepartmentDto>>> getAllDepartment(Pageable pageable) {
        try {
            Page<Department> departmentPage = departmentRepo.findAll(pageable);

            List<DepartmentDto> dtoList = departmentPage.getContent().stream()
                    .map(this::convertDto)
                    .collect(Collectors.toList());

            PaginatedResponse<List<DepartmentDto>> response = new PaginatedResponse<>(
                    dtoList,
                    departmentPage.getNumber(),
                    departmentPage.getSize(),
                    departmentPage.getTotalElements(),
                    departmentPage.getTotalPages(),
                    departmentPage.isLast());

            return new ApiResponse<>(true, "Departments fetched successfully", response);
        } catch (Exception e) {
            return new ApiResponse<>(false, "Failed to fetch departments: " + e.getMessage(), null);
        }
    }

    @Override
    public ApiResponse<DepartmentDto> createDepartment(DepartmentDto dto) {
        try {

            if (departmentRepo.existsByDepartmentName(dto.getDepartmentName())) {
                throw new RuntimeException("Department Already exists");
            }

            Department department = Department.builder()
                    .departmentName(dto.getDepartmentName())
                    .status(dto.getStatus() != null ? dto.getStatus() : DepartmentStatus.ACTIVE).build();

            Department saved = departmentRepo.save(department);

            return new ApiResponse<>(true, "Created department successfully", convertDto(saved));
        } catch (Exception e) {
            return new ApiResponse<>(false, "Couldn't create department" + e.getMessage(), null);
        }
    }

    @Override
    public ApiResponse<DepartmentDto> updateDepartment(Long id, DepartmentDto dto) {
        try {
            Department existingDepartment = departmentRepo.findById(id)
                    .orElseThrow(() -> new RuntimeException("Department not found with id: " + id));

            existingDepartment.setDepartmentName(dto.getDepartmentName());
            existingDepartment.setStatus(dto.getStatus());

            Department updatedDepartment = departmentRepo.save(existingDepartment);

            DepartmentDto updatedDto = convertDto(updatedDepartment);

            return new ApiResponse<>(true, "Department updated successfully", updatedDto);

        } catch (Exception e) {
            return new ApiResponse<>(false, "Failed to update department: " + e.getMessage(), null);
        }
    }

    @Override
    public ApiResponse<DepartmentDto> getDepartmentById(Long id) {
        try {
            Department department = departmentRepo.findById(id)
                    .orElseThrow(() -> new RuntimeException("Department not found with id: " + id));

            DepartmentDto dto = convertDto(department);
            return new ApiResponse<>(true, "Department fetched successfully", dto);

        } catch (Exception e) {
            return new ApiResponse<>(false, "Failed to fetch department: " + e.getMessage(), null);
        }
    }

    @Override
    public ApiResponse<DepartmentDto> updateStatus(Long id, int status) {
        try {
            Department department = departmentRepo.findById(id)
                    .orElseThrow(() -> new RuntimeException("Department not found with id: " + id));

            DepartmentStatus[] values = DepartmentStatus.values();
            if (status < 0 || status >= values.length) {
                return new ApiResponse<>(false, "Invalid status value: " + status, null);
            }

            DepartmentStatus newStatus = values[status];
            department.setStatus(newStatus);
            Department updated = departmentRepo.save(department);

            DepartmentDto dto = convertDto(updated);
            return new ApiResponse<>(true, "Department status updated successfully", dto);

        } catch (Exception e) {
            return new ApiResponse<>(false, "Failed to update status: " + e.getMessage(), null);
        }
    }

    private DepartmentDto convertDto(Department department) {

        return DepartmentDto.builder()
                .departmentId(department.getId()).departmentName(department.getDepartmentName())
                .status(department.getStatus()).build();
    }

}
