import { Component } from '@angular/core';
import { DxButtonTypes } from 'devextreme-angular/ui/button';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { Functions, getFunctions, HttpsCallable, httpsCallable } from "firebase/functions";
import { NotificationRegistrationModel } from 'impactdisciplescommon/src/models/admin/notification-registration.model';
import { NotificationRegistrationService } from 'impactdisciplescommon/src/services/admin/notification-registration.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {
  functions: Functions;

  addMessageFunction: HttpsCallable;

  dataSource: Observable<DataSource>;

  isSendScreenVisible: boolean = false;

  title: string = '';
  body: string = '';

  addSessionButtonOptions: DxButtonTypes.Properties = {
    text: 'Send',
    onClick: () => {
      setTimeout(() => this.sendMessage(), 5000);

    },
  };

  cancelSessionButtonOptions: DxButtonTypes.Properties = {
    text: 'Cancel',
    onClick: () => {
      this.isSendScreenVisible = false;
      this.clearForm()
    },
  };

  constructor(private service: NotificationRegistrationService) {
    this.functions = getFunctions();
    this.addMessageFunction = httpsCallable(this.functions, 'sendNotification');

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
              insert: function (value: NotificationRegistrationModel) {
                return service.add(value);
              },
              update: function (key: any, value: NotificationRegistrationModel) {
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

  sendMessage(){
    this.addMessageFunction({ title: this.title, body: this.body, token: this.selectedRegistration.fcmId }).then((result: any) => {
      this.isSendScreenVisible = false;
      this.body = '';
      this.title = '';
    });
  }

  clearForm(){
    this.body = '';
    this.title = '';
  }

  selectedRegistration: NotificationRegistrationModel;

  showSendMessage(e){
    this.selectedRegistration = e.row.data;
    this.isSendScreenVisible = true;
  }
}

