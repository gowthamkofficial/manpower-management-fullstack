package com.official.manpower_management.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DepartmentChartDto {
    private String departmentName;
    private Long employeeCount;
}