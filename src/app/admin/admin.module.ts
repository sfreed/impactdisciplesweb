import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogMessagesComponent } from './log-messages/log-messages.component';
import { UsersComponent } from './users/users.component';
import { DxDataGridModule } from 'devextreme-angular';


@NgModule({
  imports: [
    CommonModule,
    DxDataGridModule
  ],
  declarations: [
    LogMessagesComponent,
    UsersComponent
  ]
})
export class AdminModule { }
