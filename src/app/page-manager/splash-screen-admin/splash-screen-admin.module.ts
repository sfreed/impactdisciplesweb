import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { DxDataGridModule, DxPopupModule, DxScrollViewModule, DxSelectBoxModule } from 'devextreme-angular';
import { FormsModule } from '@angular/forms';
import { SplashScreenAdminComponent } from './splash-screen-admin.component';
import { SplashScreenRouting } from './splash-screen-routing.module';



@NgModule({
  declarations: [
    SplashScreenAdminComponent
  ],
  imports: [
    SplashScreenRouting,
    CommonModule,
    FormsModule,
    DxDataGridModule,
    DxPopupModule,
    DxSelectBoxModule,
    DxScrollViewModule
  ],
  exports: [
    SplashScreenAdminComponent
  ]
})
export class SplashScreenAdminModule { }
