import { LocationService } from './../../../../impactdisciplescommon/src/services/location.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DxFormComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import notify from 'devextreme/ui/notify';
import { AppUser } from 'impactdisciplescommon/src/models/admin/appuser.model';
import { AppUserService } from 'impactdisciplescommon/src/services/admin/user.service';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { confirm } from 'devextreme/ui/dialog';
import { EnumHelper } from 'impactdisciplescommon/src/utils/enum_helper';
import { Address } from 'impactdisciplescommon/src/models/domain/utils/address.model';
import { Phone } from 'impactdisciplescommon/src/models/domain/utils/phone.model';
import { CustomerService } from 'impactdisciplescommon/src/services/admin/customer.service';
import { CustomerModel } from 'impactdisciplescommon/src/models/domain/utils/customer.model';
import { SalesService } from 'impactdisciplescommon/src/services/utils/sales.service';
import { EventService } from 'impactdisciplescommon/src/services/event.service';
import { EventRegistrationService } from 'impactdisciplescommon/src/services/event-registration.service';
import { EventModel } from 'impactdisciplescommon/src/models/domain/event.model';
import { EventRegistrationModel } from 'impactdisciplescommon/src/models/domain/event-registration.model';
import { OrganizationService } from 'impactdisciplescommon/src/services/organization.service';
import { OrganizationModel } from 'impactdisciplescommon/src/models/domain/organization.model';
import { LocationModel } from 'impactdisciplescommon/src/models/domain/location.model';
import { CheckoutForm } from 'impactdisciplescommon/src/models/utils/cart.model';
import { dateFromTimestamp } from 'impactdisciplescommon/src/utils/date-from-timestamp';
import { AuthService } from 'impactdisciplescommon/src/services/utils/auth.service';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  @ViewChild('addEditForm', { static: false }) addEditForm: DxFormComponent;

  datasource$: Observable<DataSource>;
  salesDatasource$: Observable<DataSource>;
  eventsRegistrantsDatasource$: Observable<DataSource>;

  public isSalesEditVisible$ = new BehaviorSubject<boolean>(false);
  public isRegistrationEditVisible$ = new BehaviorSubject<boolean>(false);
  public inProgress$ = new BehaviorSubject<boolean>(false)
  public isVisible$ = new BehaviorSubject<boolean>(false);

  selectedItem: CustomerModel;
  selectedPurchase: CheckoutForm;
  selectedEvent: EventModel;
  events: EventModel[];
  public locations: LocationModel[];
  public organizations: OrganizationModel[];

  itemType = 'Customers';

  phoneEditorOptions = {
    mask: '(X00) 000-0000',
    maskRules: {
      X: /[02-9]/,
    },
    maskInvalidMessage: 'The phone must have a correct USA phone format',
    valueChangeEvent: 'keyup',
  };

  public states: string[];
  public countries: string[];
  public phone_types: string[];

  constructor(private service: CustomerService,
    private salesService: SalesService,
    private eventService: EventService,
    private eventRegistrationService: EventRegistrationService,
    private locationsService: LocationService,
    private organizationsService: OrganizationService,
    private authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {

    this.authService.getUser().subscribe(user => {
      this.selectedItem = user;

      if(!this.selectedItem.shippingAddress){
        this.selectedItem.shippingAddress = {... new Address()}
      }

      if(!this.selectedItem.billingAddress){
        this.selectedItem.billingAddress = {... new Address()}
      }

      if(!this.selectedItem.phone){
        this.selectedItem.phone = {... new Phone()}
      }
    });

    this.datasource$ = this.service.streamAll().pipe(
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
            })
          })
      )
    );
      this.salesDatasource$ = this.salesService.streamAllByValue("email", this.selectedItem.email).pipe(
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

      this.events = await this.eventService.getAll();

      this.eventsRegistrantsDatasource$ = this.eventRegistrationService.streamAllByValue("email", this.selectedItem.email).pipe(
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


    this.phone_types = EnumHelper.getPhoneTypesAsArray();
    this.states = EnumHelper.getStateRoleTypesAsArray();
    this.countries = EnumHelper.getCountryTypesAsArray();
  }

  showEditModal = ({ row: { data } }) => {
    this.selectedItem = (Object.assign({}, data));

    if(!this.selectedItem.phone){
      this.selectedItem.phone = {... new Phone()};
    }

    if(!this.selectedItem.shippingAddress){
      this.selectedItem.shippingAddress = {... new Address()};
    }

    if(!this.selectedItem.billingAddress){
      this.selectedItem.billingAddress = {... new Address()};
    }

    this.isVisible$.next(true);
  }

  showAddModal = () => {
    this.selectedItem = {... new AppUser()};
    this.selectedItem.shippingAddress = {... new Address()};
    this.selectedItem.billingAddress = {... new Address()};
    this.selectedItem.phone = {... new Phone()};

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

  save() {
    if(this.addEditForm.instance.validate().isValid) {
      this.inProgress$.next(true);

      if(this.selectedItem.id) {
        this.service.update(this.selectedItem.id, this.selectedItem).then((item) => {
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
        this.service.add(this.selectedItem).then((item) => {
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

  showPurchasesEditModal = ({ row: { data } }) => {
    this.selectedPurchase = (Object.assign({}, data));

    this.isSalesEditVisible$.next(true);
  }

  showRegistrationsEditModal = async ({ row: { data } }) => {
    if(!this.organizations){
      this.organizations = await this.organizationsService.getAll();
    }

    if(!this.locations){
      this.locations = await this.locationsService.getAll();
    }

    let registration: EventRegistrationModel = (Object.assign({}, data));

    this.selectedEvent = this.events.find(event => event.id == registration.eventId);
    this.selectedEvent.location = this.locations.find(location => location.id == this.selectedEvent.location);
    this.selectedEvent.organization = this.organizations.find(organization => organization.id == this.selectedEvent.organization);

    this.isRegistrationEditVisible$.next(true);
  }

  getEventDate(cell){
    return (dateFromTimestamp(this.events.find(event => event.id == cell.data.eventId).startDate) as Date).toDateString()
  }
}
