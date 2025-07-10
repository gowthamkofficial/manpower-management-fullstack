package com.official.manpower_management.service;

import org.springframework.stereotype.Service;

import com.official.manpower_management.entity.Salary;
import com.official.manpower_management.model.dto.SalaryDto;

@Service
public class SalaryService {

    public SalaryDto convertToDto(Salary data) {
        return SalaryDto.builder()
                .ctc(data.getCtc())
                .deduction(data.getDeduction())
                .takeHome(data.getTakeHome())
                .salaryId(data.getId())
                .build();
    }

    public Salary convertToEntity(SalaryDto dto) {

        return Salary.builder()
                .ctc(dto.getCtc())
                .deduction(dto.getDeduction())
                .takeHome(dto.getTakeHome()).build();

    }

    public Salary convertToEntity(Long id, SalaryDto dto) {

        return Salary.builder()
                .id(id)
                .ctc(dto.getCtc())
                .deduction(dto.getDeduction())
                .takeHome(dto.getTakeHome()).build();

    }

}
