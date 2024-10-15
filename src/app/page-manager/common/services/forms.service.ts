import {  Injectable } from '@angular/core';
import { Form } from '../models/editor/form.model';
import { Observable } from 'rxjs';
import { FirebaseDAO } from 'impactdisciplescommon/src/dao/firebase.dao';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  table: string = 'forms';

  constructor(public dao: FirebaseDAO<Form>) {}

  getAll(): Promise<Form[]>{
    return this.dao.getAll(this.table)
  }

  streamAll(): Observable<Form[]>{
    return this.dao.streamAll(this.table)
  }

  getAllByValue(field: string, value: any): Promise<Form[]>{
    return this.dao.getAllByValue(this.table, field, value);
  }

  getById(id: String): Promise<Form>{
    return this.dao.getById(id, this.table);
  }

  add(value: Form): Promise<Form>{
    return this.dao.add(value, this.table);
  }

  update(id: string, value: Form): Promise<Form>{
    return this.dao.update(id, value, this.table);
  }

  delete(id: string){
    return this.dao.delete(id, this.table);
  }

  public getFormResults(id: string){
    return this.dao.getAllFromSubCollection(this.table, id, 'submitted');
  }

  saveSubmittedForm(formId:string, value: any){
    return this.dao.createInSubcollection(value, this.table, formId, 'submitted');
  }
}
