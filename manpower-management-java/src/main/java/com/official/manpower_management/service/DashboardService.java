package com.official.manpower_management.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.official.manpower_management.entity.Employee;
import com.official.manpower_management.model.dto.DepartmentChartDto;
import com.official.manpower_management.model.response.ApiResponse;
import com.official.manpower_management.repository.EmployeeRepository;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Service
public class DashboardService {

    @Autowired
    private EmployeeRepository employeeRepo;

    public List<DepartmentChartDto> getEmployeeCountByDepartment() {
        List<Object[]> results = employeeRepo.countEmployeesByDepartment();
        return results.stream()
                .map(obj -> new DepartmentChartDto((String) obj[0], (Long) obj[1]))
                .collect(Collectors.toList());
    }

    public ApiResponse<List<DepartmentChartDto>> getDepartmentWiseEmployeeCount() {
        List<Object[]> results = employeeRepo.getDepartmentWiseEmployeeCount();
        List<DepartmentChartDto> dtoList = results.stream()
                .map(obj -> new DepartmentChartDto((String) obj[0], (Long) obj[1]))
                .collect(Collectors.toList());

        return new ApiResponse<>(true, "Department wise employee count fetched", dtoList);
    }

    public ApiResponse<List<TopPaidEmployee>> getTopPaidEmployees() {
        List<Employee> employees = employeeRepo.findTopPaidEmployees(PageRequest.of(0, 5));
        List<TopPaidEmployee> dtoList = employees.stream().map(this::getTopPaid).toList();

        return new ApiResponse<>(true, "Top paid employees fetched", dtoList);
    }

    public ApiResponse<List<DistrictCountDto>> getEmployeeCountByDistrict() {
        List<Object[]> results = employeeRepo.countByDistrict();
        List<DistrictCountDto> dtoList = results.stream()
                .map(obj -> new DistrictCountDto((String) obj[0], (Long) obj[1]))
                .collect(Collectors.toList());

        return new ApiResponse<>(true, "Employee count by district fetched", dtoList);
    }

    public ApiResponse<List<TopPaidEmployee>> getLowestPaidEmployees() {
        List<Employee> employees = employeeRepo.findLowestPaidEmployees(PageRequest.of(0, 5));
        List<TopPaidEmployee> dtoList = employees.stream().map(this::getTopPaid).toList();

        return new ApiResponse<>(true, "Lowest paid employees fetched", dtoList);
    }

    public TopPaidEmployee getTopPaid(Employee emp) {
        return new TopPaidEmployee(emp.getFirstName().concat("-" + emp.getEmpCode()), emp.getSalary().getCtc());
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public class TopPaidEmployee {

        private String employee;
        private Double amount;

    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public class DistrictCountDto {
        private String district;
        private Long employeeCount;
    }

}
