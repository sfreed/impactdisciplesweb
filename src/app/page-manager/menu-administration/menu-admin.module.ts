import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { DxPopupModule, DxScrollViewModule, DxSelectBoxModule, DxTabsModule, DxTagBoxModule, DxTextBoxModule, DxTreeListModule } from 'devextreme-angular';
import { FormsModule } from '@angular/forms';
import { MenuRouting } from './menu-routing.module';
import { MenuAdministrationComponent } from './menu-administration.component';
import { IconsModule } from '../common/icons/icons.module';


@NgModule({
  declarations: [
    MenuAdministrationComponent
  ],
  imports: [
    MenuRouting,
    CommonModule,
    FormsModule,
    DxTreeListModule,
    DxTagBoxModule,
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
