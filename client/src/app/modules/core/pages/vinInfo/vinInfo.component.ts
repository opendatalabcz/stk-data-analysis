import {Component, Inject, OnInit, PipeTransform} from "@angular/core";
import {StationsAPIService} from "../../services/stationsAPIservice";
import {StationsInterface} from "../../types/stationsInterface";
import {FormControl} from "@angular/forms";
import {DecimalPipe} from "@angular/common";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import { InspectionsComponent } from "../inspections/inspections.component";
import { InspectionsInterface } from "../../types/inspectionsInterface";

/**
 * search - filter stations by query entered to textFiled 'Hledat'
 */

function search(inpections: InspectionsInterface[], text: string, pipe: PipeTransform): InspectionsInterface[] {
  return inpections.filter(inpection => {
    const term = text.toLowerCase();
    let filtered;

    try {
      filtered = inpection.operator.toLowerCase().includes(term)
        || inpection.stationId.toString().includes(term)
        || inpection.city.toLowerCase().includes(term)
        || inpection.street.toLowerCase().includes(term)
    } catch (e) {
      console.log("Failed to transform operator for data: " + inpection);
    }

    return filtered;
  });
}


@Component({
  selector: "app-vins",
  templateUrl: "./vinInfo.component.html",
  styleUrls: ["./vinInfo.component.scss"]
})

/**
 * StationsComponent represents a page which contains a table with stations
 */
export class VinInfoComponent implements OnInit {
  public filter = new FormControl('');
  public pipe: DecimalPipe;
  public stations: Array<StationsInterface> = [];
  public stations$: Observable<StationsInterface[]>;
  public search: String;

//  constructor(@Inject("StationsAPIService") private stationService: StationsAPIService) {
//  }

  
  ngOnInit(): void {
      
    this.stationService.getStations().subscribe(inception => {
      this.stations = stations.sort(compare);
      this.stations$ = this.filter.valueChanges.pipe(
        startWith(''),
        map(text => search(this.stations, text, this.pipe))
      );
      console.log(stations);
      
    });
  }
  
}
