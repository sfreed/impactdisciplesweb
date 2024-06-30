import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { MenuComponent } from './features/menu/menu.component';
import { ScheduleComponent } from './features/schedule/schedule.component';
import { AnnouncementsComponent } from './features/announcements/announcements.component';
import { AuthGuardService } from './common/services/auth.service';
import { CapturePasswordFormComponent } from './common/forms/capture-password-form/capture-password-form.component';
import { CaptureUsernameFormComponent } from './common/forms/capture-username-form/capture-username-form.component';
import { ChangePasswordFormComponent } from './common/forms/change-password-form/change-password-form.component';
import { CreateAuthFormComponent } from './common/forms/create-auth-form/create-auth-form.component';
import { ResetPasswordFormComponent } from './common/forms/reset-password-form/reset-password-form.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'announcements',
    component: AnnouncementsComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'menu',
    component: MenuComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'schedule',
    component: ScheduleComponent,
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
