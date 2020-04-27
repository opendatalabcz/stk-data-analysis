import {Observable} from "rxjs";
import {InspectionsInterface} from "../types/inspectionsInterface";

export interface InspectionsService {
  getInspectionsByStationId(stationId: number): Observable<InspectionsInterface[]>;

  getInspectionsByMonth(month: string): Observable<number>;
}
