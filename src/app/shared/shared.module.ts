import { NgModule } from "@angular/core";
import { IndicatorButtonComponent } from "./indicator-button/indicator-button.component";
import { DxButtonModule, DxLoadIndicatorModule } from "devextreme-angular";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [IndicatorButtonComponent],
  imports: [CommonModule, DxButtonModule, DxLoadIndicatorModule],
  exports: [IndicatorButtonComponent]
})
export class SharedModule {}
