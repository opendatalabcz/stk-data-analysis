import {Injectable} from "@angular/core";
import {StationsInterface} from "../types/stationsInterface";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {StationsService} from "./stations-service.interface";
import {BACKEND_URL} from "../../../_shared/globals";

@Injectable()
export class StationsAPIService implements StationsService {
  constructor(private http: HttpClient) {
  }

  getStations() {
    console.log("Sending request to " + BACKEND_URL + "stations/");
    return this.http.get<StationsInterface[]>(BACKEND_URL + "stations/");
  }

  getStationById(stationId: number): Observable<StationsInterface> {
    console.log("Sending request to " + BACKEND_URL + "stations/" + stationId);
    return this.http.get<StationsInterface>(BACKEND_URL + "stations/" + stationId);
  }
}
