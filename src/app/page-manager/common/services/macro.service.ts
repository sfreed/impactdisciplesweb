import { Injectable } from '@angular/core';
import { TextEditorMacro } from '../models/editor/text-editor-macro.model';
import { FirebaseDAO } from 'impactdisciplescommon/src/dao/firebase.dao';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MacroService {
  table: string = 'macros';

  constructor(public dao: FirebaseDAO<TextEditorMacro>) {}

  getAll(): Promise<TextEditorMacro[]>{
    return this.dao.getAll(this.table)
  }

  streamAll(): Observable<TextEditorMacro[]>{
    return this.dao.streamAll(this.table)
  }

  getAllByValue(field: string, value: any): Promise<TextEditorMacro[]>{
    return this.dao.getAllByValue(this.table, field, value);
  }

  getById(id: string): Promise<TextEditorMacro>{
    return this.dao.getById(id, this.table);
  }

  add(value: TextEditorMacro): Promise<TextEditorMacro>{
    return this.dao.add(value, this.table);
  }

  update(id: string, value: TextEditorMacro): Promise<TextEditorMacro>{
    return this.dao.update(id, value, this.table);
  }

  delete(id: string){
    return this.dao.delete(id, this.table);
  }
}
