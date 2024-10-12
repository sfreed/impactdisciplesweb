import { ToastrService } from 'ngx-toastr';
import { Timestamp } from 'firebase/firestore';
import { Component, ViewChild } from '@angular/core';
import ArrayStore from 'devextreme/data/array_store';
import DataSource from 'devextreme/data/data_source';
import notify from 'devextreme/ui/notify';
import { PrayerTeamSubscriptionModel } from 'impactdisciplescommon/src/models/domain/prayer-team-subscription.model';
import { PrayerTeamSubscriptionService } from 'impactdisciplescommon/src/services/prayer-team-subscription.service';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { confirm } from 'devextreme/ui/dialog';
import { DxFormComponent } from 'devextreme-angular';
import { PrayerModel } from 'impactdisciplescommon/src/models/domain/prayer.model';
import { EMailService } from 'impactdisciplescommon/src/services/admin/email.service';
import { AuthService } from 'impactdisciplescommon/src/services/utils/auth.service';
import { dateFromTimestamp } from 'impactdisciplescommon/src/utils/date-from-timestamp';
import { PrayerService } from 'impactdisciplescommon/src/services/prayer.service';

@Component({
  selector: 'app-prayer-team-subscription',
  templateUrl: './prayer-team-subscription.component.html',
  styleUrls: ['./prayer-team-subscription.component.css']
})
export class PrayerTeamSubscriptionComponent {
  @ViewChild('addEditForm', { static: false }) addEditForm: DxFormComponent;

  datasource$: Observable<DataSource>;
  selectedItem :PrayerTeamSubscriptionModel

  itemType = 'Prayer Team Subscription';

  emailVals: string[] = ['Recipient First Name', 'Recipient Last Name', 'Sender First Name', 'Sender Last Name', 'Date'];

  public inProgress$ = new BehaviorSubject<boolean>(false)
  public isEditVisible$ = new BehaviorSubject<boolean>(false);
  public isPrayerVisible$ = new BehaviorSubject<boolean>(false);

  prayer: PrayerModel;

  constructor(private service: PrayerTeamSubscriptionService,
    private emailService: EMailService,
    private authService: AuthService,
    private prayerService: PrayerService,
    private toastrService: ToastrService) {}

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

  showEditModal = (e) => {
    this.selectedItem = (Object.assign({}, e.data));
    this.isEditVisible$.next(true);
  }

  showPrayerModal = () => {
    this.prayer = {... new PrayerModel()};
    this.prayer.date = Timestamp.now();
    this.isPrayerVisible$.next(true);
  }

  showAddModal = () => {
    this.isEditVisible$.next(true);
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

  onSave(item: PrayerTeamSubscriptionModel) {
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
    let subject = 'Thank you for Joining our Prayer Team! ';
    let text = 'Dear ' + this.selectedItem.firstName + '.\n\n'
    text += 'Your email address was successfully added to our Prayer Team List! (' + this.selectedItem.email +')\n\n'
    text +='God Bless! - Impact Disciples Ministry'

    text += "<br><br><br><div>If you believe you received this confirmation by mistake, please click " +
      "<b><a href='https://us-central1-impactdisciplesdev.cloudfunctions.net/subscriptions?email="+ this.selectedItem.email +
      "&list=prayer_team_subscriptions'>here</a></b> to remove your address.</div>"

    this.emailService.sendTextEmail(this.selectedItem.email, subject, text);
  }

  sendPrayer(){
    this.authService.getUser().pipe(take(1)).subscribe(user => {
      this.prayer.sender = user.firstName + ' ' + user.lastName
      let html='';

      this.service.getAll().then(subscribers => {
        subscribers.forEach(subscriber => {
          let form = {};
          form['firstName'] = subscriber.firstName;
          form['lastName'] = subscriber.lastName;
          form['email'] = subscriber.email;
          form['date'] = subscriber;

          html = this.prayer.html
          html = html.replace('{{Recipient First Name}}', subscriber.firstName);
          html = html.replace('{{Recipient Last Name}}', subscriber.lastName);
          html = html.replace('{{Sender First Name}}', user.firstName);
          html = html.replace('{{Sender Last Name}}', user.lastName);
          html = html.replace('{{Date}}', (dateFromTimestamp(this.prayer.date) as Date).toLocaleString());
          html += "<br><br><br><div>If you believe you received this email by mistake, please click " +
            "<b><a href='https://us-central1-impactdisciplesdev.cloudfunctions.net/subscriptions?email="+ subscriber.email +
            "&list=prayer_team_subscriptions'>here</a></b> to remove your address.</div>"

          this.prayer.html = html;

          this.emailService.sendHtmlEmail(subscriber.email, this.prayer.subject, this.prayer.html);
        })
      }).then(() => {
        this.prayerService.add(this.prayer).then(prayer => {
          this.toastrService.success('Prayer Sent Successfully!');
          this.isPrayerVisible$.next(false);
        })
      })
    })
  }

  onCancel() {
    this.selectedItem = null;
    this.inProgress$.next(false);
    this.isEditVisible$.next(false);
  }

  onPrayerCancel() {
    this.prayer = null;
    this.inProgress$.next(false);
    this.isPrayerVisible$.next(false);
  }
}
