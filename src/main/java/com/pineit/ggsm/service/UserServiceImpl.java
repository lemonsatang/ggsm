package com.pineit.ggsm.service;

import com.pineit.ggsm.dto.UserDTO;
import com.pineit.ggsm.entity.USER;
import com.pineit.ggsm.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
@Log4j2
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;

    @Override
    public UserDTO getUserCheck(UserDTO dto) {
        USER user = dtoToEntity(dto);
        Optional<USER> check = userRepository.getUserCheck(user);
        UserDTO result;
        if (check.isPresent()) {
            result = new UserDTO(check.get().getUsrcd(), check.get().getUsrid(), check.get().getUsrnm());
        } else {
            return null;
        }
        return result;
    }
}
