import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { CardAdministrationComponent } from './card-administration.component';
import { CardMakerComponent } from './card-maker/card-maker.component';
import { DxButtonModule, DxCheckBoxModule, DxColorBoxModule, DxContextMenuModule, DxDataGridModule, DxDateBoxModule, DxFileUploaderModule,
         DxFormModule,
         DxGalleryModule, DxListModule, DxNumberBoxModule, DxPopupModule, DxRadioGroupModule, DxScrollViewModule,
         DxSelectBoxModule, DxSortableModule, DxSwitchModule, DxTagBoxModule, DxTextAreaModule, DxTextBoxModule,
         DxTileViewModule, DxToolbarModule, DxTooltipModule } from 'devextreme-angular';
import { FormsModule } from '@angular/forms';
import { CardBodyViewComponent } from './card/body-view/body-view.component';
import { CardHeaderViewComponentComponent } from './card/header-view/header-view.component';
import { ButtonComponentComponent } from './card/components/button-component/button-component.component';
import { CarouselComponentComponent } from './card/components/carousel-component/carousel-component.component';
import { ContentComponentComponent } from './card/components/content-component/content-component.component';
import { CustomComponentComponent } from './card/components/custom-component/custom-component.component';
import { FormMakerComponentComponent } from './card/components/form-maker-component/form-maker-component.component';
import { GalleryComponentComponent } from './card/components/gallery-component/gallery-component.component';
import { IframeComponentComponent } from './card/components/iframe-component/iframe-component.component';
import { ImageComponentComponent } from './card/components/image-component/image-component.component';
import { ImageDividerComponentComponent } from './card/components/image-divider-component/image-divider-component.component';
import { TeamMemberComponentComponent } from './card/components/team-member-component/team-member-component.component';
import { TestimonialComponent } from './card/components/testimonial-component/testimonial-component.component';
import { VideoComponentComponent } from './card/components/video-component/video-component.component';
import { CardRouting } from './card-routing.module';
import { CardViewerComponent } from './card-viewer/card-viewer.component';
import { ComponentAdminModule } from '../component-administration/component-admin.module';
import { ContentModule } from '../common/content/content.module';
import { SafePipesModule } from '../common/pipes/safe-pipes.modult';

@NgModule({
  declarations: [
    CardAdministrationComponent,
    CardMakerComponent,
    CardViewerComponent,
    CardBodyViewComponent,
    CardHeaderViewComponentComponent,
    ButtonComponentComponent, CarouselComponentComponent, ContentComponentComponent, CustomComponentComponent,
    FormMakerComponentComponent, GalleryComponentComponent, IframeComponentComponent, ImageComponentComponent,
    ImageDividerComponentComponent, TeamMemberComponentComponent,TestimonialComponent, VideoComponentComponent
  ],
  imports: [
    CardRouting,
    CommonModule,
    FormsModule,
    ComponentAdminModule,
    ContentModule,
    DxDataGridModule,
    DxPopupModule,
    DxTextBoxModule,
    DxToolbarModule,
    DxContextMenuModule,
    DxButtonModule,
    DxFormModule,
    DxNumberBoxModule,
    DxCheckBoxModule,
    DxColorBoxModule,
    DxSelectBoxModule,
    DxSortableModule,
    DxScrollViewModule,
    DxListModule,
    DxGalleryModule,
    DxTagBoxModule,
    DxTextAreaModule,
    DxDateBoxModule,
    DxSwitchModule,
    DxRadioGroupModule,
    DxFileUploaderModule,
    DxTileViewModule,
    DxTooltipModule,
    SafePipesModule
  ],
  exports: [
    CardAdministrationComponent
  ]
})
export class CardsAdminModule { }
