import { Component } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { PrayerTeamSubscriptionModel } from 'impactdisciplescommon/src/models/domain/prayer-team-subscription.model';
import { PrayerTeamSubscriptionService } from 'impactdisciplescommon/src/services/prayer-team-subscription.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-prayer-team-subscription',
  templateUrl: './prayer-team-subscription.component.html',
  styleUrls: ['./prayer-team-subscription.component.css']
})
export class PrayerTeamSubscriptionComponent {
  dataSource: Observable<DataSource>;

  constructor(private service: PrayerTeamSubscriptionService) {
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
              insert: function (value: PrayerTeamSubscriptionModel) {
                return service.add(value);
              },
              update: function (key: any, value: PrayerTeamSubscriptionModel) {
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
  }

  onRowUpdating(options) {
    options.newData = Object.assign(options.oldData, options.newData);
  }
}
