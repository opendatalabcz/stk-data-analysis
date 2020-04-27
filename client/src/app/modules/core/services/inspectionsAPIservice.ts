import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {InspectionsService} from "./inspections-service.interface";
import {Observable} from "rxjs";
import {BACKEND_URL} from "../../../_shared/globals";
import {InspectionsInterface} from "../types/inspectionsInterface";

@Injectable()
export class InspectionsAPIService implements InspectionsService {
  constructor(private http: HttpClient) {
  }

  getInspectionsByStationId(stationId: number): Observable<InspectionsInterface[]> {
    stationId = stationId.toString().length == 3 ? stationId * 10 : stationId;
    console.log("Sending request to " + BACKEND_URL + "inspections/station/" + stationId);
    return this.http.get<InspectionsInterface[]>(BACKEND_URL + "inspections/station/" + stationId);
  }

  getInspectionsByMonth(month: string): Observable<number> {
    console.log("Sending request to " + BACKEND_URL + "inspections/monthcount/" + month);
    return this.http.get<number>(BACKEND_URL + "inspections/monthcount/" + month);
  }
}
