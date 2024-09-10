import { Component, Input, OnInit } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { EventRegistrationModel } from 'impactdisciplescommon/src/models/domain/event-registration.model';
import { EventModel } from 'impactdisciplescommon/src/models/domain/event.model';
import { EventRegistrationService } from 'impactdisciplescommon/src/services/event-registration.service';
import { EventService } from 'impactdisciplescommon/src/services/event.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-event-attendees',
  templateUrl: './event-attendees.component.html',
  styleUrls: ['./event-attendees.component.css']
})
export class EventAttendeesComponent implements OnInit{
  @Input('event') event: EventModel;

  dataSource: Observable<DataSource>;

  constructor(public eventRegistrationService: EventRegistrationService){}

  async ngOnInit(): Promise<void> {
    let that = this;

    this.dataSource = this.eventRegistrationService.streamAllByValue('eventId', this.event.id).pipe(
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
              insert: function (value: EventRegistrationModel) {
                value.eventId = that.event.id;
                return that.eventRegistrationService.add(value);
              },
              update: function (key: any, value: EventRegistrationModel) {
                return that.eventRegistrationService.update(key, value)
              },
              remove: function (id: any) {
                return that.eventRegistrationService.delete(id);
              },
            })
          })
      )
    );
  }

  onRowUpdating(options) {
    options.newData = Object.assign({}, options.oldData, options.newData);
  }
}
