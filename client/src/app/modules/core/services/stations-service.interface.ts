import {Observable} from "rxjs";
import {StationsInterface} from "../types/stationsInterface";

export interface StationsService {

  getStations(): Observable<StationsInterface[]>;

  getStationById(stationId: number): Observable<StationsInterface>;
}
