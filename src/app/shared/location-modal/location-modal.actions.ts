import { LocationModel } from "impactdisciplescommon/src/models/domain/location.model";

export class ShowLocationModal {
  static readonly type = '[LOCATION MODAL] Show Location Modal';
  constructor(public location?: LocationModel) {}
}

export class LocationSaved {
  static readonly type = '[LOCATION MODAL] Save Location';
  constructor(public location: LocationModel) {}
}