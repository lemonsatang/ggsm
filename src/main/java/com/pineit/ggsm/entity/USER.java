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
@Table(name = "CVMAST")
@ToString
public class USER {

    @Id
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

    public USER(String cvcod, String passwd) {
        this.cvcod = cvcod;
        this.passwd = passwd;
    }
}
