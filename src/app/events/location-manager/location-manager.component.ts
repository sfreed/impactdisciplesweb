import { Component, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { LocationModel } from 'impactdisciplescommon/src/models/domain/location.model';
import { LocationService } from 'impactdisciplescommon/src/services/location.service';

@Component({
  selector: 'app-location-manager',
  templateUrl: './location-manager.component.html',
  styleUrls: ['./location-manager.component.css']
})
export class LocationManagerComponent {
  @ViewChild('grid', { static: false }) grid: DxDataGridComponent;

  dataSource: any;

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

  onRowUpdating(options) {
    options.newData = Object.assign(options.oldData, options.newData);
  }
}
