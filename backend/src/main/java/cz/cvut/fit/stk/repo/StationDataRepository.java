package cz.cvut.fit.stk.repo;

import cz.cvut.fit.stk.entity.StationData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StationDataRepository extends JpaRepository<StationData, Long> {

    List<StationData> findByCommunity(String community);

    List<StationData> findByRegion(String region);

    List<StationData> findByDistrict(String district);
}
