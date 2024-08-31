import { Component, OnInit } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import { PHONE_TYPES } from 'impactdisciplescommon/src/lists/phone_types.enum';
import { LunchAndLearnModel } from 'impactdisciplescommon/src/models/domain/lunch-and-learn.model';
import { LunchAndLearnService } from 'impactdisciplescommon/src/services/lunch-and-learn.service';
import { EnumHelper } from 'impactdisciplescommon/src/utils/enum_helper';

@Component({
  selector: 'app-lunch-and-learn-manager',
  templateUrl: './lunch-and-learn-manager.component.html',
  styleUrls: ['./lunch-and-learn-manager.component.css']
})
export class LunchAndLearnManagerComponent implements OnInit{
  dataSource: any;

  phone_types: PHONE_TYPES[];

  constructor(service: LunchAndLearnService) {
    this.dataSource = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      load: function (loadOptions: any) {
        return service.getAll();
      },
      insert: function (value: LunchAndLearnModel) {
        return service.add(value);
      },
      update: function (key: any, value: LunchAndLearnModel) {
        return service.update(key, value)
      },
      remove: function (id: any) {
        return service.delete(id);
      },
    });
   }

  ngOnInit() {
    this.phone_types = EnumHelper.getPhoneTypesAsArray();
  }

  onRowUpdating(options) {
    options.newData = Object.assign(options.oldData, options.newData);
  }
}
