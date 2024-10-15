import { Injectable } from '@angular/core';
import { SplashScreen } from '../models/ui/splash-screen.model';
import { FirebaseDAO } from 'impactdisciplescommon/src/dao/firebase.dao';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SplashScreenService  {
  table: string = 'splash_screens';

  constructor(public dao: FirebaseDAO<SplashScreen>) {}

  getAll(): Promise<SplashScreen[]>{
    return this.dao.getAll(this.table)
  }

  streamAll(): Observable<SplashScreen[]>{
    return this.dao.streamAll(this.table)
  }

  getAllByValue(field: string, value: any): Promise<SplashScreen[]>{
    return this.dao.getAllByValue(this.table, field, value);
  }

  getById(id: String): Promise<SplashScreen>{
    return this.dao.getById(id, this.table);
  }

  add(value: SplashScreen): Promise<SplashScreen>{
    return this.dao.add(value, this.table);
  }

  update(id: string, value: SplashScreen): Promise<SplashScreen>{
    return this.dao.update(id, value, this.table);
  }

  delete(id: string){
    return this.dao.delete(id, this.table);
  }
}
