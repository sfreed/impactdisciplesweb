import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogMessagesComponent } from './log-messages/log-messages.component';
import { UsersComponent } from './users/users.component';
import { DxButtonModule, DxDataGridModule, DxFileUploaderModule, DxFormModule, DxHtmlEditorModule, DxListModule, DxLoadIndicatorModule,
         DxNumberBoxModule,
         DxPopupModule, DxSelectBoxModule, DxSwitchModule, DxTabsModule, DxTagBoxModule, DxTextBoxModule,
         DxToolbarModule,
         DxValidatorModule} from 'devextreme-angular';
import { NotificationsComponent } from './notifications/notifications.component';
import { WebConfigComponent } from './web-config/web-config.component';
import { ImpactFormsModule } from 'impactdisciplescommon/src/forms/forms.module';
import { PhoneNumberMaskPipe } from 'impactdisciplescommon/src/pipes/phone-number.pipe';
import { ImpactDisciplesModule } from 'impactdisciplescommon/src/impactdisciples.common.module';
import { AdminManagerComponent } from './admin-manager.component';
import { SharedModule } from '../shared/shared.module';
import { EmailTemplatesComponent } from './email-templates/email-templates.component';


@NgModule({
  imports: [
    CommonModule,
    ImpactFormsModule,
    DxDataGridModule,
    DxButtonModule,
    DxFormModule,
    DxFileUploaderModule,
    DxHtmlEditorModule,
    DxListModule,
    DxLoadIndicatorModule,
    DxNumberBoxModule,
    DxPopupModule,
    DxSelectBoxModule,
    DxSwitchModule,
    DxTabsModule,
    DxTagBoxModule,
    DxTextBoxModule,
    DxToolbarModule,
    DxValidatorModule,
    ImpactDisciplesModule,
    SharedModule
  ],
  declarations: [
    AdminManagerComponent,
    LogMessagesComponent,
    NotificationsComponent,
    UsersComponent,
    WebConfigComponent,
    EmailTemplatesComponent
  ],
  providers:[
    PhoneNumberMaskPipe
  ]
})
export class AdminManagerModule { }
