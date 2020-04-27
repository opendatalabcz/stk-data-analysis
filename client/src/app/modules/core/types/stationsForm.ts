import {StationsInterface} from "./stationsInterface";

export class StationsForm implements StationsInterface {
  stationId: number = 1111;
  scopeOfApproval: string = "OA, NA, TRA, ZS, ADR";
  postalCode: string = "186 00";
  city: string = "Praha 8";
  street: string = "Türkova 1001";
  operator: string = "DEKRA CZ a.s.";
  telephoneNumber: string = "267 913 838";
  email: string = "stk@dekra.cz";
  community: string = "Praha";
  district: string = "Praha";
  region: string = "Praha";
  inspectionPrice: number = 0;
  evInspectionPrice: number = 0;
  emissionPriceB: number = 0;
  emissionPriceN: number = 0;
  workingHours: string = "";
}
