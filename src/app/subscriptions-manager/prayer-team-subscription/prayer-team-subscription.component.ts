import { Component } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import { PrayerTeamSubscriptionModel } from 'impactdisciplescommon/src/models/domain/prayer-team-subscription.model';
import { PrayerTeamSubscriptionService } from 'impactdisciplescommon/src/services/prayer-team-subscription.service';

@Component({
  selector: 'app-prayer-team-subscription',
  templateUrl: './prayer-team-subscription.component.html',
  styleUrls: ['./prayer-team-subscription.component.css']
})
export class PrayerTeamSubscriptionComponent {
  dataSource: any;

  constructor(service: PrayerTeamSubscriptionService) {
    this.dataSource = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      load: function (loadOptions: any) {
        return service.getAll();
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
    });
   }

  ngOnInit() {
  }

  onRowUpdating(options) {
    options.newData = Object.assign(options.oldData, options.newData);
  }
}
