import { Injectable } from '@angular/core';
import { MenuItem } from '../models/editor/menu.model';
import { FirebaseDAO } from 'impactdisciplescommon/src/dao/firebase.dao';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  table: string = 'menu';

  constructor(public dao: FirebaseDAO<MenuItem>) {}

  getAll(): Promise<MenuItem[]>{
    return this.dao.getAll(this.table)
  }

  streamAll(): Observable<MenuItem[]>{
    return this.dao.streamAll(this.table)
  }

  getAllByValue(field: string, value: any): Promise<MenuItem[]>{
    return this.dao.getAllByValue(this.table, field, value);
  }

  getById(id: string): Promise<MenuItem>{
    return this.dao.getById(id, this.table);
  }

  add(value: MenuItem): Promise<MenuItem>{
    return this.dao.add(value, this.table);
  }

  update(id: string, value: MenuItem): Promise<MenuItem>{
    return this.dao.update(id, value, this.table);
  }

  delete(id: string){
    return this.dao.delete(id, this.table);
  }
}
