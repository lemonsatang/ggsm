package com.pineit.ggsm.repositoryTest;

import com.pineit.ggsm.entity.USER;
import com.pineit.ggsm.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

@SpringBootTest
public class UserRepositoryTest {

    @Autowired
    UserRepository userRepository;

    @Test
    public void getUserCheck() {
        String usrid = "00001";
        String passwd = "0+";

        System.out.println(passwd);

        USER user1 = new USER(usrid, passwd);
        Optional<USER> user = userRepository.getUserCheck(user1);
        if (user.isPresent()) {
            System.out.println(user);
        } else {
            System.out.println("X");
        }
    }
}
