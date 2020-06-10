import {async, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {SuspiciousBehaviourComponent} from "./suspicious-behaviour.component";
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

describe("SuspiciousBehaviourComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NgApexchartsModule
      ],
      declarations: [
        SuspiciousBehaviourComponent
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
    const fixture = TestBed.createComponent(SuspiciousBehaviourComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
