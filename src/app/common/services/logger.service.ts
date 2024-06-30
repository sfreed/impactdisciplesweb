import { Injectable } from "@angular/core";
import { Timestamp } from "@google-cloud/firestore";
import { LogMessage } from "../models/utils/log-message.model";
import { TracerDAO } from "./TracerDAO.service";

@Injectable({
  providedIn: "root",
})
export class LoggerService {

  constructor(public dao: TracerDAO<LogMessage>) {
  }

  getAll(): Promise<LogMessage[]>{
    return this.dao.getAll('log-messages').then(messages => {
      messages.forEach(message => {
        if(message.date){
          message.date = (message.date as Timestamp).toDate();
        }
      })
      return messages;
    });
  }

  getById(id: String): Promise<LogMessage>{
    return this.dao.getById(id, 'log-messages');
  }

  add(value: LogMessage): Promise<LogMessage>{
    return this.dao.add(value, 'log-messages');
  }

  update(id: string, value: LogMessage): Promise<LogMessage>{
    return this.dao.update(id, value, 'log-messages');
  }

  delete(id: string){
    return this.dao.delete(id, 'log-messages');
  }
}
