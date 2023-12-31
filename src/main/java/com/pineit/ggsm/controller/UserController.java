package com.pineit.ggsm.controller;

import com.pineit.ggsm.dto.UserDTO;
import com.pineit.ggsm.entity.USER;
import com.pineit.ggsm.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Log4j2
public class UserController {
    private final UserService userService;

    // 로그인
    @PostMapping("/check")
    public Map<String, Object> getUserCheck(@RequestBody UserDTO userDTO) {
        log.info("User Check.........");

        Map<String, Object> result = userService.getUserCheck(userDTO);

        return result;
    }

    // 사용자 정보 가져오기
    @PostMapping("/getUserInfo")
    public Optional<USER> getUserInfo(@RequestBody UserDTO userDTO) {
        log.info("GET USER INFO.........");

        Optional<USER> result = userService.getUserInfo(userDTO);

        return result;
    }

    // 사용자 정보 업데이트
    @PostMapping("/udtUser")
    public Map<String, Object> udtUser(@RequestBody UserDTO userDTO) {
        log.info("UPDATE USER.........");

        Map<String, Object> result = userService.udtUser(userDTO);

        return result;
    }
}
