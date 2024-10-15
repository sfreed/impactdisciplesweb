import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { MacroCreatorComponent } from './macro-creator.component';
import { DxButtonModule, DxDataGridModule, DxNumberBoxModule, DxPopupModule, DxSelectBoxModule, DxTextBoxModule } from 'devextreme-angular';
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
    DxPopupModule,
    DxTextBoxModule,
    DxSelectBoxModule,
    DxNumberBoxModule,
    DxButtonModule
  ],
  exports: [
    MacroCreatorComponent
  ]
})
export class MacroAdminModule { }
