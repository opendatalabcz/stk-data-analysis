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
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * This class represents a REST controller for table containing inspections
 *
 * @author Aleksandra Parkhomenko
 */

@RestController
@CrossOrigin
@RequestMapping("/api")
public class InspectionController {
    @Autowired
    private InspectionRepository inspectionRepository;

    Logger logger = LoggerFactory.getLogger(InspectionController.class);

    /**
     * get all of the inspections - never used due to the database size
     *
     */
    @GetMapping("/inspections")
    public List<Inspection> getAllInspections() {
        return inspectionRepository.findAll();
    }

    /**
     * get single inspection by id
     *
     * @param inspectionId
     * @throws ResourceNotFoundException
     */
    @GetMapping("/inspections/{id}")
    public ResponseEntity<Inspection> getInspectionById(@PathVariable(value = "id") Long inspectionId) throws ResourceNotFoundException {
        Inspection inspection = inspectionRepository.findById(inspectionId)
                .orElseThrow(() -> new ResourceNotFoundException("Inspection not found for this id :: " + inspectionId));
        logger.info("Found inspection " + inspectionId);
        return ResponseEntity.ok().body(inspection);
    }

    /**
     * get all inspections recorded on specific station
     *
     * @param id
     * @throws ResourceNotFoundException
     */
    @GetMapping("/inspections/station/{id}")
    public ResponseEntity<List<Inspection>> getInspectionsByStationId(@PathVariable(value = "id") Long id) throws ResourceNotFoundException {
        List<Inspection> inspections = inspectionRepository.findByStationId(id);
        if (inspections.isEmpty())
            throw new ResourceNotFoundException("Inspections not found for this station id :: " + id);
        logger.info("Found " + inspections.size() + " inspections for " + id);
        return ResponseEntity.ok().body(inspections);
    }

    /**
     * get inspections by inspection type
     *
     * @param type
     * @throws ResourceNotFoundException
     */
    @GetMapping("/inspections/type/{type}")
    public ResponseEntity<List<Inspection>> getInspectionsByType(@PathVariable(value = "type") String type) throws ResourceNotFoundException {
        List<Inspection> inspections = inspectionRepository.findByInspectionType(type);
        if (inspections.isEmpty())
            throw new ResourceNotFoundException("Inspections not found for this type :: " + type);
        logger.info("Found " + inspections.size() + " inspections for " + type);
        return ResponseEntity.ok().body(inspections);
    }

    /**
     * get inspections by inspection result
     *
     * @param result
     * @throws ResourceNotFoundException
     */
    @GetMapping("/inspections/result/{result}")
    public ResponseEntity<List<Inspection>> getInspectionsByResult(@PathVariable(value = "result") String result) throws ResourceNotFoundException {
        List<Inspection> inspections = inspectionRepository.findByInspectionResult(result);
        if (inspections.isEmpty())
            throw new ResourceNotFoundException("Inspections not found for this result :: " + result);
        logger.info("Found " + inspections.size() + " inspections for " + result);
        return ResponseEntity.ok().body(inspections);
    }

    /**
     * get inspections by emission control result
     *
     * @param result
     * @throws ResourceNotFoundException
     */
    @GetMapping("/inspections/emission/{result}")
    public ResponseEntity<List<Inspection>> getInspectionsByEmissionResult(@PathVariable(value = "result") String result) throws ResourceNotFoundException {
        List<Inspection> inspections = inspectionRepository.findByEmissionControlResult(result);
        if (inspections.isEmpty())
            throw new ResourceNotFoundException("Inspections not found for this result :: " + result);
        logger.info("Found " + inspections.size() + " inspections for " + result);
        return ResponseEntity.ok().body(inspections);
    }

    /**
     * get inspections by vehicle brand
     *
     * @param name
     * @throws ResourceNotFoundException
     */
    @GetMapping("/inspections/brand/{name}")
    public ResponseEntity<List<Inspection>> getInspectionsByVehicleBrand(@PathVariable(value = "name") String name) throws ResourceNotFoundException {
        List<Inspection> inspections = inspectionRepository.findByVehicleBrandIsLike(name);
        if (inspections.isEmpty())
            throw new ResourceNotFoundException("Inspections not found for this vehicle brand :: " + name);
        logger.info("Found " + inspections.size() + " inspections for " + name);
        return ResponseEntity.ok().body(inspections);
    }

    /**
     * get inspections by vehicle category
     *
     * @param category
     * @throws ResourceNotFoundException
     */
    @GetMapping("/inspections/category/{name}")
    public ResponseEntity<List<Inspection>> getInspectionsByVehicleCategory(@PathVariable(value = "name") String category) throws ResourceNotFoundException {
        List<Inspection> inspections = inspectionRepository.findByVehicleCategory(category);
        if (inspections.isEmpty())
            throw new ResourceNotFoundException("Inspections not found for this vehicle category :: " + category);
        logger.info("Found " + inspections.size() + " inspections for " + category);
        return ResponseEntity.ok().body(inspections);
    }

    /**
     * get inspections recorded on a specific date
     *
     * @param date
     * @throws ResourceNotFoundException
     * @throws ParseException
     */
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

    /**
     * get inspections recorded before specific date
     *
     * @param date
     * @throws ResourceNotFoundException
     * @throws ParseException
     */
    @GetMapping("/inspections/date/before/{date}")
    public ResponseEntity<List<Inspection>> getInspectionsByDateBefore(@PathVariable(value = "date") String date) throws ResourceNotFoundException, ParseException {
        Date dateBefore = new SimpleDateFormat("yyyy-MM-dd-HH-mm-ss").parse(date + "-00-00-00");

        List<Inspection> inspections = inspectionRepository.findByFirstRegistrationDateBefore(dateBefore);
        if (inspections.isEmpty())
            throw new ResourceNotFoundException("Inspections not found before " + dateBefore);
        logger.info("Found " + inspections.size() + " inspections before " + dateBefore);
        return ResponseEntity.ok().body(inspections);
    }

    /**
     * get inspections by month
     *
     * @param month
     * @throws ResourceNotFoundException
     * @throws ParseException
     */
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

    /**
     * get inspections count by month
     *
     * @param month
     * @throws ResourceNotFoundException
     * @throws ParseException
     */
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

    /**
     * get inspections by station id and month
     *
     * @param stationId
     * @param month
     * @throws ResourceNotFoundException
     * @throws ParseException
     */
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

    /**
     * get inspections count by inspection result
     *
     * @param result
     * @throws ResourceNotFoundException
     */
    @GetMapping("/inspections/count/result/{result}")
    public ResponseEntity<Long> getInspectionsCountByResult(@PathVariable(value = "result") String result) throws ResourceNotFoundException {
        Long inspectionsCount = inspectionRepository.countByInspectionResult(result);
        if (inspectionsCount == 0)
            throw new ResourceNotFoundException("Inspectio4ns not found for result: " + result);
        logger.info("Found " + inspectionsCount + " inspections for result: " + result);
        return ResponseEntity.ok().body(inspectionsCount);
    }

    /**
     * get inspections count by emission control result
     *
     * @param result
     * @throws ResourceNotFoundException
     */
    @GetMapping("/inspections/count/emission/{result}")
    public ResponseEntity<Long> getInspectionsCountByEmissionResult(@PathVariable(value = "result") String result) throws ResourceNotFoundException {
        Long inspectionsCount = inspectionRepository.countByEmissionControlResult(result);
        if (inspectionsCount == 0)
            throw new ResourceNotFoundException("Inspectio4ns not found for result: " + result);
        logger.info("Found " + inspectionsCount + " inspections for result: " + result);
        return ResponseEntity.ok().body(inspectionsCount);
    }


   // @GetMapping("/inspections/vin/{VIN}")
   @GetMapping("/vinInfo/{VIN}")
    public ResponseEntity<List<Inspection>> getInspectionsByVin(@PathVariable(value = "VIN") String VIN) throws ResourceNotFoundException {
        if (VIN.length() <= 4) {
            return ResponseEntity.ok().body(new ArrayList<>());
        }
        List<Inspection> inspections = inspectionRepository.findByVINIsContaining(VIN);
        if (inspections.isEmpty())
            throw new ResourceNotFoundException("Inspections not found for this station id :: " + VIN);
        logger.info("Found " + inspections.size() + " inspections for " + VIN);
        return ResponseEntity.ok().body(inspections);
    }
}