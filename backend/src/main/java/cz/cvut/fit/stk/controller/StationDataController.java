package cz.cvut.fit.stk.controller;

import cz.cvut.fit.stk.entity.StationData;
import cz.cvut.fit.stk.exception.ResourceNotFoundException;
import cz.cvut.fit.stk.repo.StationDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class StationDataController {
    @Autowired
    private StationDataRepository stationDataRepository;

    @GetMapping("/stations")
    public List<StationData> getAllStations() {
        return stationDataRepository.findAll();
    }

    @GetMapping("/stations/{id}")
    public ResponseEntity<StationData> getStationById(@PathVariable(value = "id") Long stationId) throws ResourceNotFoundException {
        StationData station = stationDataRepository.findById(stationId)
                .orElseThrow(() -> new ResourceNotFoundException("Stations not found for this id :: " + stationId));
        return ResponseEntity.ok().body(station);
    }

    @GetMapping("/stations/community/{name}")
    public ResponseEntity<List<StationData>> getStationByCommunity(@PathVariable(value = "name") String communityName) throws ResourceNotFoundException {
        List<StationData> stations = stationDataRepository.findByCommunity(communityName);
        if (stations.isEmpty())
            throw new ResourceNotFoundException("Stations not found for this community name :: " + communityName);
        return ResponseEntity.ok().body(stations);
    }

    @GetMapping("/stations/region/{name}")
    public ResponseEntity<List<StationData>> getStationByRegion(@PathVariable(value = "name") String regionName) throws ResourceNotFoundException {
        List<StationData> stations = stationDataRepository.findByRegion(regionName);
        if (stations.isEmpty())
            throw new ResourceNotFoundException("Stations not found for this region name :: " + regionName);
        return ResponseEntity.ok().body(stations);
    }

    @GetMapping("/stations/district/{name}")
    public ResponseEntity<List<StationData>> getStationByDistrict(@PathVariable(value = "name") String districtName) throws ResourceNotFoundException {
        List<StationData> stations = stationDataRepository.findByDistrict(districtName);
        if (stations.isEmpty())
            throw new ResourceNotFoundException("Stations not found for this district name :: " + districtName);
        return ResponseEntity.ok().body(stations);
    }
}
