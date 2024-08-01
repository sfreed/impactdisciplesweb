import { Component } from '@angular/core';
import { DxButtonTypes } from 'devextreme-angular/ui/button';
import CustomStore from 'devextreme/data/custom_store';
import { Functions, getFunctions, HttpsCallable, httpsCallable } from "firebase/functions";
import { NotificationRegistrationModel } from 'impactdisciplescommon/src/models/admin/notification-registration.model';
import { NotificationRegistrationService } from 'impactdisciplescommon/src/services/admin/notification-registration.service';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {
  functions: Functions;

  addMessageFunction: HttpsCallable;

  dataSource: any;

  isSendScreenVisible: boolean = false;

  message: string = '';

  addSessionButtonOptions: DxButtonTypes.Properties = {
    text: 'Send',
    onClick: () => {
      setTimeout(() => this.sendMessage(), 5000);

    },
  };

  constructor(notificationRegistrationService: NotificationRegistrationService) {
    this.functions = getFunctions();
    this.addMessageFunction = httpsCallable(this.functions, 'sendNotification');

    this.dataSource = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      load: function (loadOptions: any) {
        return notificationRegistrationService.getAll();
      },
      insert: function (value: NotificationRegistrationModel) {
        return notificationRegistrationService.add(value);
      },
      update: function (key: any, value: NotificationRegistrationModel) {
        return notificationRegistrationService.update(key, value)
      },
      remove: function (id: any) {
        return notificationRegistrationService.delete(id);
      },
    });
   }

  ngOnInit() {
  }

  onRowUpdating(options) {
    options.newData = Object.assign(options.oldData, options.newData);
  }

  sendMessage(){
    console.log('sending ' + this.message);
    console.log()

    this.addMessageFunction({ text: this.message, token: this.selectedRegistration.fcmId }).then((result: any) => {
      const data = result;

      console.log(data);

      this.isSendScreenVisible = false;
      this.message = '';
    });
  }

  selectedRegistration: NotificationRegistrationModel;

  showSendMessage(e){
    this.selectedRegistration = e.row.data;
    this.isSendScreenVisible = true;
  }
}

