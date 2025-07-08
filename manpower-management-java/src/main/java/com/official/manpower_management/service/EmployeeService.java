package com.official.manpower_management.service;

import com.official.manpower_management.model.dto.EmployeeDto;
import com.official.manpower_management.model.response.ApiResponse;

public interface EmployeeService {

    public ApiResponse<EmployeeDto> createEmployee(EmployeeDto dto);

}
