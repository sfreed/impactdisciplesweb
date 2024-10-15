import { Injectable } from '@angular/core';
import { Page } from '../models/editor/page.model';
import { FirebaseDAO } from 'impactdisciplescommon/src/dao/firebase.dao';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  table: string = 'pages';

  constructor(public dao: FirebaseDAO<Page>) {}

  getAll(): Promise<Page[]>{
    return this.dao.getAll(this.table)
  }

  streamAll(): Observable<Page[]>{
    return this.dao.streamAll(this.table)
  }

  getAllByValue(field: string, value: any): Promise<Page[]>{
    return this.dao.getAllByValue(this.table, field, value);
  }

  getById(id: String): Promise<Page>{
    return this.dao.getById(id, this.table);
  }

  add(value: Page): Promise<Page>{
    return this.dao.add(value, this.table);
  }

  update(id: string, value: Page): Promise<Page>{
    return this.dao.update(id, value, this.table);
  }

  delete(id: string){
    return this.dao.delete(id, this.table);
  }
}
