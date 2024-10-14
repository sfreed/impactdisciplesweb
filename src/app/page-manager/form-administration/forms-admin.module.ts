import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormAdministrationComponent } from './form-administration.component';
import { FormMakerComponent } from './form-maker/form-maker.component';
import { FormResultsComponent } from './form-results/form-results.component';
import { FormViewerComponent } from './form-viewer/form-viewer.component';
import { DxButtonModule, DxCheckBoxModule, DxColorBoxModule, DxDataGridModule, DxDateBoxModule, DxNumberBoxModule, DxPopupModule, DxRadioGroupModule, DxScrollViewModule, DxSelectBoxModule, DxSortableModule, DxSwitchModule, DxTagBoxModule, DxTextAreaModule, DxTextBoxModule, DxTooltipModule, DxValidatorModule } from 'devextreme-angular';
import { FormBodyViewComponent } from './form/body-view/body-view.component';
import { FormHeaderViewComponent } from './form/header-view/header-view.component';
import { FormsModule } from '@angular/forms';
import { BooleanComponent } from './form/input/boolean/boolean.component';
import { DateComponent } from './form/input/date/date.component';
import { DateTimeComponent } from './form/input/date-time/date-time.component';
import { MultipleCheckboxComponent } from './form/input/multiple-checkbox/multiple-checkbox.component';
import { NumberComponent } from './form/input/number/number.component';
import { RadioButtonsComponent } from './form/input/radio-buttons/radio-buttons.component';
import { SelectComponent } from './form/input/select/select.component';
import { SingleCheckboxComponent } from './form/input/single-checkbox/single-checkbox.component';
import { TextComponent } from './form/input/text/text.component';
import { TextareaComponent } from './form/input/textarea/textarea.component';
import { FormRouting } from './form-routing.module';
import { ContentModule } from '../common/content/content.module';
import { SafePipesModule } from '../common/pipes/safe-pipes.modult';

@NgModule({
  declarations: [
    FormAdministrationComponent,
    FormMakerComponent,
    FormResultsComponent,
    FormViewerComponent,
    FormBodyViewComponent,
    FormHeaderViewComponent,
    BooleanComponent, DateComponent, DateTimeComponent, MultipleCheckboxComponent,
    NumberComponent, RadioButtonsComponent, SelectComponent, SingleCheckboxComponent,
    TextComponent, TextareaComponent
  ],
  imports: [
    FormRouting,
    CommonModule,
    FormsModule,
    ContentModule,
    DxDataGridModule,
    DxPopupModule,
    DxTextBoxModule,
    DxNumberBoxModule,
    DxSelectBoxModule,
    DxButtonModule,
    DxSortableModule,
    DxTooltipModule,
    DxCheckBoxModule,
    DxColorBoxModule,
    DxTextAreaModule,
    DxValidatorModule,
    DxScrollViewModule,
    DxTagBoxModule,
    DxSwitchModule,
    DxDateBoxModule,
    DxRadioGroupModule,
    SafePipesModule
  ],
  exports: [
    FormAdministrationComponent
  ]
})
export class FormsAdminModule { }
