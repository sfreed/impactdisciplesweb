import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreManagerComponent } from './store-manager.component';
import { DxButtonModule, DxContextMenuModule, DxDataGridModule, DxDropDownBoxModule, DxFormModule, DxHtmlEditorModule, DxListModule, DxLoadIndicatorModule, DxNumberBoxModule, DxPopupModule, DxSelectBoxModule, DxSwitchModule, DxTabsModule, DxTagBoxModule, DxTextBoxModule, DxToolbarModule } from 'devextreme-angular';
import { ProductsComponent } from './products/products.component';
import { SalesComponent } from './sales/sales.component';
import { SharedModule } from '../shared/shared.module';
import { ImpactFormsModule } from 'impactdisciplescommon/src/forms/forms.module';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { CategoryModalComponent } from './product-categories/category-modal/category-modal.component';
import { ProductSeriesComponent } from './product-series/product-series.component';
import { SeriesModalComponent } from './product-series/series-modal/series-modal.component';

@NgModule({
  declarations: [
    StoreManagerComponent,
    ProductsComponent,
    SalesComponent,
    ProductCategoriesComponent,
    CategoryModalComponent,
    ProductSeriesComponent,
    SeriesModalComponent
  ],
  imports: [
    CommonModule,
    ImpactFormsModule,
    DxButtonModule,
    DxDataGridModule,
    DxFormModule,
    DxHtmlEditorModule,
    DxListModule,
    DxNumberBoxModule,
    DxPopupModule,
    DxSelectBoxModule,
    DxSwitchModule,
    DxTabsModule,
    DxTagBoxModule,
    DxTextBoxModule,
    DxToolbarModule,
    DxDropDownBoxModule,
    DxContextMenuModule,
    SharedModule,
    DxLoadIndicatorModule
  ]
})
export class StoreManagerModule { }
