import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent, DxDropDownBoxComponent, DxFormComponent } from 'devextreme-angular';
import { EventModel } from 'impactdisciplescommon/src/models/domain/event.model';
import { EventService } from 'impactdisciplescommon/src/services/event.service';
import { OrganizationService } from 'impactdisciplescommon/src/services/organization.service';
import { LocationService } from 'impactdisciplescommon/src/services/location.service';
import { OrganizationModel } from 'impactdisciplescommon/src/models/domain/organization.model';
import { LocationModel } from 'impactdisciplescommon/src/models/domain/location.model';
import { BehaviorSubject, map, Observable, Subject, takeUntil } from 'rxjs';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import notify from 'devextreme/ui/notify';
import { confirm } from 'devextreme/ui/dialog';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { LocationSaved, ShowLocationModal } from 'src/app/shared/location-modal/location-modal.actions';
import { OrganizationSaved, ShowOrganizationModal } from 'src/app/shared/organization-modal/organization-modal.actions';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit, OnDestroy {
  @ViewChild('addEditForm', { static: false }) addEditForm: DxFormComponent;
  @ViewChild('locationDropbox', { static: false }) locationDropbox: DxDropDownBoxComponent;
  @ViewChild('organizationDropbox', { static: false }) organizationDropbox: DxDropDownBoxComponent;

  organizations$: Observable<OrganizationModel[]>;
  locations$: Observable<LocationModel[]>;
  datasource$: Observable<DataSource>;
  selectedItem: EventModel = {};
  itemType = 'Event';
  selectedLocation = [];


  public isOrganizationModalVisible$ = new BehaviorSubject<boolean>(false);
  public isLocationModalVisible$ = new BehaviorSubject<boolean>(false);
  public inProgress$ = new BehaviorSubject<boolean>(false);
  public isVisible$ = new BehaviorSubject<boolean>(false);

  private ngUnsubscribe = new Subject<void>();

  constructor(private cd: ChangeDetectorRef, private store: Store, private actions$: Actions, public eventService: EventService, private organizationService: OrganizationService, private locationService: LocationService){}

  ngOnInit(): void {
    this.organizations$ = this.organizationService.streamAll();
    this.locations$ = this.locationService.streamAll();
    this.datasource$ = this.eventService.streamAll().pipe(
      map(
        (data) =>
          new DataSource({
            reshapeOnPush: true,
            pushAggregationTimeout: 100,
            store: new ArrayStore({
              key: 'id',
              data
          })
        })
      )
    );
    this.actions$.pipe(ofActionSuccessful(LocationSaved), takeUntil(this.ngUnsubscribe)).subscribe(({ location }) => {
      const selectedLocationEvent = { itemData: location };
      this.selectLocation(selectedLocationEvent);
    })
    this.actions$.pipe(ofActionSuccessful(OrganizationSaved), takeUntil(this.ngUnsubscribe)).subscribe(({ organization }) => {
      const selectedOrganizationEvent = { itemData: organization };
      this.selectOrganization(selectedOrganizationEvent);
    })
  }

  showEditModal = ({ row: { data } }) => {
    this.selectedItem = data
    this.isVisible$.next(true);
  }

  showAddModal = () => {
    this.selectedItem.isSummit = false;
    this.isVisible$.next(true);
  }

  selectLocation(event: any) {
    if (event && event.itemData) {
      console.log(this.locationDropbox.instance)
      this.selectedItem.location = event.itemData.id;
      this.locationDropbox.instance.close();
    }
  }

  selectOrganization(event: any) {
    if (event && event.itemData) {
      console.log(this.organizationDropbox.instance)
      this.selectedItem.organization = event.itemData.id;
      this.organizationDropbox.instance.close();
    }
  }

  showAddLocationModal = () => {
    this.store.dispatch(new ShowLocationModal());
  }

  showAddOrganizationModal = () => {
    this.store.dispatch(new ShowOrganizationModal());
  }

  delete = ({ row: { data } }) => {
    confirm('<i>Are you sure you want to delete this record?</i>', 'Confirm').then((dialogResult) => {
      if (dialogResult) {
        this.eventService.delete(data.id).then(() => {
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

  onSave(item: EventModel) {
    if(this.addEditForm.instance.validate().isValid) {
      this.inProgress$.next(true);
      if(item.id) {
        this.eventService.update(item.id, item).then((item) => {
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
        this.eventService.add(item).then((item) => {
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
    this.selectedItem = {};
    this.inProgress$.next(false);
    this.isVisible$.next(false);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }












  // onRowUpdating(options) {
  //   options.newData = Object.assign({}, options.oldData, options.newData);
  // }

  // isEditVisible: boolean = false;
  // isAgendaVisible: boolean = false;
  // isAttendeesListVisible: boolean = false;

  // editEvent(e){
  //   this.selectedEvent = e.row.data;
  //   this.isEditVisible = true;
  // }

  // editAgenda(e){
  //   this.selectedEvent = e.row.data;

  //   console.log(e)
  //   this.isAgendaVisible = true;
  // }

  // viewAttendees(e){
  //   this.selectedEvent = e.row.data;
  //   this.isAttendeesListVisible = true;
  // }
}
