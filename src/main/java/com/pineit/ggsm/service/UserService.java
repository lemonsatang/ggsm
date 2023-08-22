package com.pineit.ggsm.service;

import java.util.Map;

import com.pineit.ggsm.dto.UserDTO;
import com.pineit.ggsm.entity.USER;

public interface UserService {

    default USER dtoToEntity(UserDTO dto) {
        USER entity = USER.builder()
                .usrcd(dto.getUsrcd())
                .usrid(dto.getUsrid())
                .usrnm(dto.getUsrnm())
                .passwd(dto.getPasswd())
                .useyn(dto.getUseyn())
                .insano(dto.getInsano())
                .uslvl(dto.getUslvl())
                .entdt(dto.getEntdt())
                .deptcd(dto.getDeptcd())
                .jkwicd(dto.getJkwicd())
                .jkmunm(dto.getJkmunm())
                .moblno(dto.getMoblno())
                .email(dto.getEmail())
                .newyn(dto.getNewyn())
                .rk(dto.getRk())
                .cdate(dto.getCdate())
                .cuser(dto.getCuser())
                .mdate(dto.getMdate())
                .muser(dto.getMuser())
                .build();
        return entity;
    }

    Map<String, Object> getUserCheck(UserDTO dto);
}
