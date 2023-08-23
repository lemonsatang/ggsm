package com.pineit.ggsm.service;

import java.util.List;
import java.util.Map;

import com.pineit.ggsm.dto.ScmDTO;

public interface ScmService {

    List<Map<String, Object>> fwdList(ScmDTO scmDTO);

}
