import { Injectable } from '@angular/core';
import { UserPermission } from '../models/util/user-permission.model';
import { JBH_APPLICATIONS } from '../lists/jbh_applications.enum';
import { TracerDAO } from '../dao/tracer.dao';

@Injectable({
  providedIn: 'root'
})
export class UserPermissionService {
  private readonly agentCollectionPath = 'agents';
  private readonly associationCollectionPath = 'user-permissions';

  constructor(public dao: TracerDAO<UserPermission>) {

  }  

  public getAll(agentId: string): Promise<UserPermission[]> {
    return this.dao.getAll('user_permissions');
  }

  public getAllByValue(field: string, value: any): Promise<UserPermission[]> {
    return this.dao.getAllByValue('user_permissions', field, value);
  }

  public create(data: UserPermission) {
    return this.dao.add(data, 'user_permissions');
  }

  public update(id: string, data: UserPermission) {
    return this.dao.update(id, data, 'user_permissions');
  }

  public delete(id: string) {
    return this.dao.delete(id, 'user_permissions');
  }

  isUserPermittedinTracer(dbId: string): Promise<boolean>{
    return this.getAll(dbId).then(permissions => {
      let p = permissions.filter(permission => permission.application == JBH_APPLICATIONS.TRACER)

      if(p.length == 1 && p[0].isEnabled){
        return true;
      } else {
        return false;
      }
    })
  }

  isUserPermittedinLoadBoard(dbId: string): Promise<boolean>{
    return this.getAll(dbId).then(permissions => {
      let p = permissions.filter(permission => permission.application == JBH_APPLICATIONS.LOADBOARD)

      if(p.length == 1 && p[0].isEnabled){
        return true;
      } else {
        return false;
      }
    })
  }

  private getCollectionPath(agentId: string) {
    return [this.agentCollectionPath, agentId, this.associationCollectionPath].join('/');
  }
}
