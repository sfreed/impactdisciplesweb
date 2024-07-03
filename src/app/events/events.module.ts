import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventManagerComponent } from './event-manager/event-manager.component';
import { CourseManagerComponent } from './course-manager/course-manager.component';
import { CoachManagerComponent } from './coach-manager/coach-manager.component';
import { LocationManagerComponent } from './location-manager/location-manager.component';
import { DxDataGridModule } from 'devextreme-angular';
import { TrainingSessionComponent } from './training-session/training-session.component';

@NgModule({
  declarations: [
    EventManagerComponent,
    CourseManagerComponent,
    CoachManagerComponent,
    LocationManagerComponent,
    TrainingSessionComponent,

  ],
  imports: [
    CommonModule,
    DxDataGridModule
  ]
})
export class EventsModule { }
