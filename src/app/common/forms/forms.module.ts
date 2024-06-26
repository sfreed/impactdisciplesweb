import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ChangePasswordFormComponent } from "./change-password-form/change-password-form.component";
import { ResetPasswordFormComponent } from "./reset-password-form/reset-password-form.component";
import { UnauthenticatedContentComponent } from "./unauthenticated-content";
import { NotAuthorizedContainerComponent } from "./not-authorized-container";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { DxFormModule, DxLoadIndicatorModule } from "devextreme-angular";
import { SingleCardModule } from "src/app/layouts/single-card/single-card.component";
import { CaptureUsernameFormComponent } from "./capture-username-form/capture-username-form.component";
import { CapturePasswordFormComponent } from "./capture-password-form/capture-password-form.component";
import { CreateAuthFormComponent } from "./create-auth-form/create-auth-form.component";


@NgModule({
  declarations: [
    ChangePasswordFormComponent,
    CaptureUsernameFormComponent,
    CapturePasswordFormComponent,
    CreateAuthFormComponent,
    ResetPasswordFormComponent,
    UnauthenticatedContentComponent,
    NotAuthorizedContainerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    RouterModule,
    DxFormModule,
    DxLoadIndicatorModule,
    DxLoadIndicatorModule,
    SingleCardModule
  ],
  providers: [
  ],
  exports: [
    ChangePasswordFormComponent,
    ResetPasswordFormComponent,
    UnauthenticatedContentComponent,
    NotAuthorizedContainerComponent
  ]
})
export class FormsModule { }
