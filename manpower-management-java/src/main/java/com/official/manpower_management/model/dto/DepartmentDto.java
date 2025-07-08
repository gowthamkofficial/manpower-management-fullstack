package com.official.manpower_management.model.dto;

import com.official.manpower_management.model.enums.DepartmentStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DepartmentDto {

    
    private Long departmentId;
    private String departmentName;
    private DepartmentStatus status;

}
