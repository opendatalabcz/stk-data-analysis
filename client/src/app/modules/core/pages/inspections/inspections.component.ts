import {Component, Inject, OnInit, PipeTransform} from "@angular/core";
import {StationsAPIService} from "../../services/stationsAPIservice";
import {InspectionsAPIService} from "../../services/inspectionsAPIservice";
import {StationsInterface} from "../../types/stationsInterface";
import {InspectionsInterface} from "../../types/inspectionsInterface";
import {FormControl} from "@angular/forms";
import {DecimalPipe} from "@angular/common";
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {delay, flatMap, startWith, map} from "rxjs/operators";
import { InspectionsForm } from "../../types/inspectionsForm";

/**
 * search - filter stations by query entered to textFiled 'Hledat'
 */

// TODO, priprava do buducna

@Component({
  selector: "app-inspections",
  templateUrl: "./inspections.component.html",
  styleUrls: ["./inspections.component.scss"]
})

/**
 * StationsComponent represents a page which contains a table with stations
 */

  export class InspectionsComponent implements OnInit {
   private inspectionSubscription: Subscription;
   public inspection: InspectionsInterface = new InspectionsForm();


  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    @Inject("InspectionsAPIService") private inspectionsService: InspectionsAPIService){}

  ngOnInit(): void {
    this.inspectionSubscription = this.activatedRoute.paramMap
    .pipe(map(p => p.get("inspections"), delay(100)),
      flatMap(vin => this.inspectionsService.getInspectionsByVin(String(vin)))) //todo prerobit pre viac rokov..
    .subscribe(inspections => {
        this.inspection = inspections[0]; //todo prerobit pre viac rokov..
        console.log("Subscribed to: ", inspections);
      }
    );
  }

}
