import { Component, OnInit } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { LogMessage } from 'impactdisciplescommon/src/models/utils/log-message.model';
import { LoggerService } from 'impactdisciplescommon/src/services/utils/logger.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-log-messages',
  templateUrl: './log-messages.component.html',
  styleUrls: ['./log-messages.component.css']
})
export class LogMessagesComponent implements OnInit {
  dataSource: Observable<DataSource>;

  constructor(private service: LoggerService) {
    this.dataSource = this.service.streamAll().pipe(
      map(
        (items) =>
          new DataSource({
            reshapeOnPush: true,
            pushAggregationTimeout: 100,
            store: new CustomStore({
              key: 'id',
              loadMode: 'raw',
              load: function (loadOptions: any) {
                return items;
              },
              insert: function (value: LogMessage) {
                return service.add(value);
              },
              update: function (key: any, value: LogMessage) {
                return service.update(key, value)
              },
              remove: function (id: any) {
                return service.delete(id);
              },
            })
          })
      )
    );
   }

  ngOnInit() {
  }

  onRowUpdating(options) {
    options.newData = Object.assign(options.oldData, options.newData);
  }

}
