package com.pineit.ggsm.controller;

import com.pineit.ggsm.dto.UserDTO;
import com.pineit.ggsm.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
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
    public UserDTO getUserCheck(@RequestBody UserDTO userDTO) {
        log.info("User Check.........");
        UserDTO result = userService.getUserCheck(userDTO);

        return result;
    }
}
