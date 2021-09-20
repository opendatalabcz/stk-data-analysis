package cz.cvut.fit.stk.controller;

import cz.cvut.fit.stk.entity.Inspection;
import cz.cvut.fit.stk.entity.Log;
import cz.cvut.fit.stk.entity.VinInfo;
import cz.cvut.fit.stk.exception.ResourceNotFoundException;
import cz.cvut.fit.stk.repo.InspectionRepository;
import cz.cvut.fit.stk.repo.LogRepository;
import cz.cvut.fit.stk.repo.VinInfoRepository;
import org.hibernate.Hibernate;
import org.hibernate.sql.Insert;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.server.Session;
import org.springframework.data.jpa.provider.HibernateUtils;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.sql.Timestamp;
import java.time.Instant;

/**
 * This class represents a REST controller for table containing inspections
 *
 * @author Aleksandra Parkhomenko
 */

@RestController
@CrossOrigin
@RequestMapping("/api")
public class VinInfoController {
    @Autowired
    private VinInfoRepository VinInfoRepository;

    @Autowired
    private LogRepository logRepository;

    Logger logger = LoggerFactory.getLogger(InspectionController.class);

    @GetMapping("/vinInfo/{VIN}")
    public ResponseEntity<List<VinInfo>> getVinInfoByVin(@PathVariable(value = "VIN") String VIN) throws ResourceNotFoundException {
        if (VIN.length() <= 9) {
            return ResponseEntity.ok().body(new ArrayList<>());
        }
        List<VinInfo> vinInfos = VinInfoRepository.findByVINIsContaining(VIN);
        if (vinInfos.isEmpty())
            throw new ResourceNotFoundException("Inspections not found for this station id :: " + VIN);
        logger.info("Found " + vinInfos.size() + " inspections for " + VIN);


        Timestamp timestamp = new Timestamp(System.currentTimeMillis());

        Log log = new Log();
        log.setLogsVIN(VIN);
        log.setLogsTimestamp(timestamp);
        logRepository.save(log);

        return ResponseEntity.ok().body(vinInfos);
    }
}