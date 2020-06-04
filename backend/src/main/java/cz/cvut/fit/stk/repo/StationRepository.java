package cz.cvut.fit.stk.repo;

import cz.cvut.fit.stk.entity.Station;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * This class represents Station Repository whicn extends JpaRepository and contains simple API for database requests
 *
 * @author Aleksandra Parkhomenko
 */

@Repository
public interface StationRepository extends JpaRepository<Station, Long> {
    List<Station> findByCommunity(String community);

    List<Station> findByRegion(String region);

    List<Station> findByDistrict(String district);
}
