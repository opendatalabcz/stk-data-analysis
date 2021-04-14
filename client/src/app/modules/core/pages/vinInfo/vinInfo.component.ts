import {Component, Inject, OnInit, PipeTransform} from "@angular/core";
import {FormControl} from "@angular/forms";
import {DecimalPipe} from "@angular/common";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import { InspectionsComponent } from "../inspections/inspections.component";
import {InspectionsInterface} from "../../types/inspectionsInterface";
import {InspectionsAPIService} from "../../services/inspectionsAPIservice";

/**
 * search - filter stations by query entered to textFiled 'Hledat'
 */

@Component({
  selector: "app-vins",
  templateUrl: "./vinInfo.component.html",
  styleUrls: ["./vinInfo.component.scss"]
})

/**
 * StationsComponent represents a page which contains a table with stations
 */
export class VinInfoComponent implements OnInit {
  public inspections$: Observable<InspectionsInterface[]>;

constructor(@Inject("InspectionsAPIService") private inspectionService: InspectionsAPIService) {}

  
ngOnInit(): void {
 }

 onSearchChange(text: string): void {
    this.inspections$ = this.inspectionService.getInspectionsByVin(text);
    console.log(this.inspections$)
 } 

}