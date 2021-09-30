import {ErrorHandler, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {VinInfoService} from "./vinInfo-service.interface";
import {Observable} from "rxjs";
import {BACKEND_URL} from "../../../_shared/globals";
import {VinInfoInterface} from "../types/vinInfoInterface";
import { variable } from "@angular/compiler/src/output/output_ast";

@Injectable()
export class VinInfoAPIService implements VinInfoService {
  constructor(private http: HttpClient) {
  }

  getVinInfoByVin(VIN: string): Observable<VinInfoInterface[]> {

    if (VIN && VIN.length > 9)
    {
      document.getElementsByTagName("body")[1].classList.add("loading");

      console.log("Sending request to " + BACKEND_URL + "vinInfo/"+ VIN);
      var data = this.http.get<VinInfoInterface[]>(BACKEND_URL + "vinInfo/" + VIN)

      data.subscribe(result => document.getElementsByTagName("body")[1].classList.remove("loading"));
      return data;
    }
    
  }

}
