package cz.cvut.fit.stk.repo;

import cz.cvut.fit.stk.entity.VinInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

/**
 * This class represents Inspection Repository whicn extends JpaRepository and contains simple API for database requests
 *
 * @author Aleksandra Parkhomenko
 */

@Repository
public interface VinInfoRepository extends JpaRepository<VinInfo, Long> {
    List<VinInfo> findByStationId(Long stationId);

    List<VinInfo> findByInspectionType(String inspectionType);

    List<VinInfo> findByInspectionDateBetween(Date before, Date after);

    List<VinInfo> findByFirstRegistrationDateBefore(Date before);

    List<VinInfo> findByInspectionDateBetweenAndStationId(Date before, Date after, Long stationId);

    List<VinInfo> findByInspectionResult(String result);

    List<VinInfo> findByEmissionControlResult(String result);

    List<VinInfo> findByVehicleBrandIsLike(String Brand);

    List<VinInfo> findByVehicleCategory(String category);

    Long countByInspectionDateBetween(Date before, Date after);

    Long countByInspectionResult(String result);

    Long countByEmissionControlResult(String result);

    List<VinInfo> findByVINIsContaining(String beginVIN);

}

