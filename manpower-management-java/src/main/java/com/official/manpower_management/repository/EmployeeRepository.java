package com.official.manpower_management.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.official.manpower_management.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    boolean existsByEmail(String email);

    boolean existsByMobileNumber(String mobileNumber);

  
}