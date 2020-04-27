package cz.cvut.fit.stk.controller;

import cz.cvut.fit.stk.entity.Inspection;
import cz.cvut.fit.stk.exception.ResourceNotFoundException;
import cz.cvut.fit.stk.repo.InspectionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.YearMonth;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class InspectionController {
    @Autowired
    private InspectionRepository inspectionRepository;

    Logger logger = LoggerFactory.getLogger(InspectionController.class);

    //never used due to the database size
    @GetMapping("/inspections")
    public List<Inspection> getAllInspections() {
        return inspectionRepository.findAll();
    }

    @GetMapping("/inspections/{id}")
    public ResponseEntity<Inspection> getInspectionById(@PathVariable(value = "id") Long inspectionId) throws ResourceNotFoundException {
        Inspection inspection = inspectionRepository.findById(inspectionId)
                .orElseThrow(() -> new ResourceNotFoundException("Inspection not found for this id :: " + inspectionId));
        logger.info("Found inspection " + inspectionId);
        return ResponseEntity.ok().body(inspection);
    }

    @GetMapping("/inspections/station/{id}")
    public ResponseEntity<List<Inspection>> getInspectionsByStationId(@PathVariable(value = "id") Long id) throws ResourceNotFoundException {
        List<Inspection> inspections = inspectionRepository.findByStationId(id);
        if (inspections.isEmpty())
            throw new ResourceNotFoundException("Inspections not found for this station id :: " + id);
        logger.info("Found " + inspections.size() + " inspections for " + id);
        return ResponseEntity.ok().body(inspections);
    }

    @GetMapping("/inspections/type/{type}")
    public ResponseEntity<List<Inspection>> getInspectionsByType(@PathVariable(value = "type") String type) throws ResourceNotFoundException {
        List<Inspection> inspections = inspectionRepository.findByInspectionType(type);
        if (inspections.isEmpty())
            throw new ResourceNotFoundException("Inspections not found for this type :: " + type);
        logger.info("Found " + inspections.size() + " inspections for " + type);
        return ResponseEntity.ok().body(inspections);
    }

    @GetMapping("/inspections/result/{result}")
    public ResponseEntity<List<Inspection>> getInspectionsByResult(@PathVariable(value = "result") String result) throws ResourceNotFoundException {
        List<Inspection> inspections = inspectionRepository.findByInspectionResult(result);
        if (inspections.isEmpty())
            throw new ResourceNotFoundException("Inspections not found for this result :: " + result);
        logger.info("Found " + inspections.size() + " inspections for " + result);
        return ResponseEntity.ok().body(inspections);
    }

    @GetMapping("/inspections/emission/{result}")
    public ResponseEntity<List<Inspection>> getInspectionsByEmissionResult(@PathVariable(value = "result") String result) throws ResourceNotFoundException {
        List<Inspection> inspections = inspectionRepository.findByEmissionControlResult(result);
        if (inspections.isEmpty())
            throw new ResourceNotFoundException("Inspections not found for this result :: " + result);
        logger.info("Found " + inspections.size() + " inspections for " + result);
        return ResponseEntity.ok().body(inspections);
    }

    @GetMapping("/inspections/brand/{name}")
    public ResponseEntity<List<Inspection>> getInspectionsByVehicleBrand(@PathVariable(value = "name") String name) throws ResourceNotFoundException {
        List<Inspection> inspections = inspectionRepository.findByVehicleBrandIsLike(name);
        if (inspections.isEmpty())
            throw new ResourceNotFoundException("Inspections not found for this vehicle brand :: " + name);
        logger.info("Found " + inspections.size() + " inspections for " + name);
        return ResponseEntity.ok().body(inspections);
    }

    @GetMapping("/inspections/category/{name}")
    public ResponseEntity<List<Inspection>> getInspectionsByVehicleCategory(@PathVariable(value = "name") String category) throws ResourceNotFoundException {
        List<Inspection> inspections = inspectionRepository.findByVehicleCategory(category);
        if (inspections.isEmpty())
            throw new ResourceNotFoundException("Inspections not found for this vehicle category :: " + category);
        logger.info("Found " + inspections.size() + " inspections for " + category);
        return ResponseEntity.ok().body(inspections);
    }

    @GetMapping("/inspections/date/{date}")
    public ResponseEntity<List<Inspection>> getInspectionsByDate(@PathVariable(value = "date") String date) throws ResourceNotFoundException, ParseException {
        Date dateBefore = new SimpleDateFormat("yyyy-MM-dd-HH-mm-ss").parse(date + "-00-00-00");
        Date dateAfter = new SimpleDateFormat("yyyy-MM-dd-HH-mm-ss").parse(date + "-23-59-59");

        List<Inspection> inspections = inspectionRepository.findByInspectionDateBetween(dateBefore, dateAfter);
        if (inspections.isEmpty())
            throw new ResourceNotFoundException("Inspections not found between " + dateBefore + " and " + dateAfter);
        logger.info("Found " + inspections.size() + " inspections between " + dateBefore + " and " + dateAfter);
        return ResponseEntity.ok().body(inspections);
    }

    @GetMapping("/inspections/month/{month}")
    public ResponseEntity<List<Inspection>> getInspectionsByMonth(@PathVariable(value = "month") String month) throws ResourceNotFoundException, ParseException {
        YearMonth yearMonthObject = YearMonth.of(2018, Integer.parseInt(month));
        Date dateBefore = new SimpleDateFormat("yyyy-MM-dd").parse("2018-" + month + "-01");
        Date dateAfter = new SimpleDateFormat("yyyy-MM-dd-HH-mm-ss").parse("2018-" + month + "-" + yearMonthObject.lengthOfMonth() + "-23-59-59");

        List<Inspection> inspections = inspectionRepository.findByInspectionDateBetween(dateBefore, dateAfter);
        if (inspections.isEmpty())
            throw new ResourceNotFoundException("Inspections not found between " + dateBefore + " and " + dateAfter);
        logger.info("Found " + inspections.size() + " inspections between " + dateBefore + " and " + dateAfter);
        return ResponseEntity.ok().body(inspections);
    }

    @GetMapping("/inspections/monthcount/{month}")
    public ResponseEntity<Long> getNumberOfInspectionsByMonth(@PathVariable(value = "month") String month) throws ResourceNotFoundException, ParseException {
        YearMonth yearMonthObject = YearMonth.of(2018, Integer.parseInt(month));
        Date dateBefore = new SimpleDateFormat("yyyy-MM-dd").parse("2018-" + month + "-01");
        Date dateAfter = new SimpleDateFormat("yyyy-MM-dd-HH-mm-ss").parse("2018-" + month + "-" + yearMonthObject.lengthOfMonth() + "-23-59-59");

        Long inspectionsCount = inspectionRepository.countByInspectionDateBetween(dateBefore, dateAfter);
        if (inspectionsCount == 0)
            throw new ResourceNotFoundException("Inspections not found between " + dateBefore + " and " + dateAfter);
        logger.info("Found " + inspectionsCount + " inspections between " + dateBefore + " and " + dateAfter);
        return ResponseEntity.ok().body(inspectionsCount);
    }

    @GetMapping("/inspections/station/{id}/{month}")
    public ResponseEntity<List<Inspection>> getInspectionsByStationAndMonth(@PathVariable(value = "id") Long stationId, @PathVariable(value = "month") String month) throws ResourceNotFoundException, ParseException {
        YearMonth yearMonthObject = YearMonth.of(2018, Integer.parseInt(month));
        Date dateBefore = new SimpleDateFormat("yyyy-MM-dd").parse("2018-" + month + "-01");
        Date dateAfter = new SimpleDateFormat("yyyy-MM-dd-HH-mm-ss").parse("2018-" + month + "-" + yearMonthObject.lengthOfMonth() + "-23-59-59");

        List<Inspection> inspections = inspectionRepository.findByInspectionDateBetweenAndStationId(dateBefore, dateAfter, stationId);
        if (inspections.isEmpty())
            throw new ResourceNotFoundException("Inspections not found between " + dateBefore + " and " + dateAfter);
        logger.info("Found " + inspections.size() + " inspections between " + dateBefore + " and " + dateAfter + " for " + stationId);
        return ResponseEntity.ok().body(inspections);
    }
}