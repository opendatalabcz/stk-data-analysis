export interface VinInfoInterface {
  id: number;
  stationId: number;
  inspectionType: InspectionType;
  VIN: string;
  inspectionDate: Date;
  engineType: string;
  vehicleBrand: string;
  vehicleType: string;
  vehicleModel: string;
  firstRegistrationDate: Date;
  mileage: number;
  defectCountA: number;
  defectCountB: number;
  defectCountC: number;
  inspectionResult: InspectionResult;
  emissionControlResult: EmissionControlResult;
}

export enum InspectionType {
  EVIDENCE = "Evidencni kontrola",
  BEFORE_REGISTRATION = "Pred registraci",
  BEFORE_REGISTRATION_REPEATED = "Pred registraci - opakovana",
  REGULAR = "pravidelna",
  ON_REQUEST = "Na zadost zakaznika",
  REPEATED = "opakovana",
  BEFORE_APPROVAL = "Pred schval. tech. zpusob. vozidla",
  BEFORE_APPROVAL_REPEATED = "Pred schval. tech. zpusob. vozidla - opakovana",
  ROAD = "Technicka silnicni kontrola",
  ROAD_AFTER_ACCIDENT = "TSK - Opakovana po DN",
  ROAD_REPEATED = "TSK - Opakovana",
  ORDERED = "Narizena technicka prohlidka",
  ADR = "ADR",
  ADR_REPEATED = "ADR - opakovana"
}

export enum InspectionResult {
  PASSED = "zpusobile",
  FAILED = "nezpusobile",
  PARTLY_PASSED = "castecne zpusobile"
}

export enum EmissionControlResult {
  PASSED = "vyhovuje",
  FAILED = "nevyhovuje",
  PARTLY_PASSED = "castecne vyhovuje",
  NOT_MEASURED = "---"
}
