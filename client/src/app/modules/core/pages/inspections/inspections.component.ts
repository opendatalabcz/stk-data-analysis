import {Component, Inject, OnInit, PipeTransform} from "@angular/core";
import {StationsAPIService} from "../../services/stationsAPIservice";
import {InspectionsAPIService} from "../../services/inspectionsAPIservice";
import {StationsInterface} from "../../types/stationsInterface";
import {InspectionsInterface} from "../../types/inspectionsInterface";
import {FormControl} from "@angular/forms";
import {DecimalPipe} from "@angular/common";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";

/**
 * search - filter stations by query entered to textFiled 'Hledat'
 */

function search(inspections: InspectionsInterface[], text: string, pipe: PipeTransform): InspectionsInterface[] {
    return inspections.filter(inspection => {
      const term = text.toLowerCase();
      let filtered;
  
      try {
        filtered = inspection.VIN.toLowerCase().includes(term)
          || inspection.engineType.toString().includes(term)
          || inspection.vehicleBrand.toLowerCase().includes(term)
          || inspection.vehicleModel.toLowerCase().includes(term)
          || inspection.vehicleType.toLowerCase().includes(term)
        //filtered = filtered.sort(compare);
      } catch (e) {
        console.log("Failed to transform operator for data: " + inspection);
      }
  
      return filtered;
    });
  }

@Component({
  selector: "app-inspections",
  templateUrl: "./inspections.component.html",
  styleUrls: ["./inspections.component.scss"]
})

/**
 * StationsComponent represents a page which contains a table with stations
 */

  export class InspectionsComponent implements OnInit {
    public filter = new FormControl('');
    public pipe: String;
    public inspections: Array<InspectionsAPIService> = [];
    public VIN: Observable<InspectionsAPIService[]>;


  constructor(@Inject("InspectionsAPIService") private inspectionService: InspectionsAPIService) {
  }

  ngOnInit(): void {
    this.inspectionService.getInspectionsByVin(String(this.VIN)).subscribe(vin => {
    //flatMap(VIN => this.inspectionService.getInspectionsByVin(String(VIN))).subscribe(inspections => {
     // this.inspections = inspections.sort();
     // this.inspections$ = this.filter.valueChanges.pipe(
     //   startWith(''),
     //   map(text => search(inspections, text, this.pipe))
     // );
     // console.log(inspections);
    });
  }

}

/*

ngOnInit(): void {
  this.stationSubscription = this.activatedRoute.paramMap
    .pipe(map(p => p.get("stationId"), delay(100)),
      flatMap(stationId => this.stationsService.getStationById(Number(stationId))))
    .subscribe(station => {
        this.station = station;
        console.log("Subscribed to: ", station);
        this.workingHours = parseWorkingHours(this.station.workingHours);
      }
    );
    */