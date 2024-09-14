import { Component, ViewChild } from '@angular/core';
import ArrayStore from 'devextreme/data/array_store';
import DataSource from 'devextreme/data/data_source';
import { NewsletterSubscriptionModel } from 'impactdisciplescommon/src/models/domain/newsletter-subscription.model';
import { NewsletterSubscriptionService } from 'impactdisciplescommon/src/services/newsletter-subscription.service';
import { BehaviorSubject, Observable, map } from 'rxjs';
import notify from 'devextreme/ui/notify';
import { confirm } from 'devextreme/ui/dialog';
import { DxFormComponent } from 'devextreme-angular';

@Component({
  selector: 'app-newsletter-subscription',
  templateUrl: './newsletter-subscription.component.html',
  styleUrls: ['./newsletter-subscription.component.scss']
})
export class NewsletterSubscriptionComponent {
  @ViewChild('newsletterForm', { static: false }) newsletterForm: DxFormComponent;

  newletterList$: Observable<DataSource>;
  newsletter: NewsletterSubscriptionModel;

  public inProgress$ = new BehaviorSubject<boolean>(false)
  public isVisible$ = new BehaviorSubject<boolean>(false);

  constructor(private newsletterSubscriptionService: NewsletterSubscriptionService) {}

  ngOnInit() {
    this.newletterList$ = this.newsletterSubscriptionService.streamAll().pipe(
      map(
        (data) => 
          new DataSource({
            reshapeOnPush: true,
            pushAggregationTimeout: 100,
            sort: 'firstName',
            store: new ArrayStore({
              key: 'id',
              data
          })
        })
      )
    )
  }

  showEditNewsletterModal = ({ row: { data } }) => {
    this.newsletter = data
    this.isVisible$.next(true);
  }

  showAddNewsletterModal = () => {
    this.isVisible$.next(true);
  }

  deleteNewsletterSubscription = ({ row: { data } }) => {
    confirm('<i>Are you sure you want to delete this record?</i>', 'Confirm').then((dialogResult) => {
      if (dialogResult) {
        this.newsletterSubscriptionService.delete(data.id).then(() => {
          notify({
            message: 'Newsletter Subscription Deleted',
            position: 'top',
            width: 600,
            type: 'success'
          });
        })
      }
    });
  }

  onSave(newsletter: NewsletterSubscriptionModel) {
    if(this.newsletterForm.instance.validate().isValid) {
      this.inProgress$.next(true);
      if(newsletter.id) {
        this.newsletterSubscriptionService.update(newsletter.id, newsletter).then((newNewsletter) => {
          if(newNewsletter) {
            notify({
              message: 'Newsletter Subscription Updated',
              position: 'top',
              width: 600,
              type: 'success'
            });
            this.onCancel();
          } else {
            this.inProgress$.next(false);
            notify({
              message: 'Some Error Occured',
              position: 'top',
              width: 600,
              type: 'success'
            });
          }
        })
      } else {
        this.newsletterSubscriptionService.add(newsletter).then((newNewsletter) => {
          if(newNewsletter) {
            notify({
              message: 'Newsletter Subscription Added',
              position: 'top',
              width: 600,
              type: 'error'
            });
            this.onCancel();
          } else {
            this.inProgress$.next(false);
            notify({
              message: 'Some Error Occured',
              position: 'top',
              width: 600,
              type: 'error'
            });
          }
        })
      }
    }
  }

  onCancel() {
    this.newsletter = null;
    this.inProgress$.next(false);
    this.isVisible$.next(false);
  }
}
