import {Component, Inject, OnInit, PipeTransform} from "@angular/core";
import {FormControl} from "@angular/forms";
import {DecimalPipe} from "@angular/common";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import { InspectionsComponent } from "../inspections/inspections.component";
import {VinInfoInterface} from "../../types/vinInfoInterface";
import {VinInfoAPIService} from "../../services/vinInfoAPIservice";

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
  public vinInfos$: Observable<VinInfoInterface[]>;

constructor(@Inject("VinInfoAPIService") private vinInfoService: VinInfoAPIService) {}

  
ngOnInit(): void {
 }

 onSearchChange(text: string): void {    
    this.vinInfos$ = this.vinInfoService.getVinInfoByVin(text);
    var data = this.vinInfos$

    console.log(this.vinInfos$)
}
    //document.getElementById("error").style.display="";
    
}
