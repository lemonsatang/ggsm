package com.pineit.ggsm.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private String cvcod;
    private String passwd;
    private String cvgu;
    private String cvnam;
    private String cvnae;

    public UserDTO(String cvcod, String cvnam) {
        this.cvcod = cvcod;
        this.cvnam = cvnam;
    }
}
