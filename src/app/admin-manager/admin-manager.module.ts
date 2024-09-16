import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogMessagesComponent } from './log-messages/log-messages.component';
import { UsersComponent } from './users/users.component';
import { DxButtonModule, DxDataGridModule, DxFileUploaderModule, DxFormModule, DxHtmlEditorModule, DxLoadIndicatorModule,
         DxPopupModule, DxSwitchModule, DxTabsModule, DxTagBoxModule, DxTextBoxModule,
         DxToolbarModule} from 'devextreme-angular';
import { NotificationsComponent } from './notifications/notifications.component';
import { CouponsComponent } from './coupons/coupons.component';
import { WebConfigComponent } from './web-config/web-config.component';
import { ImpactFormsModule } from 'impactdisciplescommon/src/forms/forms.module';
import { PhoneNumberMaskPipe } from 'impactdisciplescommon/src/pipes/phone-number.pipe';
import { ImpactDisciplesModule } from 'impactdisciplescommon/src/impactdisciples.common.module';
import { AdminManagerComponent } from './admin-manager.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    ImpactFormsModule,
    DxDataGridModule,
    DxButtonModule,
    DxFormModule,
    DxFileUploaderModule,
    DxHtmlEditorModule,
    DxLoadIndicatorModule,
    DxPopupModule,
    DxSwitchModule,
    DxTabsModule,
    DxTagBoxModule,
    DxTextBoxModule,
    DxToolbarModule,
    ImpactDisciplesModule,
    SharedModule
  ],
  declarations: [
    AdminManagerComponent,
    CouponsComponent,
    LogMessagesComponent,
    NotificationsComponent,
    UsersComponent,
    WebConfigComponent
  ],
  providers:[
    PhoneNumberMaskPipe
  ]
})
export class AdminManagerModule { }
