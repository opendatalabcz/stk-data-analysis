import {Observable} from "rxjs";
import {InspectionsInterface} from "../types/inspectionsInterface";

export interface InspectionsService {
  getInspectionsByVin(VIN: string): Observable<InspectionsInterface[]>;

  getInspectionsByStationId(stationId: number): Observable<InspectionsInterface[]>;

  getInspectionsByMonth(month: string): Observable<number>;

  getInspectionsByResult(result: string): Observable<number>;

  getInspectionsByEmissionResult(result: string): Observable<number>;

  getInspectionsWithDateBefore(date: string): Observable<InspectionsInterface[]>;
}
