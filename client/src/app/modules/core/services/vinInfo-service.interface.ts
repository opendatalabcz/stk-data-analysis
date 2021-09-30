import {Observable} from "rxjs";
import {VinInfoInterface} from "../types/vinInfoInterface";

export interface VinInfoService {
    getVinInfoByVin(VIN: string): Observable<VinInfoInterface[]>;
}
