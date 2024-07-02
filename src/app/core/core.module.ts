import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { DxTabsModule, DxToolbarModule } from 'devextreme-angular';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    MainScreenComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DxToolbarModule,
    DxTabsModule
  ]
})
export class CoreModule { }
