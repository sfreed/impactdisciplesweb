import { Component, ViewChild } from '@angular/core';
import ArrayStore from 'devextreme/data/array_store';
import DataSource from 'devextreme/data/data_source';
import { NewsletterSubscriptionModel } from 'impactdisciplescommon/src/models/domain/newsletter-subscription.model';
import { NewsletterSubscriptionService } from 'impactdisciplescommon/src/services/newsletter-subscription.service';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import notify from 'devextreme/ui/notify';
import { confirm } from 'devextreme/ui/dialog';
import { DxFormComponent } from 'devextreme-angular';
import { Timestamp } from 'firebase/firestore';
import { dateFromTimestamp } from 'impactdisciplescommon/src/utils/date-from-timestamp';
import { EMailService } from 'impactdisciplescommon/src/services/admin/email.service';
import { AuthService } from 'impactdisciplescommon/src/services/utils/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NewsletterModel } from 'impactdisciplescommon/src/models/domain/newsletter.model';
import { NewsletterService } from 'impactdisciplescommon/src/services/newletter.service';

@Component({
  selector: 'app-newsletter-subscription',
  templateUrl: './newsletter-subscription.component.html',
  styleUrls: ['./newsletter-subscription.component.scss']
})
export class NewsletterSubscriptionComponent {
  @ViewChild('addEditForm', { static: false }) addEditForm: DxFormComponent;

  datasource$: Observable<DataSource>;
  selectedItem: NewsletterSubscriptionModel;

  newsletter: NewsletterModel;

  itemType = 'Newsletter Subscription';

  emailVals: string[] = ['Recipient First Name', 'Recipient Last Name', 'Sender First Name', 'Sender Last Name', 'Date'];

  freeEbookUrl = 'https://firebasestorage.googleapis.com/v0/b/impactdisciples-a82a8.appspot.com/o/EBooks%2FM-7-Journal.pdf?alt=media&token=50e3282f-6fa1-46aa-ad3a-a486e4024af1';

  public inProgress$ = new BehaviorSubject<boolean>(false)
  public isVisible$ = new BehaviorSubject<boolean>(false);
  public isPrayerVisible$ = new BehaviorSubject<boolean>(false);

  constructor(private service: NewsletterSubscriptionService,
    private emailService: EMailService,
    private authService: AuthService,
    private newsletterService: NewsletterService,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.datasource$ = this.service.streamAll().pipe(
      map(
        (data) =>
          new DataSource({
            reshapeOnPush: true,
            pushAggregationTimeout: 100,
            store: new ArrayStore({
              key: 'id',
              data
          })
        })
      )
    )
  }

  showEditModal = ({ row: { data } }) => {
    this.selectedItem = (Object.assign({}, data));
    this.isVisible$.next(true);
  }

  showNewletterModal = () => {
    this.newsletter = {... new NewsletterModel()};
    this.newsletter.date = Timestamp.now();
    this.isPrayerVisible$.next(true);
  }

  showAddModal = () => {
    this.isVisible$.next(true);
  }

  delete = ({ row: { data } }) => {
    confirm('<i>Are you sure you want to delete this record?</i>', 'Confirm').then((dialogResult) => {
      if (dialogResult) {
        this.service.delete(data.id).then(() => {
          notify({
            message: this.itemType + ' Deleted',
            position: 'top',
            width: 600,
            type: 'success'
          });
        })
      }
    });
  }

  onSave(item: NewsletterSubscriptionModel) {
    if(this.addEditForm.instance.validate().isValid) {
      this.inProgress$.next(true);

      if(item.id) {
        this.service.update(item.id, item).then((item) => {
          if(item) {
            notify({
              message: this.itemType + ' Updated',
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
        this.service.add(item).then((item) => {
          if(item) {
            notify({
              message: this.itemType + ' Added',
              position: 'top',
              width: 600,
              type: 'success'
            });

            this.sendConfirmationEmail();

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

  sendConfirmationEmail(){
    let subject = 'Thank you for Subscribing to the Impact Disciples Newletter! ';
    let text = '<div>Dear ' + this.selectedItem.firstName + '.</div><br><br>'
    text += '<div>Your email address was successfully added to our Newletter Subsciption List! (' + this.selectedItem.email +')</div><br><br>'
    text += '<div>Please accept this free <a href="' + this.freeEbookUrl +'" download>EBook</a> as a small token of our appreciation.</div><br><br>'
    text +='<div>God Bless! - Impact Disciples Ministry</div>'

    this.emailService.sendHtmlEmail(this.selectedItem.email, subject, text);
  }

  sendNewsletter(){
    this.authService.getUser().pipe(take(1)).subscribe(user => {
      this.newsletter.sender = user.firstName + ' ' + user.lastName
      let html='';

      this.service.getAll().then(subscribers => {
        subscribers.forEach(subscriber => {
          let form = {};
          form['firstName'] = subscriber.firstName;
          form['lastName'] = subscriber.lastName;
          form['email'] = subscriber.email;
          form['date'] = subscriber;

          html = this.newsletter.html
          html = html.replace('{{Recipient First Name}}', subscriber.firstName);
          html = html.replace('{{Recipient Last Name}}', subscriber.lastName);
          html = html.replace('{{Sender First Name}}', user.firstName);
          html = html.replace('{{Sender Last Name}}', user.lastName);
          html = html.replace('{{Date}}', (dateFromTimestamp(this.newsletter.date) as Date).toLocaleString());
          this.newsletter.html = html;

          this.emailService.sendHtmlEmail(subscriber.email, this.newsletter.subject, this.newsletter.html);
        })
      }).then(() => {
        this.newsletterService.add(this.newsletter).then(newsletter => {
          this.toastrService.success('Newsletter Sent Successfully!');
          this.isPrayerVisible$.next(false);
        })
      })
    })
  }

  onCancel() {
    this.selectedItem = null;
    this.inProgress$.next(false);
    this.isVisible$.next(false);
  }

  onNewsletterCancel() {
    this.newsletter = null;
    this.inProgress$.next(false);
    this.isPrayerVisible$.next(false);
  }
}
