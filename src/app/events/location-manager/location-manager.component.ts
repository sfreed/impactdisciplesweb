import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { PHONE_TYPES } from 'impactdisciplescommon/src/lists/phone_types.enum';
import { LocationModel } from 'impactdisciplescommon/src/models/domain/location.model';
import { OrganizationModel } from 'impactdisciplescommon/src/models/domain/organization.model';
import { LocationService } from 'impactdisciplescommon/src/services/location.service';
import { OrganizationService } from 'impactdisciplescommon/src/services/organization.service';
import { EnumHelper } from 'impactdisciplescommon/src/utils/enum_helper';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-location-manager',
  templateUrl: './location-manager.component.html',
  styleUrls: ['./location-manager.component.css']
})
export class LocationManagerComponent implements OnInit {
  @ViewChild('grid', { static: false }) grid: DxDataGridComponent;

  dataSource: Observable<DataSource>;

  phone_types: PHONE_TYPES[];

  organizations: OrganizationModel[];

  constructor(public locationService: LocationService, private organizationService: OrganizationService){
    this.dataSource = this.locationService.streamAll().pipe(
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
              insert: function (value: LocationModel) {
                return locationService.add(value);
              },
              update: function (key: any, value: LocationModel) {
                return locationService.update(key, value)
              },
              remove: function (id: any) {
                return locationService.delete(id);
              },
            })
          })
      )
    )
  }

  async ngOnInit(): Promise<void> {
    this.phone_types = EnumHelper.getPhoneTypesAsArray();
    this.organizations = await this.organizationService.getAll();
  }

  onRowUpdating(options) {
    options.newData = Object.assign({}, options.oldData, options.newData);
    options.newData.address = Object.assign({}, options.oldData.address, options.newData.address);
    options.newData.phone = Object.assign({}, options.oldData.phone, options.newData.phone);
  }
}
