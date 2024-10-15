import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { PageAdministrationComponent } from './page-administration.component';
import { PageMakerComponent } from './page-maker/page-maker.component';
import { PageViewerComponent } from './page-viewer/page-viewer.component';
import { PageHeaderViewComponent } from './page/header-view/header-view.component';
import { FormsModule } from '@angular/forms';
import { DxButtonModule, DxColorBoxModule, DxDataGridModule, DxPopupModule, DxSelectBoxModule, DxTextBoxModule } from 'devextreme-angular';
import { PageRouting } from './page-routing.module';
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
    PageRouting,
    CommonModule,
    FormsModule,
    CardsAdminModule,
    ContentModule,
    DxDataGridModule,
    DxButtonModule,
    DxSelectBoxModule,
    DxPopupModule,
    DxTextBoxModule,
    DxColorBoxModule
  ],
  exports: [
    PageAdministrationComponent
  ]
})
export class PagesAdminModule { }
