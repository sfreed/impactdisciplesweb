import { NgModule } from '@angular/core';
import { SideNavInnerToolbarComponent } from './side-nav-inner-toolbar/side-nav-inner-toolbar.component';
import { SideNavOuterToolbarComponent } from './side-nav-outer-toolbar/side-nav-outer-toolbar.component';
import { DxDrawerModule, DxScrollViewModule, DxToolbarModule } from 'devextreme-angular';
import { UtilsModule } from '../shared/components/utils/utils.module';

@NgModule({
  declarations: [
    SideNavInnerToolbarComponent,
    SideNavOuterToolbarComponent,
  ],
  imports: [
    UtilsModule,
    DxDrawerModule,
    DxToolbarModule,
    DxScrollViewModule
  ],
  providers: [
  ],
  exports: [
    SideNavInnerToolbarComponent,
    SideNavOuterToolbarComponent,    
  ]
})
export class LayoutsModule { }
