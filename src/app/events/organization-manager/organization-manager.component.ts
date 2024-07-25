import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { PHONE_TYPES } from 'impactdisciplescommon/src/lists/phone_types.enum';
import { OrganizationModel } from 'impactdisciplescommon/src/models/domain/organization.model';
import { PhoneNumberMaskPipe } from 'impactdisciplescommon/src/pipes/phone-number.pipe';
import { OrganizationService } from 'impactdisciplescommon/src/services/organization.service';
import { EnumHelper } from 'impactdisciplescommon/src/utils/enum_helper';

@Component({
  selector: 'app-organization-manager',
  templateUrl: './organization-manager.component.html',
  styleUrls: ['./organization-manager.component.css'],
  providers:[PhoneNumberMaskPipe]
})
export class OrganizationManagerComponent implements OnInit {
  @ViewChild('grid', { static: false }) grid: DxDataGridComponent;

  dataSource: any;

  phone_types: PHONE_TYPES[];

  constructor(public organizationService: OrganizationService){
    this.dataSource = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      load: function (loadOptions: any) {
        return organizationService.getAll();
      },
      insert: function (value: OrganizationModel) {
        return organizationService.add(value);
      },
      update: function (key: any, value: OrganizationModel) {
        return organizationService.update(key, value)
      },
      remove: function (id: any) {
        return organizationService.delete(id);
      },
    });
  }

  ngOnInit(): void {
    this.phone_types = EnumHelper.getPhoneTypesAsArray();
  }

  onRowUpdating(options) {
    options.newData = Object.assign({}, options.oldData, options.newData);
    options.newData.address = Object.assign({}, options.oldData.address, options.newData.address);
    options.newData.phone = Object.assign({}, options.oldData.phone, options.newData.phone);
  }
}
