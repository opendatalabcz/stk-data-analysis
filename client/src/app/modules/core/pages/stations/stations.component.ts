import {Component, Inject, OnInit, PipeTransform} from "@angular/core";
import {StationsAPIService} from "../../services/stationsAPIservice";
import {StationsInterface} from "../../types/stationsInterface";
import {FormControl} from "@angular/forms";
import {DecimalPipe} from "@angular/common";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";

function search(stations: StationsInterface[], text: string, pipe: PipeTransform): StationsInterface[] {
  return stations.filter(station => {
    const term = text.toLowerCase();
    let filtered;

    try {
      filtered = station.operator.toLowerCase().includes(term)
        || station.stationId.toString().includes(term)
        || station.city.toLowerCase().includes(term)
        || station.street.toLowerCase().includes(term)
    } catch (e) {
      console.log("Failed to transform operator for data: " + station);
    }

    return filtered;
  });
}

@Component({
  selector: "app-stations",
  templateUrl: "./stations.component.html",
  styleUrls: ["./stations.component.scss"]
})
export class StationsComponent implements OnInit {
  title = "STK";
  filter = new FormControl('');
  pipe: DecimalPipe;
  stations: Array<StationsInterface> = [];
  stations$: Observable<StationsInterface[]>;

  constructor(@Inject("StationsAPIService") private stationService: StationsAPIService) {
  }

  ngOnInit(): void {
    this.stationService.getStations().subscribe(stations => {
      this.stations = stations;
      this.stations$ = this.filter.valueChanges.pipe(
        startWith(''),
        map(text => search(this.stations, text, this.pipe))
      );
      console.log(stations);
    });
  }
}
