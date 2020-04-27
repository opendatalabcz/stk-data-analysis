package cz.cvut.fit.stk.repo;

import cz.cvut.fit.stk.entity.StationInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StationInfoRepository extends JpaRepository<StationInfo, String> {

    List<StationInfo> findByCity(String city);

    List<StationInfo> findByInspectionPriceIsLessThan(Long price);
}
