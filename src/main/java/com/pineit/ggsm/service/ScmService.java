package com.pineit.ggsm.service;

import java.util.List;
import java.util.Map;

import org.json.simple.JSONObject;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.pineit.ggsm.dto.ScmDTO;

public interface ScmService {

    List<Map<String, Object>> fwdList(ScmDTO scmDTO);

    List<Map<String, Object>> invCsList(ScmDTO scmDTO);

    List<Map<String, Object>> reqRegList(ScmDTO scmDTO);

    Map<String, Object> addReqReg(JSONObject obj, MultipartHttpServletRequest mRequest);

}
