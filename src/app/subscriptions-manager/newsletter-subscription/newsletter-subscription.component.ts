import { Component } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { NewsletterSubscriptionModel } from 'impactdisciplescommon/src/models/domain/newsletter-subscription.model';
import { NewsletterSubscriptionService } from 'impactdisciplescommon/src/services/newsletter-subscription.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-newsletter-subscription',
  templateUrl: './newsletter-subscription.component.html',
  styleUrls: ['./newsletter-subscription.component.css']
})
export class NewsletterSubscriptionComponent {
  dataSource: Observable<DataSource>;

  constructor(private service: NewsletterSubscriptionService) {
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
              insert: function (value: NewsletterSubscriptionModel) {
                return service.add(value);
              },
              update: function (key: any, value: NewsletterSubscriptionModel) {
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
