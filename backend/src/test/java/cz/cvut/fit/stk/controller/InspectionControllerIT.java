package cz.cvut.fit.stk.controller;

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
 * Integration test for Inspection Controller
 *
 * @author Aleksandra Parkhomenko
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class InspectionControllerIT {

    private TestRestTemplate testRestTemplate = new TestRestTemplate();

    private String BASE_URL = "http://localhost:8080/api/";

    @Test
    public void testGetInspectionsCountByResult() {
        String result = "nezpusobile";
        ResponseEntity<Long> response = testRestTemplate.getForEntity(BASE_URL + "/inspections/count/result/" + result, Long.class);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(26253, response.getBody());
    }

    @Test
    public void getInspectionsCountByEmissionResult() {
        String result = "nevyhovuje";
        ResponseEntity<Long> response = testRestTemplate.getForEntity(BASE_URL + "/inspections/count/emission/" + result, Long.class);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(6477, response.getBody());
    }

    @Test
    public void getNumberOfInspectionsByMonth() {
        String month = "02";
        ResponseEntity<Long> response = testRestTemplate.getForEntity(BASE_URL + "/inspections/monthcount/" + month, Long.class);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(242139, response.getBody());
    }

    @Test
    public void getInspectionsByStationAndMonth() {
        String month = "02";
        int id = 3112;
        ResponseEntity<List> response = testRestTemplate.getForEntity(BASE_URL + "/inspections/station/" + id + '/' + month, List.class);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(2489, response.getBody().size());
    }

    @Test
    public void getInspectionsByDateBefore() {
        String date = "1917-12-31";
        ResponseEntity<List> response = testRestTemplate.getForEntity(BASE_URL + "/inspections/date/before/" + date, List.class);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(9148, response.getBody().size());
    }

    @Test
    public void getInspectionsByStationId() {
        int id = 3112;
        ResponseEntity<List> response = testRestTemplate.getForEntity(BASE_URL + "/inspections/station/" + id, List.class);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(33316, response.getBody().size());
    }
}
