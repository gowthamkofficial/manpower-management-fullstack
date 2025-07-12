package com.official.manpower_management.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.official.manpower_management.model.dto.DepartmentChartDto;
import com.official.manpower_management.model.dto.EmployeeDto;
import com.official.manpower_management.model.response.ApiResponse;
import com.official.manpower_management.service.DashboardService;
import com.official.manpower_management.service.DashboardService.DistrictCountDto;
import com.official.manpower_management.service.DashboardService.TopPaidEmployee;

@RestController
@RequestMapping("/api")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/dashboard/department-count")
    public ResponseEntity<ApiResponse<List<DepartmentChartDto>>> getDepartmentCounts() {
        return ResponseEntity.ok(dashboardService.getDepartmentWiseEmployeeCount());
    }

    @GetMapping("/dashboard/top-paid")
    public ResponseEntity<ApiResponse<List<TopPaidEmployee>>> getTopPaidEmployees() {
        return ResponseEntity.ok(dashboardService.getTopPaidEmployees());
    }

    @GetMapping("/dashboard/employee-by-district")
    public ResponseEntity<ApiResponse<List<DistrictCountDto>>> getEmployeeByDistrict() {
        return ResponseEntity.ok(dashboardService.getEmployeeCountByDistrict());
    }

    @GetMapping("/dashboard/lowest-paid")
    public ResponseEntity<ApiResponse<List<TopPaidEmployee>>> getLowestPaidEmployees() {
        return ResponseEntity.ok(dashboardService.getLowestPaidEmployees());
    }

}
