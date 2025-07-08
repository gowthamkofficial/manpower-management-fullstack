package com.official.manpower_management.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SalaryDto {

    private Long salaryId;

    private double takeHome;

    private double deduction;

    private double ctc;

}
