import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { DxChartModule, DxDrawerModule, DxFormModule, DxListModule, DxTabsModule, DxToolbarModule } from 'devextreme-angular';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    MainScreenComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DxToolbarModule,
    DxTabsModule,
    DxFormModule,
    DxChartModule,
    DxDrawerModule,
    DxListModule
  ]
})
export class CoreModule { }
