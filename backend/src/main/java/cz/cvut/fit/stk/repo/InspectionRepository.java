package cz.cvut.fit.stk.repo;

import cz.cvut.fit.stk.entity.Inspection;
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
public interface InspectionRepository extends JpaRepository<Inspection, Long> {
    List<Inspection> findByStationId(Long stationId);

    List<Inspection> findByInspectionType(String inspectionType);

    List<Inspection> findByInspectionDateBetween(Date before, Date after);

    List<Inspection> findByFirstRegistrationDateBefore(Date before);

    List<Inspection> findByInspectionDateBetweenAndStationId(Date before, Date after, Long stationId);

    List<Inspection> findByInspectionResult(String result);

    List<Inspection> findByEmissionControlResult(String result);

    List<Inspection> findByVehicleBrandIsLike(String Brand);

    List<Inspection> findByVehicleCategory(String category);

    Long countByInspectionDateBetween(Date before, Date after);

    Long countByInspectionResult(String result);

    Long countByEmissionControlResult(String result);

    List<Inspection> findByVINIsContaining(String beginVIN);

}

