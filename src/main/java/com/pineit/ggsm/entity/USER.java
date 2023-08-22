package com.pineit.ggsm.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;

@Entity
@Getter
@Builder
@DynamicInsert
@AllArgsConstructor
@NoArgsConstructor
@Table(name="zUSRLST")
@ToString
public class USER {

    @Id
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

    public USER(String usrid, String passwd) {
        this.usrid = usrid;
        this.passwd = passwd;
    }
}
