package com.pineit.ggsm.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ScmDTO {
    private String i_jcode;
    private String i_house;
    private String i_cvcod;
    private String i_mitgu; // 제품구분
    private String i_itcod; // 품목
    private String i_jjnas; // 강종
    private String i_matrl; // 재질
    private String i_stsz1; // 두께
    private String i_stsz2;
    private String i_edsz1; // 폭
    private String i_edsz2;
    private String i_savit; // 보관품 유무
    private String i_add1;

}
