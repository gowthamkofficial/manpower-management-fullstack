package com.official.manpower_management.service;

import org.springframework.stereotype.Service;

import com.official.manpower_management.entity.Experience;
import com.official.manpower_management.model.dto.ExperienceDto;

@Service
public class ExperienceService {

    public ExperienceDto convertToDto(Experience exp) {

        return ExperienceDto.builder()
                .experienceId(exp.getId())
                .companyName(exp.getCompanyName())
                .fromDate(exp.getFromDate())
                .toDate(exp.getToDate()).build();
    }

    public Experience convertToEntity(ExperienceDto dto) {

        return Experience.builder().companyName(dto.getCompanyName())
                .fromDate(dto.getFromDate())
                .toDate(dto.getToDate()).build();
    }

    public Experience convertToEntity(Long id, ExperienceDto dto) {

        return Experience.builder().id(id).companyName(dto.getCompanyName())
                .fromDate(dto.getFromDate())
                .toDate(dto.getToDate()).build();
    }

}
