import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventManagerComponent } from './event-manager/event-manager.component';
import { CourseManagerComponent } from './course-manager/course-manager.component';
import { CoachManagerComponent } from './coach-manager/coach-manager.component';
import { LocationManagerComponent } from './location-manager/location-manager.component';
import { DxButtonModule, DxDataGridModule, DxFormModule, DxListModule, DxPopupModule, DxTextAreaModule } from 'devextreme-angular';
import { TrainingSessionComponent } from './training-session/training-session.component';
import { OrganizationManagerComponent } from './organization-manager/organization-manager.component';
import { ImpactDisciplesModule } from "../../../impactdisciplescommon/src/impactdisciples.common.module";
import { EventEditorComponent } from './event-manager/event-editor/event-editor.component';

@NgModule({
    declarations: [
        EventManagerComponent,
        EventEditorComponent,
        CourseManagerComponent,
        CoachManagerComponent,
        LocationManagerComponent,
        TrainingSessionComponent,
        OrganizationManagerComponent
    ],
    imports: [
        CommonModule,
        DxButtonModule,
        DxDataGridModule,
        DxFormModule,
        DxListModule,
        DxPopupModule,
        DxTextAreaModule,
        ImpactDisciplesModule
    ]
})
export class EventsModule { }
