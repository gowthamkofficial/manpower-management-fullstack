package com.official.manpower_management.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.official.manpower_management.entity.Employee;
import com.official.manpower_management.model.dto.EmployeeDto;
import com.official.manpower_management.model.response.ApiResponse;
import com.official.manpower_management.model.response.PaginatedResponse;
import com.official.manpower_management.repository.AddressRepository;
import com.official.manpower_management.repository.DepartmentRepository;
import com.official.manpower_management.repository.EmployeeRepository;
import com.official.manpower_management.repository.ExperienceRepository;
import com.official.manpower_management.repository.SalaryRepository;

@Service
public class EmployeeService {

    // Repositories
    @Autowired
    private EmployeeRepository employeeRepo;
    @Autowired
    private SalaryRepository salaryRepo;
    @Autowired
    private AddressRepository addressRepo;
    @Autowired
    private ExperienceRepository experienceRepo;
    @Autowired
    private DepartmentRepository departmentRepo;

    // Service
    @Autowired
    private AddressService addressService;
    @Autowired
    private ExperienceService experienceService;
    @Autowired
    private SalaryService salaryService;

    @Autowired
    private DepartmentService departmentService;

    public ResponseEntity<ApiResponse<PaginatedResponse<List<EmployeeDto>>>> getAllEmployee(Pageable pagination) {

        try {
            Page<Employee> employeePage = employeeRepo.findAll(pagination);
            List<EmployeeDto> employeeList = employeePage.getContent().stream().map(this::convertToDto)
                    .collect(Collectors.toList());

            PaginatedResponse<List<EmployeeDto>> paginatedResponse = new PaginatedResponse<>(employeeList,
                    employeePage.getNumber(), employeePage.getSize(), employeePage.getTotalElements(),
                    employeePage.getTotalPages(), employeePage.isLast());

            if (employeeList.isEmpty()) {
                return ResponseEntity.ok()
                        .body(new ApiResponse<>(true, "No data found", null));
            } else {
                return ResponseEntity.ok()
                        .body(new ApiResponse<>(true, "Fetched employee list successfully", paginatedResponse));
            }

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(new ApiResponse(false, "Couldn't fetch employee- " + e.getMessage(), null));

        }

    }

    public ResponseEntity<ApiResponse<EmployeeDto>> createEmployee(EmployeeDto dto) {

        try {
            boolean emailAlreadyExists = employeeRepo.existsByEmail(dto.getEmail());

            boolean mobileNumberAlreadyExists = employeeRepo.existsByMobileNumber(dto.getMobileNumber());

            if (emailAlreadyExists) {
                throw new RuntimeException("Email already exists");
            }

            if (mobileNumberAlreadyExists) {
                throw new RuntimeException("Mobile Number already exists");

            }

            Employee mapped = connvertToEntity(dto);

            if (mapped.getExperience() != null) {
                mapped.getExperience().forEach(e -> {
                    e.setEmployee(mapped);
                    // System.err.println(e + " Hello mister--------------->");
                });
            }
            // return null;
            // if (false) {
            return ResponseEntity.status(HttpStatus.CREATED).body(
                    new ApiResponse<>(true, "Created employee successfully",
                            convertToDto(employeeRepo.save(mapped))));
            // }

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(new ApiResponse<>(false, "Couldn't create an employee " + e.getMessage(), null));
        }

    }

    public ResponseEntity<ApiResponse<EmployeeDto>> updateEmployee(Long id, EmployeeDto dto) {
        try {

            Employee existingEmployee = employeeRepo.findById(id)
                    .orElseThrow(() -> new RuntimeException("Employee not with id " + id));

            if (employeeRepo.existsByEmailAndIdNot(dto.getEmail(), id)) {
                throw new RuntimeException("Email already exists");
            }
            if (employeeRepo.existsByMobileNumberAndIdNot(dto.getMobileNumber(), id)) {
                throw new RuntimeException("Mobile Number already exists");

            }

            Employee mapped = connvertToEntity(id, dto);

            if (mapped.getExperience() != null) {
                mapped.getExperience().forEach(e -> {
                    e.setEmployee(mapped);
                    // System.err.println(e + " Hello mister--------------->");
                });
            }

            return ResponseEntity.ok().body(
                    new ApiResponse<>(true, "Updated employee successfully", convertToDto(employeeRepo.save(mapped))));

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(new ApiResponse<>(false, "Couldn't update employee " + e.getMessage(), null));
        }
    }

    public ResponseEntity<ApiResponse<EmployeeDto>> getEmployeeById(Long id) {
        try {
            Employee existingEmployee = employeeRepo.findById(id)
                    .orElseThrow(() -> new RuntimeException("Employee not found with id " + id));

            return ResponseEntity.ok()
                    .body(new ApiResponse<>(true, "Fetched Employee successfully", convertToDto(existingEmployee)));
        } catch (Exception e) {
           return ResponseEntity.internalServerError()
                    .body(new ApiResponse<>(false, "Couldn't fetch an employee " + e.getMessage(), null));
        }
    }

    public EmployeeDto convertToDto(Employee emp) {
        return EmployeeDto.builder()
                .employeeId(emp.getId())
                .firstName(emp.getFirstName())
                .lastName(emp.getLastName())
                .dateOfJoining(emp.getDateOfJoining())
                .email(emp.getEmail())
                .mobileNumber(emp.getMobileNumber())
                .experience(emp.getExperience().stream().map(e -> experienceService.convertToDto(e))
                        .collect(Collectors.toList()))
                .salary(salaryService.convertToDto(emp.getSalary()))
                .department(departmentService.convertToDepartmentDto(emp.getDepartment()))
                .address(addressService.convertToDto(emp.getAddress()))
                .build();
    }

    public Employee connvertToEntity(EmployeeDto dto) {
        return Employee.builder()
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .dateOfJoining(dto.getDateOfJoining())
                .email(dto.getEmail())
                .mobileNumber(dto.getMobileNumber())
                .department(departmentService.convertToEntityForEmployeeCreate(dto.getDepartment()))
                .empCode(generateEmpCode())
                .address(addressService.convertToEntity(dto.getAddress()))
                .salary(salaryService.convertToEntity(dto.getSalary()))
                .experience(dto.getExperience().stream().map(e -> experienceService.convertToEntity(e))
                        .collect(Collectors.toList()))
                .build();
    }

    public Employee connvertToEntity(Long id, EmployeeDto dto) {
        return Employee.builder()
                .id(id)
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .dateOfJoining(dto.getDateOfJoining())
                .email(dto.getEmail())
                .mobileNumber(dto.getMobileNumber())
                .department(departmentService.convertToEntityForEmployeeCreate(dto.getDepartment()))
                .empCode(generateEmpCode(id))
                .address(addressService.convertToEntity(dto.getAddress().getAddressId(), dto.getAddress()))
                .salary(salaryService.convertToEntity(dto.getSalary().getSalaryId(), dto.getSalary()))
                .experience(
                        dto.getExperience().stream().map(e -> experienceService.convertToEntity(e.getExperienceId(), e))
                                .collect(Collectors.toList()))
                .build();
    }

    public String generateEmpCode() {
        Long count = employeeRepo.count() + 1;
        return "EMP00" + count;
    }

    public String generateEmpCode(Long id) {
        return "EMP00" + id;
    }

}
