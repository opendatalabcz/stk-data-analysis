import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {VinInfoService} from "./vinInfo-service.interface";
import {Observable} from "rxjs";
import {BACKEND_URL} from "../../../_shared/globals";
import {VinInfoInterface} from "../types/vinInfoInterface";

@Injectable()
export class VinInfoAPIService implements VinInfoService {
  constructor(private http: HttpClient) {
  }

  getVinInfoByVin(VIN: string): Observable<VinInfoInterface[]> {
    console.log("Sending request to " + BACKEND_URL + "vinInfo/"+ VIN);
    return this.http.get<VinInfoInterface[]>(BACKEND_URL + "vinInfo/" + VIN);
  }

}
