import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { DxButtonModule, DxContextMenuModule, DxPopupModule, DxScrollViewModule, DxSelectBoxModule, DxTabsModule, DxTagBoxModule, DxTextBoxModule, DxToolbarModule, DxTreeListModule } from 'devextreme-angular';
import { MenuAdministrationComponent } from './menu-administration.component';
import { IconsModule } from '../common/icons/icons.module';


@NgModule({
  declarations: [
    MenuAdministrationComponent
  ],
  imports: [
    CommonModule,
    DxTreeListModule,
    DxTagBoxModule,
    DxToolbarModule,
    DxContextMenuModule,
    DxButtonModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    DxPopupModule,
    DxTabsModule,
    DxScrollViewModule,
    IconsModule
  ],
  exports: [
    MenuAdministrationComponent
  ]
})
export class MenuAdminModule { }
