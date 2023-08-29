package com.pineit.ggsm.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pineit.ggsm.dto.ScmDTO;
import com.pineit.ggsm.mapper.ScmMapper;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@RequiredArgsConstructor
@Transactional
@Log4j2
public class ScmServiceImpl implements ScmService {

    @Autowired
    ScmMapper scmMapper;

    @Override
    public List<Map<String, Object>> fwdList(ScmDTO scmDTO) {
        return scmMapper.fwdList(scmDTO);
    }

    @Override
    public List<Map<String, Object>> invCsList(ScmDTO scmDTO) {
        return scmMapper.invCsList(scmDTO);
    }

    @Override
    public List<Map<String, Object>> reqRegList(ScmDTO scmDTO) {
        return scmMapper.reqRegList(scmDTO);
    }

}
