import { Component, OnInit } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { PHONE_TYPES } from 'impactdisciplescommon/src/lists/phone_types.enum';
import { LunchAndLearnModel } from 'impactdisciplescommon/src/models/domain/lunch-and-learn.model';
import { LunchAndLearnService } from 'impactdisciplescommon/src/services/lunch-and-learn.service';
import { EnumHelper } from 'impactdisciplescommon/src/utils/enum_helper';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-lunch-and-learns',
  templateUrl: './lunch-and-learns.component.html',
  styleUrls: ['./lunch-and-learns.component.css']
})
export class LunchAndLearnsComponent implements OnInit{
  dataSource: Observable<DataSource>;

  phone_types: PHONE_TYPES[];

  constructor(private service: LunchAndLearnService) {
    this.dataSource = this.service.streamAll().pipe(
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
              insert: function (value: LunchAndLearnModel) {
                return service.add(value);
              },
              update: function (key: any, value: LunchAndLearnModel) {
                return service.update(key, value)
              },
              remove: function (id: any) {
                return service.delete(id);
              },
            })
          })
      )
    );
   }

  ngOnInit() {
    this.phone_types = EnumHelper.getPhoneTypesAsArray();
  }

  onRowUpdating(options) {
    options.newData = Object.assign(options.oldData, options.newData);
  }
}
