import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { PageAdministrationComponent } from './page-administration.component';
import { PageMakerComponent } from './page-maker/page-maker.component';
import { PageViewerComponent } from './page-viewer/page-viewer.component';
import { PageHeaderViewComponent } from '../common/views/pages/header-view/header-view.component';
import { DxButtonModule, DxColorBoxModule, DxContextMenuModule, DxDataGridModule, DxNumberBoxModule, DxPopupModule, DxScrollViewModule, DxSelectBoxModule, DxTextBoxModule, DxToolbarModule } from 'devextreme-angular';
import { CardsAdminModule } from '../card-administration/cards-admin.module';
import { ContentModule } from '../common/content/content.module';

@NgModule({
  declarations: [
    PageAdministrationComponent,
    PageMakerComponent,
    PageViewerComponent,
    PageHeaderViewComponent
  ],
  imports: [
    CommonModule,
    CardsAdminModule,
    ContentModule,
    DxDataGridModule,
    DxButtonModule,
    DxSelectBoxModule,
    DxScrollViewModule,
    DxToolbarModule,
    DxContextMenuModule,
    DxNumberBoxModule,
    DxPopupModule,
    DxTextBoxModule,
    DxColorBoxModule
  ],
  exports: [
    PageAdministrationComponent
  ]
})
export class PagesAdminModule { }
