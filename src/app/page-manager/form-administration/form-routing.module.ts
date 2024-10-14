import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormAdministrationComponent } from './form-administration.component';
import { FormMakerComponent } from './form-maker/form-maker.component';
import { FormResultsComponent } from './form-results/form-results.component';
import { FormViewerComponent } from './form-viewer/form-viewer.component';

const routes: Routes = [
  { path: 'form-administration', component: FormAdministrationComponent},
  { path: 'form-maker', component: FormMakerComponent },
  { path: 'form-maker/:id', component: FormMakerComponent },
  { path: 'form-maker/:id/:view', component: FormMakerComponent },
  { path: 'form-viewer/:id', component: FormViewerComponent },
  { path: 'form-viewer/:id/:view', component: FormViewerComponent },
  { path: 'form-results/:id', component: FormResultsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRouting{ }
