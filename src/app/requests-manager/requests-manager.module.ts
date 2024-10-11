import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxAutocompleteModule, DxButtonModule, DxContextMenuModule, DxDataGridModule, DxFileUploaderModule, DxFormModule, DxHtmlEditorModule, DxLoadIndicatorModule, DxLookupModule, DxPopupModule,
         DxScrollViewModule,
         DxSelectBoxModule,
         DxSwitchModule, DxTabsModule, DxTextBoxModule,
         DxToolbarModule} from 'devextreme-angular';
import { ImpactFormsModule } from 'impactdisciplescommon/src/forms/forms.module';
import { LunchAndLearnsComponent } from './lunch-and-learns-requests/lunch-and-learns.component';
import { SeminarsComponent } from './seminars-requests/seminars.component';
import { PhoneNumberMaskPipe } from 'impactdisciplescommon/src/pipes/phone-number.pipe';
import { ImpactDisciplesModule } from 'impactdisciplescommon/src/impactdisciples.common.module';
import { ConsultationsRequestsComponent } from './consultations-requests/consultations-requests.component';
import { ConsultationsSurveysComponent } from './consultations-surveys/consultations-surveys.component';
import { RequestsManagerComponent } from './requests-manager.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    ImpactFormsModule,
    DxAutocompleteModule,
    DxContextMenuModule,
    DxDataGridModule,
    DxButtonModule,
    DxFormModule,
    DxFileUploaderModule,
    DxHtmlEditorModule,
    DxLookupModule,
    DxLoadIndicatorModule,
    DxPopupModule,
    DxScrollViewModule,
    DxSelectBoxModule,
    DxSwitchModule,
    DxTabsModule,
    DxTextBoxModule,
    DxToolbarModule,
    ImpactDisciplesModule,
    SharedModule
  ],
  declarations: [
    RequestsManagerComponent,
    ConsultationsRequestsComponent,
    ConsultationsSurveysComponent,
    LunchAndLearnsComponent,
    SeminarsComponent,
  ],
  providers:[
    PhoneNumberMaskPipe
  ]
})
export class RequestsManagerModule { }
