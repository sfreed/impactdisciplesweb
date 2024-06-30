import { JBH_APPLICATIONS } from '../../lists/jbh_applications.enum';
import { BaseModel } from '../BaseModel';

export class UserPermission extends BaseModel {
  owner: string;
  application: JBH_APPLICATIONS;
  isEnabled: boolean = false;
  role: string[] = [];
}
