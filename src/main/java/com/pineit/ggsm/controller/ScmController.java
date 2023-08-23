package com.pineit.ggsm.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.pineit.ggsm.dto.ScmDTO;
import com.pineit.ggsm.dto.UserDTO;
import com.pineit.ggsm.service.ScmService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequiredArgsConstructor
@Log4j2
public class ScmController {
    private final ScmService scmService;

    /* 출고관리 */
    @PostMapping("/fwdList")
    public List<Map<String, Object>> fwdList(@RequestBody ScmDTO scmDTO) {
        log.info("GET FWD LIST.........");

        List<Map<String, Object>> result = scmService.fwdList(scmDTO);

        return result;
    }

    /* 출고관리 끝 */

    /* 재고관리 */
    @PostMapping("/invCsList")
    public List<Map<String, Object>> invCsList(@RequestBody ScmDTO scmDTO) {
        log.info("GET INVCS LIST.........");

        List<Map<String, Object>> result = scmService.invCsList(scmDTO);

        return result;
    }

    /* 재고관리 끝 */
}