import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { DxFormModule, DxTabsModule, DxToolbarModule } from 'devextreme-angular';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    MainScreenComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DxToolbarModule,
    DxTabsModule,
    DxFormModule
  ]
})
export class CoreModule { }
