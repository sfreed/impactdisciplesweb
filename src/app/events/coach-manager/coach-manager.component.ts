import { OrganizationService } from './../../../../impactdisciplescommon/src/services/organization.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { PHONE_TYPES } from 'impactdisciplescommon/src/lists/phone_types.enum';
import { CoachModel } from 'impactdisciplescommon/src/models/domain/coach.model';
import { OrganizationModel } from 'impactdisciplescommon/src/models/domain/organization.model';
import { CoachService } from 'impactdisciplescommon/src/services/coach.service';
import { EnumHelper } from 'impactdisciplescommon/src/utils/enum_helper';

@Component({
  selector: 'app-coach-manager',
  templateUrl: './coach-manager.component.html',
  styleUrls: ['./coach-manager.component.css']
})
export class CoachManagerComponent implements OnInit{
  @ViewChild('grid', { static: false }) grid: DxDataGridComponent;

  dataSource: any;

  organizations: OrganizationModel[];

  phone_types: PHONE_TYPES[];

  constructor(public coachService: CoachService, private organizationService: OrganizationService){
    this.dataSource = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      load: function (loadOptions: any) {
        return coachService.getAll();
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
    });
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
}
