package com.official.manpower_management.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.official.manpower_management.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    boolean existsByEmail(String email);

    boolean existsByMobileNumber(String mobileNumber);

    boolean existsByEmailAndIdNot(String email, Long id);

    boolean existsByMobileNumberAndIdNot(String mobileNumber, Long id);

    // Dashboard

    @Query("SELECT e.department.departmentName, COUNT(e) FROM Employee e GROUP BY e.department.departmentName")
    List<Object[]> countEmployeesByDepartment();

    @Query("SELECT e.department.departmentName, COUNT(e) FROM Employee e GROUP BY e.department.departmentName")
    List<Object[]> getDepartmentWiseEmployeeCount();

    @Query("SELECT e FROM Employee e ORDER BY e.salary.ctc DESC")
    List<Employee> findTopPaidEmployees(Pageable pageable);

    @Query("SELECT e.address.district, COUNT(e) FROM Employee e GROUP BY e.address.district")
    List<Object[]> countByDistrict();

    @Query("SELECT e FROM Employee e ORDER BY e.salary.ctc ASC")
    List<Employee> findLowestPaidEmployees(Pageable pageable);

}