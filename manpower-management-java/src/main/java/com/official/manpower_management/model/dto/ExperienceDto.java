package com.official.manpower_management.model.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ExperienceDto {

    private Long experienceId;
    private LocalDate fromDate;
    private LocalDate toDate;
    private String companyName;
}
