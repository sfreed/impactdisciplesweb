import { Injectable } from '@angular/core';
import { Card } from '../models/editor/card.model';
import { FirebaseDAO, QueryParam } from 'impactdisciplescommon/src/dao/firebase.dao';
import { Observable } from 'rxjs';
import { Video } from '../models/ui/video.model';


@Injectable({
  providedIn: 'root'
})
export class VideoService{
  table: string = 'videoss';

  constructor(public dao: FirebaseDAO<Video>) {}

  getAll(): Promise<Video[]>{
    return this.dao.getAll(this.table)
  }

  streamAll(): Observable<Video[]>{
    return this.dao.streamAll(this.table)
  }

  queryAllStreamByMultiValue(queries: QueryParam[]): Observable<Video[]>{
    return this.dao.queryAllStreamByMultiValue(this.table, queries);
  }

  getAllByValue(field: string, value: any): Promise<Video[]>{
    return this.dao.getAllByValue(this.table, field, value);
  }

  getById(id: string): Promise<Video>{
    return this.dao.getById(id, this.table);
  }

  add(value: Video): Promise<Video>{
    return this.dao.add(value, this.table);
  }

  update(id: string, value: Video): Promise<Video>{
    return this.dao.update(id, value, this.table);
  }

  delete(id: string){
    return this.dao.delete(id, this.table);
  }
}
