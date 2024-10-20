import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { CardAdministrationComponent } from './card-administration.component';
import { CardMakerComponent } from './card-maker/card-maker.component';
import { DxButtonModule, DxCheckBoxModule, DxColorBoxModule, DxContextMenuModule, DxDataGridModule, DxDateBoxModule, DxFileUploaderModule,
         DxFormModule,
         DxGalleryModule, DxListModule, DxNumberBoxModule, DxPopupModule, DxRadioGroupModule, DxScrollViewModule,
         DxSelectBoxModule, DxSortableModule, DxSwitchModule, DxTagBoxModule, DxTextAreaModule, DxTextBoxModule,
         DxTileViewModule, DxToolbarModule, DxTooltipModule } from 'devextreme-angular';
import { CardViewerComponent } from './card-viewer/card-viewer.component';
import { ContentModule } from '../common/content/content.module';
import { SafePipesModule } from '../common/pipes/safe-pipes.modult';
import { ViewsModule } from '../common/views/views.module';

@NgModule({
  declarations: [
    CardAdministrationComponent,
    CardMakerComponent,
    CardViewerComponent,
  ],
  imports: [
    CommonModule,
    ContentModule,
    DxDataGridModule,
    DxPopupModule,
    DxTextBoxModule,
    DxToolbarModule,
    DxContextMenuModule,
    DxButtonModule,
    DxFormModule,
    DxNumberBoxModule,
    DxCheckBoxModule,
    DxColorBoxModule,
    DxSelectBoxModule,
    DxSortableModule,
    DxScrollViewModule,
    DxListModule,
    DxGalleryModule,
    DxTagBoxModule,
    DxTextAreaModule,
    DxDateBoxModule,
    DxSwitchModule,
    DxRadioGroupModule,
    DxFileUploaderModule,
    DxTileViewModule,
    DxTooltipModule,
    SafePipesModule,
    ViewsModule,
  ],
  exports: [
    CardAdministrationComponent
  ]
})
export class CardsAdminModule { }
