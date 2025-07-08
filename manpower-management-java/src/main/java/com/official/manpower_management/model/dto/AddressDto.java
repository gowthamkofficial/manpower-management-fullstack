package com.official.manpower_management.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AddressDto {

    private Long addressId;
    private String doorNo;
    private String addressLine1;
    private String addressLine2;
    private String district;
    private String state;
    private String pincode;

}
