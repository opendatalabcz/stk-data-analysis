import {async, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {StationsComponent} from "./stations.component";
import {ZeroToDashPipe} from "../../types/pipes/ZeroToDash.pipe";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {StationsAPIService} from "../../services/stationsAPIservice";
import {StationsService} from "../../services/stations-service.interface";
import {Observable} from "rxjs";
import {StationsInterface} from "../../types/stationsInterface";

class TestStationsMockService implements StationsService {

  getStations(): Observable<StationsInterface[]> {
    return new Observable<StationsInterface[]>();
  }

  getStationById(stationId: number): Observable<StationsInterface> {
    return new Observable<StationsInterface>();
  }

}

describe("StationsComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [
        StationsComponent,
        ZeroToDashPipe
      ],
      providers: [
        {
          provide: "StationsAPIService", useClass: TestStationsMockService
        },
      ]
    }).compileComponents();
  }));

  it("should create the component", () => {
    const fixture = TestBed.createComponent(StationsComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
