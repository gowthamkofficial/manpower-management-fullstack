package com.official.manpower_management.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.official.manpower_management.entity.Department;
import com.official.manpower_management.model.enums.DepartmentStatus;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {

    boolean existsByDepartmentName(String departmentName);

    boolean existsByDepartmentNameAndIdNot(String departmentName, Long id);

    List<Department> findByStatusIn(List<DepartmentStatus> statuses);

}
