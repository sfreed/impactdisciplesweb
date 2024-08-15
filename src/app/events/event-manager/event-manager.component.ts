import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { EventModel } from 'impactdisciplescommon/src/models/domain/event.model';
import { EventService } from 'impactdisciplescommon/src/services/event.service';
import { OrganizationService } from 'impactdisciplescommon/src/services/organization.service';
import { LocationService } from 'impactdisciplescommon/src/services/location.service';
import { OrganizationModel } from 'impactdisciplescommon/src/models/domain/organization.model';
import { LocationModel } from 'impactdisciplescommon/src/models/domain/location.model';
import { map, Observable } from 'rxjs';
import ArrayStore from 'devextreme/data/array_store';
import DataSource from 'devextreme/data/data_source';
import { DataSourceHelperService } from 'impactdisciplescommon/src/services/utils/data-source-helper.service';

@Component({
  selector: 'app-event-manager',
  templateUrl: './event-manager.component.html',
  styleUrls: ['./event-manager.component.css']
})
export class EventManagerComponent implements OnInit {
  @ViewChild('grid', { static: false }) grid: DxDataGridComponent;

  dataSource: Observable<DataSource>;

  organizations: OrganizationModel[];

  locations: LocationModel[];

  selectedEvent: EventModel;

  constructor(public eventService: EventService, private organizationService: OrganizationService, private locationService: LocationService,
    public dsService: DataSourceHelperService
  ){
    this.dataSource = this.eventService.streamAll().pipe(
      map(
        (items) =>
          new DataSource({
            reshapeOnPush: true,
            pushAggregationTimeout: 100,
            store: new ArrayStore({ key: 'id', data: items })
          })
      )
    );
  }

  async ngOnInit(): Promise<void> {
    this.organizations = await this.organizationService.getAll();

    this.locations = await this.locationService.getAll();
  }

  onRowUpdating(options) {
    options.newData = Object.assign({}, options.oldData, options.newData);
  }

  isEditVisible: boolean = false;
  isAgendaVisible: boolean = false;
  isAttendeesListVisible: boolean = false;

  editEvent(e){
    this.selectedEvent = e.row.data;
    this.isEditVisible = true;
  }

  editAgenda(e){
    this.selectedEvent = e.row.data;

    console.log(e)
    this.isAgendaVisible = true;
  }

  viewAttendees(e){
    this.selectedEvent = e.row.data;
    this.isAttendeesListVisible = true;
  }
}
