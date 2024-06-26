import { Injectable, inject } from '@angular/core';
import { QueryConstraint, addDoc, collectionData, deleteDoc, doc, getDoc, getDocs, query, setDoc, where } from '@angular/fire/firestore';
import { Firestore, collection } from '@angular/fire/firestore';
import { BaseModel } from '../models/base.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TestData } from '../models/util/test-data.model';
import { DocumentData, onSnapshot, updateDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class TracerDAO<T extends BaseModel> {

  constructor(public fs: Firestore ) {}

  getAll(table: string): Promise<T[]>{    
    return getDocs(collection(this.fs, '/' + table)).then(docs => {
      let retval: T[] = [];

      docs.forEach(doc => {
        let val: T = doc.data() as T;
        val.id = doc.id;
        retval.push(val);
      })

      return retval;
    });
  }

  getAllByValue(table: string, field: string, value: any): Promise<T[]>{    
    const q = query(collection(this.fs, '/' + table), where(field, "==", value));

    return getDocs(q).then(docs => {
      let retval: T[] = [];

      docs.forEach(doc => {
        let val: T = doc.data() as T;
        val.id = doc.id;
        retval.push(val);
      })

      return retval;
    });
  }

  getById(id: String, table: string): Promise<T>{
    let docRef = doc(this.fs, '/' + table + '/' + id);
    return getDoc(docRef).then(doc => {
      return doc.data() as T;
    });
  }

  async getByValue(table: string, queries: QueryParam[], sortField?: string): Promise<TestData[]>{
      const queryConstraints: QueryConstraint[] = queries.map((query) =>
        where(query.field, query.operation, query.value)
      );
  
      const docRef = collection(this.fs, table);

      const documentQuery = query(docRef, ...queryConstraints);
  
      const snap = await getDocs(documentQuery);
  
      const docsData = snap.docs.map((item) => item.data() as TestData);

      if (sortField) {
        docsData.sort((a: TestData, b: TestData) => a.order - b.order);
      }
  
      return docsData;
  }

  localeCompareOptions = {
    numeric: true,
    sensitivity: Intl.NumberFormat, 
    ignorePunctuation: true,
  };

  add(value: T, table: string): Promise<T>{
    return addDoc(collection(this.fs, '/' + table), value).then(doc => {
      return this.getById(doc.id, table);
    });
  }

  async update(id: string, value: T, table: string): Promise<T>{
    let docRef = doc(this.fs, '/' + table + '/' + id);
    
    await setDoc(docRef, value);

    return this.getById(id, table);    
  }

  async updateField(id: string, table: string, field: string, value: string): Promise<T>{
    let docRef = doc(this.fs, '/' + table + '/' + id);

    let data: any = {}
    data[field] = value;

    await updateDoc(docRef, data);

    return this.getById(id, table);  
  }

  delete(id: string, table: string){
    let docRef = doc(this.fs, '/' + table + '/' + id);
    return deleteDoc(docRef);
  }

  streamAll(table: string): Observable<DocumentData>{    
    return collectionData(collection(this.fs, '/' + table), {idField: 'id'})
  }

  streamById(table: string, id: any, field?: string): Observable<T[]>{    
    const q = query(collection(this.fs, '/' + table), where(field? field : "id", "==", id));
    return collectionData(q, {idField: 'id'}).pipe(
      map(dd => {
        let retval: T[] = [];
        dd.forEach(d => {          
          retval.push(d as T);
        })
        return retval;
      })
    );
  }

  getCollectionSnapshot(table: string){
    const q = query(collection(this.fs, table));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
            console.log("New city: ", change.doc.data());
        }
        if (change.type === "modified") {
            console.log("Modified city: ", change.doc.data());
        }
        if (change.type === "removed") {
            console.log("Removed city: ", change.doc.data());
        }
      });
    });
  }
}

export enum WhereFilterOperandKeys {
  less = '<',
  lessOrEqual = '<=',
  equal = '==',
  notEqual = '!=',
  more = '>',
  moreOrEqual = '>=',
  arrayContains = 'array-contains',
  in = 'in',
  arrayContainsAny = 'array-contains-any',
  notIn = 'not-in',
}

export class QueryParam {
  constructor(field: string, operation: WhereFilterOperandKeys, value: any) {
    this.field = field;
    this.operation = operation;
    this.value = value;
  }
  field: string;
  value: any;
  operation: WhereFilterOperandKeys;
}
