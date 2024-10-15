import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SplashScreenAdminComponent } from './splash-screen-admin.component';

const routes: Routes = [
  { path: 'splash-screen-administration', component: SplashScreenAdminComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SplashScreenRouting{ }
