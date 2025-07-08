package com.official.manpower_management.model.dto;

import java.time.LocalDate;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EmployeeDto {

    private Long employeeId;
    private String firstName;
    private String lastName;
    private String email;
    private String mobileNumber;

    private LocalDate dateOfJoining;

    private SalaryDto salary;

    private AddressDto address;

    private List<ExperienceDto> experience;

}
