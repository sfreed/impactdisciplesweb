import { Injectable } from '@angular/core';
import { Card } from '../models/editor/card.model';
import { FirebaseDAO } from 'impactdisciplescommon/src/dao/firebase.dao';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CardService{
  table: string = 'cards';

  constructor(public dao: FirebaseDAO<Card>) {}

  getAll(): Promise<Card[]>{
    return this.dao.getAll(this.table)
  }

  streamAll(): Observable<Card[]>{
    return this.dao.streamAll(this.table)
  }

  getAllByValue(field: string, value: any): Promise<Card[]>{
    return this.dao.getAllByValue(this.table, field, value);
  }

  getById(id: String): Promise<Card>{
    return this.dao.getById(id, this.table);
  }

  add(value: Card): Promise<Card>{
    return this.dao.add(value, this.table);
  }

  update(id: string, value: Card): Promise<Card>{
    return this.dao.update(id, value, this.table);
  }

  delete(id: string){
    return this.dao.delete(id, this.table);
  }
}
