import { UsersComponent } from './admin/users/users.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogMessagesComponent } from './admin/log-messages/log-messages.component';
import { AuthGuardService } from 'impactdisciplescommon/src/app/shared/services/auth.service';
import { CapturePasswordFormComponent } from 'impactdisciplescommon/src/app/shared/forms/capture-password-form/capture-password-form.component';
import { CaptureUsernameFormComponent } from 'impactdisciplescommon/src/app/shared/forms/capture-username-form/capture-username-form.component';
import { ChangePasswordFormComponent } from 'impactdisciplescommon/src/app/shared/forms/change-password-form/change-password-form.component';
import { CreateAuthFormComponent } from 'impactdisciplescommon/src/app/shared/forms/create-auth-form/create-auth-form.component';
import { ResetPasswordFormComponent } from 'impactdisciplescommon/src/app/shared/forms/reset-password-form/reset-password-form.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'log-messages',
    component: LogMessagesComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'capture-username-form',
    component: CaptureUsernameFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'capture-password-form',
    component: CapturePasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'create-auth-form',
    component: CreateAuthFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'reset-password',
    component: ResetPasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'change-password/:recoveryCode',
    component: ChangePasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
