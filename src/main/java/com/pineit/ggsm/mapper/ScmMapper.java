package com.pineit.ggsm.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.json.simple.JSONObject;
import org.mybatis.spring.annotation.MapperScan;

import com.pineit.ggsm.dto.ScmDTO;

@MapperScan
@Mapper
public interface ScmMapper {

    public List<Map<String, Object>> fwdList(ScmDTO scmDTO);

    public List<Map<String, Object>> invCsList(ScmDTO scmDTO);

    public List<Map<String, Object>> reqRegList(ScmDTO scmDTO);

    public String getSlino(String date1);

    public Map<String, Object> addReqReg(JSONObject obj);

}
