import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { DxButtonModule, DxContextMenuModule, DxDataGridModule, DxPopupModule, DxScrollViewModule, DxSelectBoxModule, DxToolbarModule } from 'devextreme-angular';
import { SplashScreenAdminComponent } from './splash-screen-admin.component';

@NgModule({
  declarations: [
    SplashScreenAdminComponent
  ],
  imports: [
    CommonModule,
    DxButtonModule,
    DxContextMenuModule,
    DxDataGridModule,
    DxPopupModule,
    DxSelectBoxModule,
    DxScrollViewModule,
    DxToolbarModule,
  ],
  exports: [
    SplashScreenAdminComponent
  ]
})
export class SplashScreenAdminModule { }
