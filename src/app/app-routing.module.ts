import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { MenuComponent } from './features/menu/menu.component';
import { ScheduleComponent } from './features/schedule/schedule.component';
import { AnnouncementsComponent } from './features/announcements/announcements.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'announcements',
    component: AnnouncementsComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'menu',
    component: MenuComponent
  },
  {
    path: 'schedule',
    component: ScheduleComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
