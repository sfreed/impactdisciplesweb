import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardAdministrationComponent } from './card-administration.component';
import { CardMakerComponent } from './card-maker/card-maker.component';
import { CardViewerComponent } from './card-viewer/card-viewer.component';

const routes: Routes = [
  { path: 'card-administration', component: CardAdministrationComponent },
  { path: 'card-maker', component: CardMakerComponent },
  { path: 'card-maker/:id', component: CardMakerComponent },
  { path: 'card-maker/:id/:view', component: CardMakerComponent },
  { path: 'card-viewer/:id', component: CardViewerComponent },
  { path: 'card-viewer/:id/:view', component: CardViewerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardRouting{ }
