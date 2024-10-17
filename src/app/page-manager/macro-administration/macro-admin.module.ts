import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { MacroCreatorComponent } from './macro-creator.component';
import { DxButtonModule, DxColorBoxModule, DxContextMenuModule, DxDataGridModule, DxNumberBoxModule, DxPopupModule, DxSelectBoxModule, DxTextBoxModule, DxToolbarModule } from 'devextreme-angular';
import { FormsModule } from '@angular/forms';
import { MacroRouting } from './macro-routing.module';


@NgModule({
  declarations: [
    MacroCreatorComponent
  ],
  imports: [
    MacroRouting,
    CommonModule,
    FormsModule,
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
