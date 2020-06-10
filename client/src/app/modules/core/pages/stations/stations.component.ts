import {Component, Inject, OnInit, PipeTransform} from "@angular/core";
import {StationsAPIService} from "../../services/stationsAPIservice";
import {StationsInterface} from "../../types/stationsInterface";
import {FormControl} from "@angular/forms";
import {DecimalPipe} from "@angular/common";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";

/**
 * search - filter stations by query entered to textFiled 'Hledat'
 */
function search(stations: StationsInterface[], text: string, pipe: PipeTransform): StationsInterface[] {
  return stations.filter(station => {
    const term = text.toLowerCase();
    let filtered;

    try {
      filtered = station.operator.toLowerCase().includes(term)
        || station.stationId.toString().includes(term)
        || station.city.toLowerCase().includes(term)
        || station.street.toLowerCase().includes(term)
      filtered = filtered.sort(compare);
    } catch (e) {
      console.log("Failed to transform operator for data: " + station);
    }

    return filtered;
  });
}

/**
 * compare - comparator to sort stations by inspection price
 */
function compare(a: StationsInterface, b: StationsInterface) {
  let price1 = a.inspectionPrice == 0 ? 9999 : a.inspectionPrice;
  let price2 = b.inspectionPrice == 0 ? 9999 : b.inspectionPrice;

  if (price1 > price2) return 1;
  if (price2 > price1) return -1;

  return 0;
}

@Component({
  selector: "app-stations",
  templateUrl: "./stations.component.html",
  styleUrls: ["./stations.component.scss"]
})

/**
 * StationsComponent represents a page which contains a table with stations
 */
export class StationsComponent implements OnInit {
  public filter = new FormControl('');
  public pipe: DecimalPipe;
  public stations: Array<StationsInterface> = [];
  public stations$: Observable<StationsInterface[]>;

  constructor(@Inject("StationsAPIService") private stationService: StationsAPIService) {
  }

  ngOnInit(): void {
    this.stationService.getStations().subscribe(stations => {
      this.stations = stations.sort(compare);
      this.stations$ = this.filter.valueChanges.pipe(
        startWith(''),
        map(text => search(this.stations, text, this.pipe))
      );
      console.log(stations);
    });
  }
}
