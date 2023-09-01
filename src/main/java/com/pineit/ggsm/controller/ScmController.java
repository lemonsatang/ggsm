package com.pineit.ggsm.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.pineit.ggsm.dto.ScmDTO;
import com.pineit.ggsm.service.ScmService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import net.sf.json.JSONArray;

@RestController
@RequiredArgsConstructor
@Log4j2
public class ScmController {
    private final ScmService scmService;

    /* 출고관리 */
    @PostMapping("/fwdList")
    public List<Map<String, Object>> fwdList(@RequestBody ScmDTO scmDTO) {
        log.info("GET FWD LIST.........");

        System.out.println("===================scmDTO: " + scmDTO);

        List<Map<String, Object>> result = scmService.fwdList(scmDTO);

        return result;
    }

    /* 출고관리 끝 */

    /* 재고관리 */
    @PostMapping("/invCsList")
    public List<Map<String, Object>> invCsList(@RequestBody ScmDTO scmDTO) {
        log.info("GET INVCS LIST.........");

        System.out.println("===================scmDTO: " + scmDTO);

        List<Map<String, Object>> result = scmService.invCsList(scmDTO);

        return result;
    }

    /* 재고관리 끝 */

    /* 주문의뢰서 접수 */
    @PostMapping("/reqRegList")
    public List<Map<String, Object>> reqRegList(@RequestBody ScmDTO scmDTO) {
        log.info("GET REQREG LIST.........");

        List<Map<String, Object>> result = scmService.reqRegList(scmDTO);

        return result;
    }

    @PostMapping("/addReqReg")
    public Map<String, Object> addReqReg(HttpServletRequest request, MultipartHttpServletRequest mRequest)
            throws ParseException {
        log.info("ADD REQREG.........");

        JSONParser parser = new JSONParser();
        Object obj = parser.parse(request.getParameter("data"));
        JSONObject jsonObj = (JSONObject) obj;

        List<Map<String, Object>> dataListMap = JSONArray.fromObject(request.getParameter("dataList"));
        jsonObj.put("dataList", dataListMap);

        Map<String, Object> result = scmService.addReqReg(jsonObj, mRequest);

        return result;
    }
    /* 주문의뢰서 접수 끝 */
}
