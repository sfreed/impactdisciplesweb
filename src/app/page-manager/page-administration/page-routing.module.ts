import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageAdministrationComponent } from './page-administration.component';
import { PageMakerComponent } from './page-maker/page-maker.component';
import { PageViewerComponent } from './page-viewer/page-viewer.component';

const routes: Routes = [
  { path: 'page-administration', component: PageAdministrationComponent },
  { path: 'page-maker', component: PageMakerComponent },
  { path: 'page-maker/:id', component: PageMakerComponent },
  { path: 'page-maker/:id/:view', component: PageMakerComponent },
  { path: 'page-viewer/:id', component: PageViewerComponent },
  { path: 'page-viewer/:id/:view', component: PageViewerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRouting{ }
