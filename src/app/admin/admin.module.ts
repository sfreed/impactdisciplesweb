import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogMessagesComponent } from './log-messages/log-messages.component';
import { UsersComponent } from './users/users.component';
import { DxButtonModule, DxDataGridModule, DxFormModule, DxPopupModule } from 'devextreme-angular';
import { NotificationsComponent } from './notifications/notifications.component';


@NgModule({
  imports: [
    CommonModule,
    DxDataGridModule,
    DxButtonModule,
    DxFormModule,
    DxPopupModule
  ],
  declarations: [
    LogMessagesComponent,
    UsersComponent,
    NotificationsComponent
  ]
})
export class AdminModule { }
