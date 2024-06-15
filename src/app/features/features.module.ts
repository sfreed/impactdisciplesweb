import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { ScheduleComponent } from './schedule/schedule.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AnnouncementsComponent, HomeComponent, MenuComponent, ScheduleComponent]
})
export class FeaturesModule { }
