import { OrganizationService } from './../../../../impactdisciplescommon/src/services/organization.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import ArrayStore from 'devextreme/data/array_store';
import DataSource from 'devextreme/data/data_source';
import { PHONE_TYPES } from 'impactdisciplescommon/src/lists/phone_types.enum';
import { OrganizationModel } from 'impactdisciplescommon/src/models/domain/organization.model';
import { CoachService } from 'impactdisciplescommon/src/services/coach.service';
import { DataSourceHelperService } from 'impactdisciplescommon/src/services/utils/data-source-helper.service';
import { EnumHelper } from 'impactdisciplescommon/src/utils/enum_helper';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-coach-manager',
  templateUrl: './coach-manager.component.html',
  styleUrls: ['./coach-manager.component.css']
})
export class CoachManagerComponent implements OnInit{
  @ViewChild('grid', { static: false }) grid: DxDataGridComponent;

  dataSource: Observable<DataSource>;

  organizations: OrganizationModel[];

  phone_types: PHONE_TYPES[];

  constructor(public coachService: CoachService, private organizationService: OrganizationService, public dsService: DataSourceHelperService){
    this.dataSource = this.coachService.streamAll().pipe(
      map(
        (items) =>
          new DataSource({
            reshapeOnPush: true,
            pushAggregationTimeout: 100,
            store: new ArrayStore({ key: 'id', data: items })
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
}
