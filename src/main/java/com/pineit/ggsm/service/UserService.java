package com.pineit.ggsm.service;

import java.util.Map;

import com.pineit.ggsm.dto.UserDTO;
import com.pineit.ggsm.entity.USER;

public interface UserService {

    default USER dtoToEntity(UserDTO dto) {
        USER entity = USER.builder()
                .cvcod(dto.getCvcod())
                .passwd(dto.getPasswd())
                .cvgu(dto.getCvgu())
                .cvnam(dto.getCvnam())
                .cvnae(dto.getCvnae())
                .build();
        return entity;
    }

    Map<String, Object> getUserCheck(UserDTO dto);
}
