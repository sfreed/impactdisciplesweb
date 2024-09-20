import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreManagerComponent } from './store-manager.component';
import { DxButtonModule, DxDataGridModule, DxFormModule, DxPopupModule, DxTabsModule, DxTagBoxModule, DxToolbarModule } from 'devextreme-angular';
import { ProductsComponent } from './products/products.component';
import { SalesComponent } from './sales/sales.component';
import { SharedModule } from '../shared/shared.module';
import { ImpactFormsModule } from 'impactdisciplescommon/src/forms/forms.module';

@NgModule({
  declarations: [
    StoreManagerComponent,
    ProductsComponent,
    SalesComponent
  ],
  imports: [
    CommonModule,
    ImpactFormsModule,
    DxButtonModule,
    DxDataGridModule,
    DxFormModule,
    DxPopupModule,
    DxTabsModule,
    DxTagBoxModule,
    DxToolbarModule,
    SharedModule
  ]
})
export class StoreManagerModule { }
