package com.official.manpower_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.official.manpower_management.entity.Salary;

public interface SalaryRepository extends JpaRepository<Salary, Long> {

}
