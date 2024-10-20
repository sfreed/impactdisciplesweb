import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormAdministrationComponent } from './form-administration.component';
import { FormMakerComponent } from './form-maker/form-maker.component';
import { FormResultsComponent } from './form-results/form-results.component';
import { FormViewerComponent } from './form-viewer/form-viewer.component';
import { DxButtonModule, DxCheckBoxModule, DxColorBoxModule, DxContextMenuModule, DxDataGridModule, DxDateBoxModule, DxNumberBoxModule, DxPopupModule, DxRadioGroupModule, DxScrollViewModule, DxSelectBoxModule, DxSortableModule, DxSwitchModule, DxTagBoxModule, DxTextAreaModule, DxTextBoxModule, DxToolbarModule, DxTooltipModule, DxValidatorModule } from 'devextreme-angular';
import { ContentModule } from '../common/content/content.module';
import { SafePipesModule } from '../common/pipes/safe-pipes.modult';
import { ViewsModule } from '../common/views/views.module';

@NgModule({
  declarations: [
    FormAdministrationComponent,
    FormMakerComponent,
    FormResultsComponent,
    FormViewerComponent
  ],
  imports: [
    CommonModule,
    ViewsModule,
    ContentModule,
    DxDataGridModule,
    DxPopupModule,
    DxTextBoxModule,
    DxToolbarModule,
    DxContextMenuModule,
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
