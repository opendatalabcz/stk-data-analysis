package cz.cvut.fit.stk.controller;

import cz.cvut.fit.stk.entity.Station;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 * Integration test for Station Controller
 *
 * @author Aleksandra Parkhomenko
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class StationControllerIT {

    private TestRestTemplate testRestTemplate = new TestRestTemplate();

    private String BASE_URL = "http://localhost:8080/api/";

    @Test
    public void getAllStations() {
        ResponseEntity<List> response = testRestTemplate.getForEntity(BASE_URL + "/stations", List.class);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(372, response.getBody().size());
    }

    @Test
    public void getStationById() {
        int id = 3112;
        ResponseEntity<Station> response = testRestTemplate.getForEntity(BASE_URL + "/stations/" + id, Station.class);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(id, response.getBody().getStationId());
    }

    @Test
    public void getStationByCommunity() {
        String community = "Praha";
        ResponseEntity<List> response = testRestTemplate.getForEntity(BASE_URL + "/stations/community/" + community, List.class);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(27, response.getBody().size());
    }

    @Test
    public void getStationByRegion() {
        String region = "Hlavní město Praha";
        ResponseEntity<List> response = testRestTemplate.getForEntity(BASE_URL + "/stations/region/" + region, List.class);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(27, response.getBody().size());
    }

    @Test
    public void getStationByDistrict() {
        String district = "Praha";
        ResponseEntity<List> response = testRestTemplate.getForEntity(BASE_URL + "/stations/district/" + district, List.class);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(26, response.getBody().size());
    }
}
