package com.pineit.ggsm.service;

import com.pineit.ggsm.dto.UserDTO;
import com.pineit.ggsm.entity.USER;
import com.pineit.ggsm.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
@Log4j2
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Override
    public Map<String, Object> getUserCheck(UserDTO dto) {
        USER user = dtoToEntity(dto);
        Optional<USER> check = userRepository.getUserCheck(user);
        Map<String, Object> result = new HashMap<String, Object>();
        if (check.isPresent()) {
            result.put("result", "Success");
            result.put("msg", "로그인에 성공했습니다.");
            result.put("info", check);
        } else {
            result.put("result", "Fail");
            result.put("msg", "아이디 또는 비밀번호가 일치하지 않습니다. 입력하신 사항을 다시 확인해 주세요.");
        }
        return result;
    }
}
