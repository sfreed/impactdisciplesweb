import { OrganizationModel } from "impactdisciplescommon/src/models/domain/organization.model";

export class ShowOrganizationModal {
  static readonly type = '[ORGANIZATION MODAL] Show Organization Modal';
  constructor(public organization?: OrganizationModel) {}
}

export class OrganizationSaved {
  static readonly type = '[ORGANIZATION MODAL] Save Organization';
  constructor(public organization: OrganizationModel) {}
}