package cz.cvut.fit.stk.repo;

import cz.cvut.fit.stk.entity.Inspection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface InspectionRepository extends JpaRepository<Inspection, Long> {

    List<Inspection> findByStationId(Long stationId);

    List<Inspection> findByInspectionType(String inspectionType);

    List<Inspection> findByInspectionDateBetween(Date before, Date after);

    List<Inspection> findByInspectionDateBetweenAndStationId(Date before, Date after, Long stationId);

    List<Inspection> findByInspectionResult(String result);

    List<Inspection> findByEmissionControlResult(String result);

    List<Inspection> findByVehicleBrandIsLike(String Brand);

    List<Inspection> findByVehicleCategory(String category);

    Long countByInspectionDateBetween(Date before, Date after);
}

