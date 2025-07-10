package com.official.manpower_management.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.official.manpower_management.model.dto.DepartmentDto;
import com.official.manpower_management.model.response.ApiResponse;
import com.official.manpower_management.service.DepartmentService;

@RestController
@RequestMapping("api/departments")
public class DepartmentController {

    @Autowired
    private DepartmentService depertmentService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<DepartmentDto>>> getAllDepartment() {
        return depertmentService.getAllDepartment();
    }

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<DepartmentDto>> createDepartment(@RequestBody DepartmentDto dto) {
        return depertmentService.createDepartment(dto);
    }

    @PostMapping("/update/{id}")
    public ResponseEntity<ApiResponse<DepartmentDto>> updateDepartment(@PathVariable Long id,
            @RequestBody DepartmentDto dto) {
        return depertmentService.updateDepartment(id, dto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<DepartmentDto>> getDepartmentById(@PathVariable Long id) {
        return depertmentService.getDepartmentById(id); 
    }

    @PostMapping("/status/{id}")
    public ResponseEntity<ApiResponse<?>> updateStatusDepartment(@PathVariable Long id,
            @RequestParam int status) {
        return depertmentService.updateStatus(id, status);
    }

    @PostMapping("/delete/{id}")
    public ResponseEntity<ApiResponse<?>> deleteDepartment(@PathVariable Long id,
            @RequestParam int status) {
        return depertmentService.updateStatus(id, status);
    }

}
