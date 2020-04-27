import {EmissionControlResult, InspectionResult, InspectionsInterface, InspectionType} from "./inspectionsInterface";

export class InspectionsForm implements InspectionsInterface {
  id: number = 3687702;
  stationId: number = 3100;
  inspectionType: InspectionType = InspectionType.REGULAR;
  VIN: string = "VF1KMSEB638840472";
  inspectionDate: Date = new Date("2018-09-07T09:26:31.347+0000");
  engineType: string = "UFBA";
  vehicleBrand: string = "FORD";
  vehicleType: string = "OSOBNI AUTOMOBIL";
  vehicleModel: string = "MONDEO";
  firstRegistrationDate: Date = new Date("2010-09-22T22:00:00.000+0000");
  mileage: number = 126952;
  defectCountA: number = 1;
  defectCountB: number = 0;
  defectCountC: number = 0;
  inspectionResult: InspectionResult = InspectionResult.PASSED;
  emissionControlResult: EmissionControlResult = EmissionControlResult.PASSED;
}
