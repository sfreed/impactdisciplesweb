import { Injectable } from "@angular/core";
import { Contact } from "../models/domain/customer.model";
import { Card } from "@stripe/stripe-js";
import { FirebaseDAO } from "impactdisciplescommon/src/dao/firebase.dao";
import { Observable } from "rxjs";


@Injectable({
  providedIn: "root",
})
export class ContactService {
  table: string = 'contacts';

  constructor(public dao: FirebaseDAO<Contact>) {}

  getAll(): Promise<Contact[]>{
    return this.dao.getAll(this.table)
  }

  streamAll(): Observable<Contact[]>{
    return this.dao.streamAll(this.table)
  }

  getAllByValue(field: string, value: any): Promise<Contact[]>{
    return this.dao.getAllByValue(this.table, field, value);
  }

  getById(id: String): Promise<Contact>{
    return this.dao.getById(id, this.table);
  }

  add(value: Contact): Promise<Contact>{
    return this.dao.add(value, this.table);
  }

  update(id: string, value: Contact): Promise<Contact>{
    return this.dao.update(id, value, this.table);
  }

  delete(id: string){
    return this.dao.delete(id, this.table);
  }
}
