
import { Injectable } from '@angular/core';
import { FirebaseDAO } from 'impactdisciplescommon/src/dao/firebase.dao';
import { Observable } from 'rxjs';
import { Product } from '../models/store/products.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  table: string = 'products';

  constructor(public dao: FirebaseDAO<Product>) {}

  getAll(): Promise<Product[]>{
    return this.dao.getAll(this.table)
  }

  streamAll(): Observable<Product[]>{
    return this.dao.streamAll(this.table)
  }

  getAllByValue(field: string, value: any): Promise<Product[]>{
    return this.dao.getAllByValue(this.table, field, value);
  }

  getById(id: String): Promise<Product>{
    return this.dao.getById(id, this.table);
  }

  add(value: Product): Promise<Product>{
    return this.dao.add(value, this.table);
  }

  update(id: string, value: Product): Promise<Product>{
    return this.dao.update(id, value, this.table);
  }

  delete(id: string){
    return this.dao.delete(id, this.table);
  }
}
