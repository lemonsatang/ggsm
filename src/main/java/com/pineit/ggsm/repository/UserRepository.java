package com.pineit.ggsm.repository;

import com.pineit.ggsm.entity.USER;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<USER, String> {

    @Query(value = "SELECT * FROM CVMAST WHERE CVCOD = :#{#param.cvcod} AND PASSWD = HASHBYTES('SHA2_256', CONVERT(VARCHAR, :#{#param.passwd})) ", nativeQuery = true)
    Optional<USER> getUserCheck(@Param("param") USER user);

}
