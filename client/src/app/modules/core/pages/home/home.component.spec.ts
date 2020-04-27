import {async, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {HomeComponent} from "./home.component";
import {StationsService} from "../../services/stations-service.interface";
import {Observable} from "rxjs";


class TestStationsMockService implements StationsService {

  getStations(): any[] {
    return [];
  }

  getStationsAsync(): Observable<any[]> {
    return undefined;
  }

}

describe("HomeComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        HomeComponent
      ]
      // ,
      // providers: [
      //   {}
      // ]
    }).compileComponents();
  }));

  it("should create the app", () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'STK'`, () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("STK");
  });

  it("should render title", () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector(".my-4").textContent).toContain("STK portál");
  });
});
