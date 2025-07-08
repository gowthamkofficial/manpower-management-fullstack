package com.official.manpower_management.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.official.manpower_management.model.dto.EmployeeDto;
import com.official.manpower_management.model.response.ApiResponse;
import com.official.manpower_management.service.EmployeeService;


@RestController
public class EmployeeControllerImpl implements EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @Override
    public ApiResponse<EmployeeDto> createEmployee(@RequestBody EmployeeDto dto) {

        return  employeeService.createEmployee(dto);
    }

}
