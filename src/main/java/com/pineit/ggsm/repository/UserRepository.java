package com.pineit.ggsm.repository;

import com.pineit.ggsm.entity.USER;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<USER, String> {

    @Query(value = "SELECT * FROM CVMAST WHERE CVCOD = :#{#param.cvcod} AND PASSWD = HASHBYTES('SHA2_256', CONVERT(VARCHAR, :#{#param.passwd})) ", nativeQuery = true)
    Optional<USER> getUserCheck(@Param("param") USER user);

    @Modifying
    @Query(value = "UPDATE CVMAST SET ADDR1 = :#{#param.addr1}, ADDR2 = :#{#param.addr2}, UPTAE = :#{#param.uptae}, JONGK = :#{#param.jongk}, OWNAM = :#{#param.ownam}, SANO = :#{#param.sano}, ZIPCD= :#{#param.zipcd} WHERE CVCOD = :#{#param.cvcod}", nativeQuery = true)
    int udtUserNew(@Param("param") USER user);

    @Modifying
    @Query(value = "UPDATE CVMAST SET ADDR1 = :#{#param.addr1}, ADDR2 = :#{#param.addr2}, UPTAE = :#{#param.uptae}, JONGK = :#{#param.jongk}, OWNAM = :#{#param.ownam}, SANO = :#{#param.sano}, ZIPCD= :#{#param.zipcd}, PASSWD = HASHBYTES('SHA2_256', CONVERT(VARCHAR, :#{#param.passwd})) WHERE CVCOD = :#{#param.cvcod}", nativeQuery = true)
    int udtUser(@Param("param") USER user);

}
