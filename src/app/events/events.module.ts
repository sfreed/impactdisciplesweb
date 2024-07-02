import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventManagerComponent } from './event-manager/event-manager.component';
import { TrainingManagerComponent } from './training-manager/training-manager.component';
import { CoachManagerComponent } from './coach-manager/coach-manager.component';
import { LocationManagerComponent } from './location-manager/location-manager.component';
import { SessionManagerComponent } from './session-manager/session-manager.component';
import { DxDataGridModule } from 'devextreme-angular';

@NgModule({
  declarations: [
    EventManagerComponent,
    TrainingManagerComponent,
    CoachManagerComponent,
    LocationManagerComponent,
    SessionManagerComponent
  ],
  imports: [
    CommonModule,
    DxDataGridModule
  ]
})
export class EventsModule { }
