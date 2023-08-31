package com.pineit.ggsm.controller;

import com.pineit.ggsm.dto.UserDTO;
import com.pineit.ggsm.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import java.util.HashMap;
import java.util.Map;

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

    @PostMapping("/check")
    public Map<String, Object> getUserCheck(@RequestBody UserDTO userDTO) {
        log.info("User Check.........");

        Map<String, Object> result = userService.getUserCheck(userDTO);

        return result;
    }

    @PostMapping("/udtUser")
    public Map<String, Object> udtUser(@RequestBody UserDTO userDTO) {
        log.info("UPDATE USER.........");

        System.out.println("==============INFO: " + userDTO);

        Map<String, Object> result = userService.udtUser(userDTO);
        // Map<String, Object> result = new HashMap<>();

        System.out.println("==============RESULT: " + result);

        return result;
    }
}
