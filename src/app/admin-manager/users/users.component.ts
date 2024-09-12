import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { Role } from 'impactdisciplescommon/src/lists/roles.enum';
import { AppUser } from 'impactdisciplescommon/src/models/admin/appuser.model';
import { AppUserService } from 'impactdisciplescommon/src/services/admin/user.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @ViewChild('grid', { static: false }) grid: DxDataGridComponent;

  dataSource: Observable<DataSource>;

  selectedRow: any;

  roles: Role[] = [];

  constructor(private service: AppUserService) {
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
              insert: function (value: AppUser) {
                return service.add(value);
              },
              update: function (key: any, value: AppUser) {
                return service.update(key, value)
              },
              remove: function (id: any) {
                return service.delete(id);
              },
            })
          })
      )
    );

    this.roles = [Role.CUSTOMER, Role.EMPLOYEE, Role.ADMIN];
  }

  ngOnInit(): void {}

  onRowUpdating(options) {
    options.newData = Object.assign(options.oldData, options.newData);
  }
}
