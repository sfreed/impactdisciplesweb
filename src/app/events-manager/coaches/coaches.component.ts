import { OrganizationService } from '../../../../impactdisciplescommon/src/services/organization.service';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DxFormComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import notify from 'devextreme/ui/notify';
import { confirm } from 'devextreme/ui/dialog';
import { PHONE_TYPES } from 'impactdisciplescommon/src/lists/phone_types.enum';
import { CoachModel } from 'impactdisciplescommon/src/models/domain/coach.model';
import { OrganizationModel } from 'impactdisciplescommon/src/models/domain/organization.model';
import { CoachService } from 'impactdisciplescommon/src/services/coach.service';
import { EnumHelper } from 'impactdisciplescommon/src/utils/enum_helper';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Component({
  selector: 'app-coaches',
  templateUrl: './coaches.component.html',
  styleUrls: ['./coaches.component.css']
})
export class CoachesComponent implements OnInit{
  @ViewChild('addEditForm', { static: false }) addEditForm: DxFormComponent;

  datasource$: Observable<DataSource>;
  selectedItem: CoachModel;

  itemType = 'Coach';

  public inProgress$ = new BehaviorSubject<boolean>(false)
  public isVisible$ = new BehaviorSubject<boolean>(false);

  @Input() imageSelectVisible: boolean = false;
  @Output() imageSelectClosed = new EventEmitter<boolean>();

  organizations: OrganizationModel[];

  phone_types: PHONE_TYPES[];

  constructor(public service: CoachService, private organizationService: OrganizationService){}

  async ngOnInit(): Promise<void> {
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
              }
            })
          })
      )
    );

    this.organizations = await this.organizationService.getAll();

    this.phone_types = EnumHelper.getPhoneTypesAsArray();
  }

  showEditModal = ({ row: { data } }) => {
    this.selectedItem = (Object.assign({}, data));
    this.isVisible$.next(true);
  }

  showAddModal = () => {
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

  onSave(item: CoachModel) {
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

  editImages(e){
    this.selectedItem = e.row.data;
    this.imageSelectVisible = true;
  }

  async closeItemWindow(e){
    if(this.selectedItem.id){
      this.selectedItem = await this.service.update(this.selectedItem.id, this.selectedItem);
    } else {
      this.selectedItem = await this.service.add(this.selectedItem);
    }

    this.imageSelectVisible = false;
    this.imageSelectClosed.emit(false);

  }
}
