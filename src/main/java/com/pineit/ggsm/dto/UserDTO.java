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
    private String usrcd;
    private String usrid;
    private String usrnm;
    private String passwd;
    private String useyn;
    private String insano;
    private String uslvl;
    private String entdt;
    private String deptcd;
    private String jkwicd;
    private String jkmunm;
    private String moblno;
    private String email;
    private String newyn;
    private String rk;
    private String cdate;
    private String cuser;
    private String mdate;
    private String muser;

    public UserDTO(String usrcd, String usrid, String usrnm) {
        this.usrcd = usrcd;
        this.usrid = usrid;
        this.usrnm = usrnm;
    }
}
