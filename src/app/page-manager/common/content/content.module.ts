import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoAdministrationComponent } from './video-administration/video-administration.component';
import { VideosComponent } from './videos/videos.component';
import {
  DxButtonModule,
  DxDataGridModule,
  DxFileManagerModule,
  DxHtmlEditorModule,
  DxPopupModule,
  DxSelectBoxModule,
} from 'devextreme-angular';
import { CardDividerComponent } from './card-divider/card-divider.component';
import { CardImageUploaderComponent } from './card-image-uploader/card-image-uploader.component';
import { CardSpacerComponent } from './card-spacer/card-spacer.component';
import { CardTextEditorComponent } from './card-text-editor/card-text-editor.component';
import { ContentRouting } from './content-routing.module';
import { YearEndMessageComponent } from './year-end-message/year-end-message.component';
import { SafePipesModule } from '../pipes/safe-pipes.modult';

@NgModule({
  declarations: [
    CardDividerComponent,
    CardImageUploaderComponent,
    CardSpacerComponent,
    CardTextEditorComponent,
    VideoAdministrationComponent,
    VideosComponent,
    YearEndMessageComponent,
  ],
  imports: [
    ContentRouting,
    CommonModule,
    DxDataGridModule,
    DxSelectBoxModule,
    DxPopupModule,
    DxHtmlEditorModule,
    DxFileManagerModule,
    DxButtonModule,
    SafePipesModule
  ],
  exports: [
    CardDividerComponent,
    CardImageUploaderComponent,
    CardSpacerComponent,
    CardTextEditorComponent,
    VideoAdministrationComponent,
    VideosComponent,
    YearEndMessageComponent
  ],
})
export class ContentModule {}
