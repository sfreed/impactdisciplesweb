import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { MacroCreatorComponent } from './macro-creator.component';
import { DxButtonModule, DxColorBoxModule, DxContextMenuModule, DxDataGridModule, DxNumberBoxModule, DxPopupModule, DxSelectBoxModule, DxTextBoxModule, DxToolbarModule } from 'devextreme-angular';

@NgModule({
  declarations: [
    MacroCreatorComponent
  ],
  imports: [
    CommonModule,
    DxDataGridModule,
    DxColorBoxModule,
    DxPopupModule,
    DxTextBoxModule,
    DxToolbarModule,
    DxContextMenuModule,
    DxSelectBoxModule,
    DxNumberBoxModule,
    DxButtonModule
  ],
  exports: [
    MacroCreatorComponent
  ]
})
export class MacroAdminModule { }
