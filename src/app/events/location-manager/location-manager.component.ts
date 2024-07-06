import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { PHONE_TYPES } from 'impactdisciplescommon/src/lists/phone_types.enum';
import { LocationModel } from 'impactdisciplescommon/src/models/domain/location.model';
import { LocationService } from 'impactdisciplescommon/src/services/location.service';
import { EnumHelper } from 'impactdisciplescommon/src/utils/enum_helper';

@Component({
  selector: 'app-location-manager',
  templateUrl: './location-manager.component.html',
  styleUrls: ['./location-manager.component.css']
})
export class LocationManagerComponent implements OnInit {
  @ViewChild('grid', { static: false }) grid: DxDataGridComponent;

  dataSource: any;

  phone_types: PHONE_TYPES[];

  constructor(public locationService: LocationService){
    this.dataSource = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      load: function (loadOptions: any) {
        return locationService.getAll();
      },
      insert: function (value: LocationModel) {
        return locationService.add(value);
      },
      update: function (key: any, value: LocationModel) {
        return locationService.update(key, value)
      },
      remove: function (id: any) {
        return locationService.delete(id);
      },
    });
  }

  async ngOnInit(): Promise<void> {
    this.phone_types = EnumHelper.getPhoneTypesAsArray();
  }

  onRowUpdating(options) {
    options.newData = Object.assign(options.oldData, options.newData);
    options.newData.address = Object.assign({}, options.oldData.address, options.newData.address);
    options.newData.phone = Object.assign({}, options.oldData.phone, options.newData.phone);
  }
}
