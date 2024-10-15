import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideoAdministrationComponent } from './video-administration/video-administration.component';

const routes: Routes = [
  { path: 'video-administration', component: VideoAdministrationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRouting{ }
