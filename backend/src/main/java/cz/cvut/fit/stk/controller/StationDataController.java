package cz.cvut.fit.stk.controller;

import cz.cvut.fit.stk.entity.Station;
import cz.cvut.fit.stk.exception.ResourceNotFoundException;
import cz.cvut.fit.stk.repo.StationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * This class represents a REST controller for table containing stations
 *
 * @author Aleksandra Parkhomenko
 *
 */

@RestController
@CrossOrigin
@RequestMapping("/api")
public class StationDataController {
    @Autowired
    private StationRepository stationRepository;

    /**
     * get all stations
     *
     */
    @GetMapping("/stations")
    public List<Station> getAllStations() {
        return stationRepository.findAll();
    }

    /**
     * get station by id
     *
     * @param stationId
     * 
     * @throws ResourceNotFoundException
     */
    @GetMapping("/stations/{id}")
    public ResponseEntity<Station> getStationById(@PathVariable(value = "id") Long stationId) throws ResourceNotFoundException {
        Station station = stationRepository.findById(stationId)
                .orElseThrow(() -> new ResourceNotFoundException("Stations not found for this id :: " + stationId));
        return ResponseEntity.ok().body(station);
    }

    /**
     * get stations by community
     *
     * @param communityName
     * @throws ResourceNotFoundException
     */
    @GetMapping("/stations/community/{name}")
    public ResponseEntity<List<Station>> getStationByCommunity(@PathVariable(value = "name") String communityName) throws ResourceNotFoundException {
        List<Station> stations = stationRepository.findByCommunity(communityName);
        if (stations.isEmpty())
            throw new ResourceNotFoundException("Stations not found for this community name :: " + communityName);
        return ResponseEntity.ok().body(stations);
    }

    /**
     * get stations by region
     *
     * @param regionName
     * @throws ResourceNotFoundException
     */
    @GetMapping("/stations/region/{name}")
    public ResponseEntity<List<Station>> getStationByRegion(@PathVariable(value = "name") String regionName) throws ResourceNotFoundException {
        List<Station> stations = stationRepository.findByRegion(regionName);
        if (stations.isEmpty())
            throw new ResourceNotFoundException("Stations not found for this region name :: " + regionName);
        return ResponseEntity.ok().body(stations);
    }

    /**
     * get stations by district
     *
     * @param districtName
     * @throws ResourceNotFoundException
     */
    @GetMapping("/stations/district/{name}")
    public ResponseEntity<List<Station>> getStationByDistrict(@PathVariable(value = "name") String districtName) throws ResourceNotFoundException {
        List<Station> stations = stationRepository.findByDistrict(districtName);
        if (stations.isEmpty())
            throw new ResourceNotFoundException("Stations not found for this district name :: " + districtName);
        return ResponseEntity.ok().body(stations);
    }
}
