import { NgModule } from '@angular/core';
import { DxDrawerModule, DxScrollViewModule, DxTabsModule, DxToolbarModule } from 'devextreme-angular';
import { RootComponent } from './root/root.component';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [
    RootComponent
  ],
  imports: [
    AppRoutingModule,
    DxDrawerModule,
    DxTabsModule,
    DxToolbarModule,
    DxScrollViewModule
  ],
  providers: [
  ],
  exports: [
  ]
})
export class LayoutsModule { }
