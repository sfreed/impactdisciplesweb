import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuAdministrationComponent } from './menu-administration.component';

const routes: Routes = [
  { path: 'menu-administration', component: MenuAdministrationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRouting{ }
