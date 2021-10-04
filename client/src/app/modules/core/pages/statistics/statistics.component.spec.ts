import {async, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {StatisticsComponent} from "./statistics.component";
import {NgApexchartsModule} from "ng-apexcharts";
import {StationsService} from "../../services/stations-service.interface";
import {Observable} from "rxjs";
import {StationsInterface} from "../../types/stationsInterface";
import {InspectionsService} from "../../services/inspections-service.interface";
import {InspectionsInterface} from "../../types/inspectionsInterface";

class TestStationsMockService implements StationsService {

  getStations(): Observable<StationsInterface[]> {
    return new Observable<StationsInterface[]>();
  }

  getStationById(stationId: number): Observable<StationsInterface> {
    return new Observable<StationsInterface>();
  }

}

class TestInspectionsMockService implements InspectionsService {
  getInspectionsByVin(VIN: string): Observable<InspectionsInterface[]> {
    throw new Error("Method not implemented.");
  }
  getInspectionsByEmissionResult(result: string): Observable<number> {
    return new Observable<number>();
  }

  getInspectionsByMonth(month: string): Observable<number> {
    return new Observable<number>();
  }

  getInspectionsByResult(result: string): Observable<number> {
    return new Observable<number>();
  }

  getInspectionsByStationId(stationId: number): Observable<InspectionsInterface[]> {
    return new Observable<InspectionsInterface[]>();
  }

  getInspectionsWithDateBefore(date: string): Observable<InspectionsInterface[]> {
    return new Observable<InspectionsInterface[]>();
  }

}

describe("StatisticsComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NgApexchartsModule
      ],
      declarations: [
        StatisticsComponent
      ],
      providers: [
        {
          provide: "StationsAPIService", useClass: TestStationsMockService
        },
        {
          provide: "InspectionsAPIService", useClass: TestInspectionsMockService
        }
      ]
    }).compileComponents();
  }));

  it("should create the component", () => {
    const fixture = TestBed.createComponent(StatisticsComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
