package cz.cvut.fit.stk.controller;

import cz.cvut.fit.stk.entity.StationInfo;
import cz.cvut.fit.stk.exception.ResourceNotFoundException;
import cz.cvut.fit.stk.repo.StationInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class StationInfoController {
    @Autowired
    private StationInfoRepository stationInfoRepository;

    @GetMapping("/info")
    public List<StationInfo> getAllStationInfos() {
        return stationInfoRepository.findAll();
    }

    @GetMapping("/info/{name}")
    public ResponseEntity<StationInfo> getStationInfoById(@PathVariable(value = "name") String stationName) throws ResourceNotFoundException {
        StationInfo station = stationInfoRepository.findById(stationName)
                .orElseThrow(() -> new ResourceNotFoundException("Stations not found for this name :: " + stationName));
        return ResponseEntity.ok().body(station);
    }

    @GetMapping("/info/city/{name}")
    public ResponseEntity<List<StationInfo>> getStationInfoByCity(@PathVariable(value = "name") String cityName) throws ResourceNotFoundException {
        List<StationInfo> stations = stationInfoRepository.findByCity(cityName);
        if (stations.isEmpty())
            throw new ResourceNotFoundException("Stations not found for this district name :: " + cityName);
        return ResponseEntity.ok().body(stations);
    }

    @GetMapping("/info/price/{price}")
    public ResponseEntity<List<StationInfo>> getStationInfoByPrice(@PathVariable(value = "price") Long price) throws ResourceNotFoundException {
        List<StationInfo> stations = stationInfoRepository.findByInspectionPriceIsLessThan(price);
        if (stations.isEmpty())
            throw new ResourceNotFoundException("Stations not found with such prices :: " + price);
        return ResponseEntity.ok().body(stations);
    }

}
