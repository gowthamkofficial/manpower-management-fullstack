package com.official.manpower_management.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.official.manpower_management.entity.Department;
import com.official.manpower_management.model.dto.DepartmentDto;
import com.official.manpower_management.model.enums.DepartmentStatus;
import com.official.manpower_management.model.response.ApiResponse;
import com.official.manpower_management.repository.DepartmentRepository;

@Service
public class DepartmentService {

    @Autowired
    private DepartmentRepository departmentRepository;

    public ResponseEntity<ApiResponse<List<DepartmentDto>>> getAllDepartment() {
        try {
            List<DepartmentStatus> statuses = List.of(DepartmentStatus.ACTIVE, DepartmentStatus.INACTIVE);
            List<Department> departmentList = departmentRepository.findByStatusIn(statuses);

            if (departmentList.size() <= 0) {
                return ResponseEntity.ok().body(new ApiResponse<>(true, "No departments found", null));
            } else {
                List<DepartmentDto> departmentDtoList = departmentList.stream().map(this::convertToDepartmentDto)
                        .collect(Collectors.toList());
                return ResponseEntity.ok()
                        .body(new ApiResponse<>(true, "Departments fetched successfully", departmentDtoList));
            }

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(new ApiResponse<>(false, "Couldn't fetch departments. " + e.getMessage(), null));
        }
    }

    public ResponseEntity<ApiResponse<DepartmentDto>> createDepartment(DepartmentDto dto) {
        System.err.println(dto);
        try {
            boolean departmentAlreadyExists = departmentRepository.existsByDepartmentName(dto.getDepartmentName());

            if (departmentAlreadyExists) {
                throw new RuntimeException("Department name already exists");
            }

            Department saved = departmentRepository.save((convertToDepartmentEntity(dto)));

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse<>(true, "Created department successfully", convertToDepartmentDto(saved)));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(new ApiResponse<>(false, "Couldn't create department - " + e.getMessage(),
                            null));
        }

    }

    public ResponseEntity<ApiResponse<DepartmentDto>> updateDepartment(Long id, DepartmentDto dto) {
        try {

            departmentRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Department not found with id  " + id));

            boolean departmentNameAlreadyExists = departmentRepository
                    .existsByDepartmentNameAndIdNot(dto.getDepartmentName(), id);

            if (departmentNameAlreadyExists) {
                throw new RuntimeException("Department name already exists");
            }

            Department updated = departmentRepository.save(convertToDepartmentEntity(dto, id));
            return ResponseEntity.ok()
                    .body(new ApiResponse<>(true, "Updated department successfully", convertToDepartmentDto(updated)));

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(new ApiResponse<>(false, "Couldn't update department - " + e.getMessage(),
                            null));
        }
    }

    public ResponseEntity<ApiResponse<DepartmentDto>> getDepartmentById(Long id) {
        try {
            Department existingDepartment = departmentRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Department not found with Id " + id));

            return ResponseEntity.ok().body(new ApiResponse<>(true, "Department fetched successfully",
                    convertToDepartmentDto(existingDepartment)));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(new ApiResponse<>(false, "Couldn't fetch department. " + e.getMessage(), null));
        }
    }

    public ResponseEntity<ApiResponse<?>> updateStatus(Long id, int status) {

        try {
            Department existingDepartment = departmentRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Department not found with ID " + id));

            switch (status) {
                case 1: {
                    existingDepartment.setStatus(DepartmentStatus.ACTIVE);
                }

                    break;
                case 2: {
                    existingDepartment.setStatus(DepartmentStatus.INACTIVE);
                }

                    break;
                case 3: {
                    existingDepartment.setStatus(DepartmentStatus.DELETED);
                }

                    break;

                default: {
                    existingDepartment.setStatus(DepartmentStatus.ACTIVE);
                }
                    break;
            }

            Department saved = departmentRepository.save(existingDepartment);

            return ResponseEntity.ok()
                    .body(new ApiResponse<>(true, "Status updated sucessfully", convertToDepartmentDto(saved)));

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(new ApiResponse<>(false, "Couldn't update status " + e.getMessage(), null));
        }

    }

    public DepartmentDto convertToDepartmentDto(Department department) {
        return DepartmentDto.builder().departmentId(department.getId()).departmentName(department.getDepartmentName())
                .status(department.getStatus())
                .build();
    }

    public Department convertToDepartmentEntity(DepartmentDto dto) {
        return Department.builder().departmentName(dto.getDepartmentName())
                .status(DepartmentStatus.ACTIVE).build();
    }

    public Department convertToEntityForEmployeeCreate(DepartmentDto dto) {
        Department department = departmentRepository.findById(dto.getDepartmentId())
                .orElseThrow(() -> new RuntimeException("Department not found with id" + dto.getDepartmentId()));

        return department;
    }

    public Department convertToDepartmentEntity(DepartmentDto dto, Long id) {
        return Department.builder()
                .id(id)
                .departmentName(dto.getDepartmentName())
                .status(DepartmentStatus.ACTIVE)
                .build();
    }

}
