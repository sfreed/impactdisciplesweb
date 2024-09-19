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


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @ViewChild('addEditForm', { static: false }) addEditForm: DxFormComponent;

  datasource$: Observable<DataSource>;
  selectedItem: AppUser;

  itemType = 'User';

  public inProgress$ = new BehaviorSubject<boolean>(false)
  public isVisible$ = new BehaviorSubject<boolean>(false);

  roles;
  phone_types;

  constructor(private service: AppUserService) {}

  ngOnInit(): void {
    this.roles = EnumHelper.getRoleTypesAsArray();
    this.phone_types = EnumHelper.getPhoneTypesAsArray();

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
  }

  showEditModal = ({ row: { data } }) => {
    this.selectedItem = (Object.assign({}, data));

    if(!this.selectedItem.phone){
      this.selectedItem.phone = {... new Phone()};
    }

    if(!this.selectedItem.address){
      this.selectedItem.address = {... new Address()};
    }
    this.isVisible$.next(true);
  }

  showAddModal = () => {
    this.selectedItem = {... new AppUser()};
    this.selectedItem.address = {... new Address()}
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

  onSave(item: AppUser) {
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
