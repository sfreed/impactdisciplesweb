import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DxFormComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { EventRegistrationModel } from 'impactdisciplescommon/src/models/domain/event-registration.model';
import { EventModel } from 'impactdisciplescommon/src/models/domain/event.model';
import { EventRegistrationService } from 'impactdisciplescommon/src/services/event-registration.service';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { confirm } from 'devextreme/ui/dialog';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-event-attendees',
  templateUrl: './event-attendees.component.html',
  styleUrls: ['./event-attendees.component.css']
})
export class EventAttendeesComponent implements OnInit{
  @Input('event') event: EventModel;

  @ViewChild('addEditForm', { static: false }) addEditForm: DxFormComponent;

  datasource$: Observable<DataSource>;
  selectedItem: EventRegistrationModel;

  itemType = 'Registered User';

  public inProgress$ = new BehaviorSubject<boolean>(false)
  public isVisible$ = new BehaviorSubject<boolean>(false);

  constructor(public service: EventRegistrationService){}

  async ngOnInit(): Promise<void> {
    this.datasource$ = this.service.streamAllByValue('eventId', this.event.id).pipe(
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
              }
            })
          })
      )
    );
  }

  showEditModal = ({ row: { data } }) => {
    this.selectedItem = (Object.assign({}, data));

    this.isVisible$.next(true);
  }

  showAddModal = () => {
    this.selectedItem = {... new EventRegistrationModel()};

    this.isVisible$.next(true);
  }

  delete = ({ row: { data } }) => {
    confirm('<i>Are you sure you want to delete this record?</i>', 'Confirm').then((dialogResult) => {
      if (dialogResult) {
        this.service.delete(data.id).then(() => {
          notify({
            message: this.itemType + ' Deleted',
            position: 'top',
            width: 600,
            type: 'success'
          });
        })
      }
    });
  }

  onSave(item: EventRegistrationModel) {
    item.eventId = this.event.id;
    if(this.addEditForm.instance.validate().isValid) {
      this.inProgress$.next(true);
      if(item.id) {
        this.service.update(item.id, item).then((item) => {
          if(item) {
            notify({
              message: this.itemType + ' Updated',
              position: 'top',
              width: 600,
              type: 'success'
            });
            this.onCancel();
          } else {
            this.inProgress$.next(false);
            notify({
              message: 'Some Error Occured',
              position: 'top',
              width: 600,
              type: 'success'
            });
          }
        })
      } else {
        this.service.add(item).then((item) => {
          if(item) {
            notify({
              message: this.itemType + ' Added',
              position: 'top',
              width: 600,
              type: 'success'
            });
            this.onCancel();
          } else {
            this.inProgress$.next(false);
            notify({
              message: 'Some Error Occured',
              position: 'top',
              width: 600,
              type: 'error'
            });
          }
        })
      }
    }
  }

  onCancel() {
    this.selectedItem = null;
    this.inProgress$.next(false);
    this.isVisible$.next(false);
  }
}
