package com.official.manpower_management.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.official.manpower_management.model.dto.EmployeeDto;
import com.official.manpower_management.model.response.ApiResponse;
import com.official.manpower_management.model.response.PaginatedResponse;
import com.official.manpower_management.service.EmployeeService;


@RestController
@RequestMapping("/api/employee")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    @GetMapping("/getAllEmployee")
    public ResponseEntity<ApiResponse<PaginatedResponse<List<EmployeeDto>>>> getAllEmployee(
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "10") Integer size,
            @RequestParam(defaultValue = "id") String sortField,
            @RequestParam(defaultValue = "ASC") Sort.Direction direction) {

        Pageable pagination = PageRequest.of(page, size, Sort.by(direction, sortField));
        return employeeService.getAllEmployee(pagination);
    }

    @PostMapping("/createEmployee")
    public ResponseEntity<ApiResponse<EmployeeDto>> createEmployee(@RequestBody EmployeeDto dto) {
        System.err.println(dto);
        return this.employeeService.createEmployee(dto);
    }

}
