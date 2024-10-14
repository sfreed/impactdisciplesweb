import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentFooterViewComponent } from './footer-view/footer-view.component';
import { FooterButtonViewComponent } from './footer-view/footer-button-view/footer-button-view.component';
import { FooterImageViewComponent } from './footer-view/footer-image-view/footer-image-view.component';
import { FooterLinkViewComponent } from './footer-view/footer-link-view/footer-link-view.component';
import { ComponentHeaderViewComponent } from './header-view/header-view.component';
import { DxButtonModule, DxCheckBoxModule, DxColorBoxModule, DxListModule, DxPopupModule, DxSelectBoxModule, DxTextBoxModule } from 'devextreme-angular';
import { ContentModule } from '../common/content/content.module';
import { SafePipesModule } from '../common/pipes/safe-pipes.modult';

@NgModule({
  declarations: [
    ComponentFooterViewComponent,
    FooterButtonViewComponent,
    FooterImageViewComponent,
    FooterLinkViewComponent,
    ComponentHeaderViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ContentModule,
    DxSelectBoxModule,
    DxPopupModule,
    DxButtonModule,
    DxListModule,
    DxCheckBoxModule,
    DxColorBoxModule,
    DxTextBoxModule,
    DxSelectBoxModule,
    SafePipesModule
  ],
  exports: [
    ComponentFooterViewComponent,
    FooterButtonViewComponent,
    FooterImageViewComponent,
    FooterLinkViewComponent,
    ComponentHeaderViewComponent
  ]
})
export class ComponentAdminModule { }
