package com.pineit.ggsm.service;

import java.io.IOException;
import java.net.SocketException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.pineit.ggsm.dto.ScmDTO;
import com.pineit.ggsm.mapper.ScmMapper;
import com.pineit.ggsm.util.FtpClient;

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

    private String serverIp = "121.66.17.30";
    private int serverPort = 16021;
    private String user = "server";
    private String password = "pineit0401!!";

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

    @Override
    public Map<String, Object> addReqReg(JSONObject obj, MultipartHttpServletRequest mRequest) {

        Map<String, Object> result = new HashMap<String, Object>();

        String slino = scmMapper.getSlino(getCurrentDateTime());
        obj.put("SLINO", slino);
        obj.put("TDATE", getCurrentDateTime());

        try {
            System.out.println(!mRequest.getFiles("file").isEmpty());
            if (!mRequest.getFiles("file").isEmpty()) {
                List<MultipartFile> mf = mRequest.getFiles("file");
                String path = "ggsm/req/";

                if (!mf.get(0).getOriginalFilename().equals("")) {
                    String originalfilename = mf.get(0).getOriginalFilename();
                    int pos = originalfilename.lastIndexOf(".");
                    String ext = originalfilename.substring(pos + 1);

                    String saveFileName = slino + "." + ext;

                    obj.put("ATTNM", saveFileName);

                    FtpClient ftp = new FtpClient(serverIp, serverPort, user, password);

                    boolean resultFtp;

                    resultFtp = ftp.upload(mf.get(0), saveFileName, path);

                    if (!resultFtp) {
                        result.put("RESULT", -1);
                        result.put("MSG", "파일 저장 실패");
                        return result;
                    }
                }
            }
        } catch (SocketException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }

        result = scmMapper.addReqReg(obj);

        return result;
    }

    // 현재 날짜, 시간 가져오기
    public static String getCurrentDateTime() {
        SimpleDateFormat sDate2 = new SimpleDateFormat("yyyy-MM-dd");

        String today = sDate2.format(new Date());

        return today;
    }

}
