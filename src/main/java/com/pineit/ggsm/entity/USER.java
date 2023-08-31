package com.pineit.ggsm.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
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
public class USER extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CVCOD")
    private String cvcod;

    @Column(name = "PASSWD")
    private String passwd;

    @Column(name = "CVNAM")
    private String cvnam;

    @Column(name = "SANO")
    private String sano;

    @Column(name = "OWNAM")
    private String ownam;

    @Column(name = "UPTAE")
    private String uptae;

    @Column(name = "JONGK")
    private String jongk;

    @Column(name = "ZIPCD")
    private String zipcd;

    @Column(name = "ADDR1")
    private String addr1;

    @Column(name = "ADDR2")
    private String addr2;

    @Column(name = "MDATE")
    private String mdate;

    public USER(String cvcod, String passwd) {
        this.cvcod = cvcod;
        this.passwd = passwd;
    }
}
