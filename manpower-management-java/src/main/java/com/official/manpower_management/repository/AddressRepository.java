package com.official.manpower_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.official.manpower_management.entity.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {

}
