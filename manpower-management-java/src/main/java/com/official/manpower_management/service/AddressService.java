package com.official.manpower_management.service;

import org.springframework.stereotype.Service;

import com.official.manpower_management.entity.Address;
import com.official.manpower_management.model.dto.AddressDto;

@Service
public class AddressService {

    public AddressDto convertToDto(Address data) {
        return AddressDto.builder()
                .addressId(data.getId())
                .addressLine1(data.getAddressLine1())
                .addressLine2(data.getAddressLine2())
                .district(data.getDistrict())
                .doorNo(data.getDoorNo())
                .pincode(data.getPincode())
                .state(data.getState()).build();
    }

    public Address convertToEntity(AddressDto dto) {

        return Address.builder()
                .addressLine1(dto.getAddressLine1())
                .addressLine2(dto.getAddressLine2())
                .doorNo(dto.getDoorNo())
                .district(dto.getDistrict())
                .state(dto.getState())
                .pincode(dto.getPincode())
                .build();
    }

    public Address convertToEntity(Long id, AddressDto dto) {

        return Address.builder()
                .id(id)
                .addressLine1(dto.getAddressLine1())
                .addressLine2(dto.getAddressLine2())
                .doorNo(dto.getDoorNo())
                .district(dto.getDistrict())
                .state(dto.getState())
                .pincode(dto.getPincode())
                .build();
    }

}
