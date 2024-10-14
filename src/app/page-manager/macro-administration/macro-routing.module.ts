import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MacroCreatorComponent } from './macro-creator.component';

const routes: Routes = [
  { path: 'macro-administration', component: MacroCreatorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MacroRouting{ }
