import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardBodyViewComponent } from './cards/body-view/body-view.component';
import { CardHeaderViewComponent } from './cards/header-view/header-view.component';
import { FormHeaderViewComponent } from './forms/header-view/header-view.component';
import { FormBodyViewComponent } from './forms/body-view/body-view.component';
import { BooleanComponent } from './forms/inputs/boolean/boolean.component';
import { DateComponent } from './forms/inputs/date/date.component';
import { DateTimeComponent } from './forms/inputs/date-time/date-time.component';
import { MultipleCheckboxComponent } from './forms/inputs/multiple-checkbox/multiple-checkbox.component';
import { NumberComponent } from './forms/inputs/number/number.component';
import { RadioButtonsComponent } from './forms/inputs/radio-buttons/radio-buttons.component';
import { SelectComponent } from './forms/inputs/select/select.component';
import { SingleCheckboxComponent } from './forms/inputs/single-checkbox/single-checkbox.component';
import { TextComponent } from './forms/inputs/text/text.component';
import { TextareaComponent } from './forms/inputs/textarea/textarea.component';
import { ComponentHeaderViewComponent } from './components/header-view/header-view.component';
import { ComponentFooterViewComponent } from './components/footer-view/footer-view.component';
import { FooterButtonViewComponent } from './components/footer-view/footer-button-view/footer-button-view.component';
import { FooterImageViewComponent } from './components/footer-view/footer-image-view/footer-image-view.component';
import { FooterLinkViewComponent } from './components/footer-view/footer-link-view/footer-link-view.component';
import { ButtonComponentComponent } from './components/body-view/button-component/button-component.component';
import { CarouselComponentComponent } from './components/body-view/carousel-component/carousel-component.component';
import { ContentComponentComponent } from './components/body-view/content-component/content-component.component';
import { CustomComponentComponent } from './components/body-view/custom-component/custom-component.component';
import { FormMakerComponentComponent } from './components/body-view/form-maker-component/form-maker-component.component';
import { GalleryComponentComponent } from './components/body-view/gallery-component/gallery-component.component';
import { IframeComponentComponent } from './components/body-view/iframe-component/iframe-component.component';
import { ImageComponentComponent } from './components/body-view/image-component/image-component.component';
import { ImageDividerComponentComponent } from './components/body-view/image-divider-component/image-divider-component.component';
import { TeamMemberComponentComponent } from './components/body-view/team-member-component/team-member-component.component';
import { TestimonialComponent } from './components/body-view/testimonial-component/testimonial-component.component';
import { VideoComponentComponent } from './components/body-view/video-component/video-component.component';
import { DxButtonModule, DxCheckBoxModule, DxDateBoxModule, DxFormModule, DxNumberBoxModule, DxPopupModule, DxRadioGroupModule, DxScrollViewModule, DxSelectBoxModule, DxSortableModule, DxTagBoxModule, DxTextAreaModule, DxTextBoxModule, DxTooltipModule, DxValidationGroupModule, DxValidatorModule, DxSwitchModule, DxColorBoxModule, DxListModule, DxTileViewModule, DxDataGridModule, DxGalleryModule, DxToolbarModule, DxContextMenuModule } from 'devextreme-angular';
import { ContentModule } from '../content/content.module';
import { SafePipesModule } from '../pipes/safe-pipes.modult';

@NgModule({
  declarations: [
    CardBodyViewComponent,
    CardHeaderViewComponent,
    FormHeaderViewComponent,
    FormBodyViewComponent,
    BooleanComponent,
    DateComponent,
    DateTimeComponent,
    MultipleCheckboxComponent,
    NumberComponent,
    RadioButtonsComponent,
    SelectComponent,
    SingleCheckboxComponent,
    TextComponent,
    TextareaComponent,
    ComponentHeaderViewComponent,
    ComponentFooterViewComponent,
    FooterButtonViewComponent,
    FooterImageViewComponent,
    FooterLinkViewComponent,
    ButtonComponentComponent,
    CarouselComponentComponent,
    ContentComponentComponent,
    CustomComponentComponent,
    FormMakerComponentComponent,
    GalleryComponentComponent,
    IframeComponentComponent,
    ImageComponentComponent,
    ImageDividerComponentComponent,
    TeamMemberComponentComponent,
    TestimonialComponent,
    VideoComponentComponent,
  ],
  imports: [
    CommonModule,
    ContentModule,
    DxButtonModule,
    DxCheckBoxModule,
    DxColorBoxModule,
    DxContextMenuModule,
    DxDateBoxModule,
    DxDataGridModule,
    DxFormModule,
    DxGalleryModule,
    DxListModule,
    DxNumberBoxModule,
    DxPopupModule,
    DxRadioGroupModule,
    DxSelectBoxModule,
    DxScrollViewModule,
    DxSortableModule,
    DxSwitchModule,
    DxTagBoxModule,
    DxTextAreaModule,
    DxTextBoxModule,
    DxTileViewModule,
    DxToolbarModule,
    DxTooltipModule,
    DxValidatorModule,
    SafePipesModule,
  ],
  exports:[
    FormHeaderViewComponent,
    FormBodyViewComponent,
    CardBodyViewComponent,
    CardHeaderViewComponent,
  ]
})
export class ViewsModule { }
