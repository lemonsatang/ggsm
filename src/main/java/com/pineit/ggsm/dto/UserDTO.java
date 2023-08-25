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
    private String cvetc;
    private String cvkey;
    private String sano;
    private String cvno;
    private String ownam;
    private String uptae;
    private String jongk;
    private String zipcd;
    private String addr1;
    private String addr2;

    public UserDTO(String cvcod, String cvnam) {
        this.cvcod = cvcod;
        this.cvnam = cvnam;
    }
}
