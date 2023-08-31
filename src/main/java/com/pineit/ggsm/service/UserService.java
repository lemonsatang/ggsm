package com.pineit.ggsm.service;

import java.util.Map;
import java.util.Optional;

import com.pineit.ggsm.dto.UserDTO;
import com.pineit.ggsm.entity.USER;

public interface UserService {

    default USER dtoToEntity(UserDTO dto) {
        USER entity = USER.builder()
                .cvcod(dto.getCvcod())
                .passwd(dto.getPasswd())
                .cvnam(dto.getCvnam())
                .sano(dto.getSano())
                .ownam(dto.getOwnam())
                .uptae(dto.getUptae())
                .jongk(dto.getJongk())
                .zipcd(dto.getZipcd())
                .addr1(dto.getAddr1())
                .addr2(dto.getAddr2())
                .mdate(dto.getMdate())
                .build();
        return entity;
    }

    Map<String, Object> getUserCheck(UserDTO dto);

    Map<String, Object> udtUser(UserDTO userDTO);

    Optional<USER> getUserInfo(UserDTO userDTO);
}
