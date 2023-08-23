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
    private String I_JCODE;
    private String I_HOUSE;
    private String I_CVCOD;
    private String I_MITGU;
    private String I_ITCOD;
    private String I_JJNAS;
    private String I_MATRL;
    private String I_STSZ1;
    private String I_EDSZ1;
    private String I_EDSZ2;
    private String I_SAVIT;
    private String I_ADD1;
}
