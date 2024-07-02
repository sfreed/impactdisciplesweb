import { Component, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { EventModel } from 'impactdisciplescommon/src/models/domain/event.model';
import { EventsService } from 'impactdisciplescommon/src/services/events.service';

@Component({
  selector: 'app-event-manager',
  templateUrl: './event-manager.component.html',
  styleUrls: ['./event-manager.component.css']
})
export class EventManagerComponent {
  @ViewChild('grid', { static: false }) grid: DxDataGridComponent;

  dataSource: any;

  constructor(public eventService: EventsService){
    this.dataSource = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      load: function (loadOptions: any) {
        return eventService.getAll();
      },
      insert: function (value: EventModel) {
        return eventService.add(value);
      },
      update: function (key: any, value: EventModel) {
        return eventService.update(key, value)
      },
      remove: function (id: any) {
        return eventService.delete(id);
      },
    });
  }

  onRowUpdating(options) {
    options.newData = Object.assign(options.oldData, options.newData);
  }
}
