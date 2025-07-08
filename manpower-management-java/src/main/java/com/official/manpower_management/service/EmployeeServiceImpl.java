package com.official.manpower_management.service;

import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.official.manpower_management.entity.Address;
import com.official.manpower_management.entity.Department;
import com.official.manpower_management.entity.Employee;
import com.official.manpower_management.entity.Experience;
import com.official.manpower_management.entity.Salary;
import com.official.manpower_management.model.dto.EmployeeDto;
import com.official.manpower_management.model.response.ApiResponse;
import com.official.manpower_management.repository.DepartmentRepository;
import com.official.manpower_management.repository.EmployeeRepository;
@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepo;

    @Autowired
    private DepartmentRepository departmentRepo;

    @Override
    public ApiResponse<EmployeeDto> createEmployee(EmployeeDto dto) {

        try {

            boolean duplicateEmail = employeeRepo.existsByEmail(dto.getEmail());

            boolean duplicateMobileNumber = employeeRepo.existsByMobileNumber(dto.getMobileNumber());

            if (duplicateEmail) {
                throw new RuntimeException("Email already exists - " + dto.getEmail());
            }

            if (duplicateMobileNumber) {
                throw new RuntimeException("Mobile Number already exists - " + dto.getMobileNumber());
            }

            Department department = departmentRepo.findById(dto.getDepartment().getDepartmentId())
                    .orElseThrow(() -> new RuntimeException("Department not found"));

            Address address = Address.builder().doorNo(dto.getAddress().getDoorNo())
                    .addressLine1(dto.getAddress().getAddressLine1())
                    .addressLine2(dto.getAddress().getAddressLine2())
                    .district(dto.getAddress().getDistrict())
                    .state(dto.getAddress().getState())
                    .pincode(dto.getAddress().getPincode()).build();

            Salary salary = Salary.builder().ctc(dto.getSalary().getCtc())
                    .deduction(dto.getSalary().getDeduction())
                    .takeHome(dto.getSalary().getTakeHome()).build();

            Employee employee = Employee.builder()
                    .firstName(dto.getFirstName())
                    .lastName(dto.getLastName())
                    .email(dto.getEmail())
                    .mobileNumber(dto.getMobileNumber())
                    .dateOfJoining(dto.getDateOfJoining()).empCode(generateEmpCode())
                    .department(department)
                    .address(address)
                    .salary(salary)
                    .build();

            if (dto.getExperience() != null) {
                employee.setExperience(
                        dto.getExperience().stream()
                                .map(e -> Experience.builder().companyName(e.getCompanyName()).fromDate(e.getFromDate())
                                        .toDate(e.getToDate()).build())
                                .collect(Collectors.toList()));
            }

            Employee savedEmployee = employeeRepo.save(employee);

            EmployeeDto responseDto = EmployeeDto.builder()
                    .employeeId(savedEmployee.getId())
                    .firstName(savedEmployee.getFirstName())
                    .lastName(savedEmployee.getLastName())
                    .email(savedEmployee.getEmail())
                    .mobileNumber(savedEmployee.getMobileNumber())
                    .dateOfJoining(savedEmployee.getDateOfJoining())
                    .department(dto.getDepartment())
                    .salary(dto.getSalary())
                    .address(dto.getAddress())
                    .experience(dto.getExperience())
                    .build();

            return new ApiResponse<>(true, "Employee created successfully", responseDto);

        } catch (Exception e) {
            return new ApiResponse<>(false, "Failed to create employee: " + e.getMessage(), null);
        }
    }

    private String generateEmpCode() {
        long count = employeeRepo.count() + 1;

        return String.format("EMP%04d", count);
    }

}
