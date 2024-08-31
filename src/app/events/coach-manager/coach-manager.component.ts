import { OrganizationService } from './../../../../impactdisciplescommon/src/services/organization.service';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { PHONE_TYPES } from 'impactdisciplescommon/src/lists/phone_types.enum';
import { CoachModel } from 'impactdisciplescommon/src/models/domain/coach.model';
import { OrganizationModel } from 'impactdisciplescommon/src/models/domain/organization.model';
import { CoachService } from 'impactdisciplescommon/src/services/coach.service';
import { EnumHelper } from 'impactdisciplescommon/src/utils/enum_helper';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-coach-manager',
  templateUrl: './coach-manager.component.html',
  styleUrls: ['./coach-manager.component.css']
})
export class CoachManagerComponent implements OnInit{
  @ViewChild('grid', { static: false }) grid: DxDataGridComponent;

  @Input() imageSelectVisible: boolean = false;
  @Output() imageSelectClosed = new EventEmitter<boolean>();

  dataSource: Observable<DataSource>;

  organizations: OrganizationModel[];

  phone_types: PHONE_TYPES[];

  constructor(public coachService: CoachService, private organizationService: OrganizationService){
    this.dataSource = this.coachService.streamAll().pipe(
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
              insert: function (value: CoachModel) {
                return coachService.add(value);
              },
              update: function (key: any, value: CoachModel) {
                return coachService.update(key, value)
              },
              remove: function (id: any) {
                return coachService.delete(id);
              },
            })
          })
      )
    );
  }

  async ngOnInit(): Promise<void> {
    this.organizations = await this.organizationService.getAll();

    this.phone_types = EnumHelper.getPhoneTypesAsArray();
  }

  onRowUpdating(options) {
    options.newData = Object.assign({}, options.oldData, options.newData);
    options.newData.address = Object.assign({}, options.oldData.address, options.newData.address);
    options.newData.phone = Object.assign({}, options.oldData.phone, options.newData.phone);
  }

  selectedCoach: CoachModel;

  editImages(e){
    this.selectedCoach = e.row.data;
    this.imageSelectVisible = true;
  }

  async closeItemWindow(e){
    if(this.selectedCoach.id){
      this.selectedCoach = await this.coachService.update(this.selectedCoach.id, this.selectedCoach);
    } else {
      this.selectedCoach = await this.coachService.add(this.selectedCoach);
    }

    this.imageSelectVisible = false;
    this.imageSelectClosed.emit(false);

  }
}
