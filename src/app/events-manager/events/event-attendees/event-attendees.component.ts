import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DxFormComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { EventRegistrationModel } from 'impactdisciplescommon/src/models/domain/event-registration.model';
import { EventModel } from 'impactdisciplescommon/src/models/domain/event.model';
import { EventRegistrationService } from 'impactdisciplescommon/src/services/event-registration.service';
import { BehaviorSubject, map, Observable, take } from 'rxjs';
import { confirm } from 'devextreme/ui/dialog';
import notify from 'devextreme/ui/notify';
import { EmailList } from 'impactdisciplescommon/src/models/utils/email-list.model';
import { CustomerEmailModel } from 'impactdisciplescommon/src/models/domain/customer-email.model';
import { Timestamp } from 'firebase/firestore';
import { CustomerEmailService } from 'impactdisciplescommon/src/services/admin/customer-email.service';
import { EMailService } from 'impactdisciplescommon/src/services/admin/email.service';
import { EmailListService } from 'impactdisciplescommon/src/services/email-list.service';
import { ToastrService } from 'ngx-toastr';
import { dateFromTimestamp } from 'impactdisciplescommon/src/utils/date-from-timestamp';
import { AuthService } from 'impactdisciplescommon/src/services/utils/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-event-attendees',
  templateUrl: './event-attendees.component.html',
  styleUrls: ['./event-attendees.component.css']
})
export class EventAttendeesComponent implements OnInit{
  @Input('event') event: EventModel;

  @ViewChild('addEditForm', { static: false }) addEditForm: DxFormComponent;

  datasource$: Observable<DataSource>;
  selectedItem: EventRegistrationModel;
  selectedRows: string[] = [];
  selectedCustomers: EventRegistrationModel[] = [];
  selectedList: EmailList;
  emailLists: EmailList[];
  email: CustomerEmailModel

  itemType = 'Registered User';

  emailVals: string[] = ['Recipient First Name', 'Recipient Last Name', 'Sender First Name', 'Sender Last Name', 'Date'];

  public inProgress$ = new BehaviorSubject<boolean>(false)
  public isVisible$ = new BehaviorSubject<boolean>(false);
  public isEmailVisible$ = new BehaviorSubject<boolean>(false);
  public isListVisible$ = new BehaviorSubject<boolean>(false);

  constructor(public service: EventRegistrationService,
    private emailListService: EmailListService,
    private authService: AuthService,
    private emailService: EMailService,
    private toastrService: ToastrService,
    private customerEmailService: CustomerEmailService
  ){}

  async ngOnInit(): Promise<void> {
    if(this.event?.id){
      this.datasource$ = this.service.streamAllByValue('eventId', this.event.id).pipe(
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
                }
              })
            })
        )
      );

      this.emailLists = await this.emailListService.getAllByValue('type', 'attendees_'+ this.event.id).then(list => {
        if (list){
          return list;
        } else {
          return [];
        }
      });
    }
  }

  showEditModal = (e) => {
    this.selectedItem = (Object.assign({}, e.data));

    this.isVisible$.next(true);
  }

  showAddModal = () => {
    this.selectedItem = {... new EventRegistrationModel()};

    this.isVisible$.next(true);
  }

  showListModal = () => {
    this.selectedList = {... new EmailList()};

    this.isListVisible$.next(true);
  }

  showEmailModal = () => {
    this.email = {... new CustomerEmailModel()};
    this.email.date = Timestamp.now();
    this.isEmailVisible$.next(true);
  }

  onListFilterChanged(event: any) {
    if(event.value) {
      this.selectedRows = [];

      this.selectedList = this.emailLists.find(list => list.id === event.value) || null;

      this.selectedList.list.forEach(item => {
        this.selectedRows.push(item.id)
      })
    } else if(!event.value) {
      this.selectedList = {... new EmailList()};
      this.selectedRows = [];
    }
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

  onSave(item: EventRegistrationModel) {
    item.eventId = this.event.id;
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

  onListSave = () => {
    this.inProgress$.next(true);
    this.selectedList.list = this.selectedCustomers;
    this.selectedList.type = 'attendees_'+ this.event.id;

    if(this.selectedList.id) {
      this.emailListService.update(this.selectedList.id, this.selectedList).then((item) => {
        if(item) {
          notify({
            message: 'List Updated',
            position: 'top',
            width: 600,
            type: 'success'
          });
          this.onListCancel();
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
      this.emailListService.add(this.selectedList).then((item) => {
        if(item) {
          notify({
            message: 'List Added',
            position: 'top',
            width: 600,
            type: 'success'
          });

          this.emailLists.push(item);
          this.onListCancel();
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

  sendEmail(){
    this.authService.getUser().pipe(take(1)).subscribe(user => {
      this.email.sender = user.firstName + ' ' + user.lastName
      let html='';

      let list: Promise<EventRegistrationModel[]>
      if(this.selectedList){
        list = Promise.resolve(this.selectedList.list);
      } else {
        list = this.service.getAll();
      }

      list.then(subscribers => {
        console.log(subscribers)
        subscribers.forEach(subscriber => {
          html = this.email.html
          html = html.replace('{{Recipient First Name}}', subscriber.firstName);
          html = html.replace('{{Recipient Last Name}}', subscriber.lastName);
          html = html.replace('{{Sender First Name}}', user.firstName);
          html = html.replace('{{Sender Last Name}}', user.lastName);
          html = html.replace('{{Date}}', (dateFromTimestamp(this.email.date) as Date).toLocaleString());
          html += "<br><br><br><div>If you believe you received this email by mistake, please click " +
            "<b><a href='" + environment.unsubscribeUrl + "?email="+ subscriber.email +
            "&list=newsletter_subscriptions'>here</a></b> to remove your address.</div>"
          this.email.html = html;

          this.emailService.sendHtmlEmail(subscriber.email, this.email.subject, this.email.html);
        })
      }).then(() => {
        this.customerEmailService.add(this.email).then(email => {
          this.toastrService.success('Email ("' + email.subject + '") Sent Successfully!');
          this.isEmailVisible$.next(false);
        })
      })
    })
  }

  onCancel() {
    this.selectedItem = null;
    this.inProgress$.next(false);
    this.isVisible$.next(false);
  }

  onEmailCancel() {
    this.email = null;
    this.inProgress$.next(false);
    this.isEmailVisible$.next(false);
  }

  onListCancel() {
    this.inProgress$.next(false);
    this.isListVisible$.next(false);
  }

  selectRow(e){
    this.selectedCustomers = e.selectedRowsData;
  }
}
