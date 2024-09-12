import { Component, OnInit } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { PHONE_TYPES } from 'impactdisciplescommon/src/lists/phone_types.enum';
import { SeminarModel } from 'impactdisciplescommon/src/models/domain/seminar.model';
import { SeminarService } from 'impactdisciplescommon/src/services/seminar.service';
import { EnumHelper } from 'impactdisciplescommon/src/utils/enum_helper';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-seminars',
  templateUrl: './seminars.component.html',
  styleUrls: ['./seminars.component.css']
})
export class SeminarsComponent implements OnInit {
  dataSource: Observable<DataSource>;

  phone_types: PHONE_TYPES[];

  constructor(private service: SeminarService) {
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
              insert: function (value: SeminarModel) {
                return service.add(value);
              },
              update: function (key: any, value: SeminarModel) {
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
