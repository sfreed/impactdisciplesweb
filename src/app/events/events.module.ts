import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventManagerComponent } from './event-manager/event-manager.component';
import { CourseManagerComponent } from './course-manager/course-manager.component';
import { CoachManagerComponent } from './coach-manager/coach-manager.component';
import { LocationManagerComponent } from './location-manager/location-manager.component';
import { DxButtonModule, DxDataGridModule, DxDraggableModule, DxFormModule, DxListModule, DxLoadPanelModule, DxPopupModule, DxSchedulerModule, DxScrollViewModule, DxTabsModule, DxTextAreaModule } from 'devextreme-angular';
import { OrganizationManagerComponent } from './organization-manager/organization-manager.component';
import { ImpactDisciplesModule } from "../../../impactdisciplescommon/src/impactdisciples.common.module";
import { EventAgendaComponent } from './event-manager/event-agenda/event-agenda.component';
import { EventRegistrationComponent } from './event-registration/event-registration.component';

@NgModule({
    declarations: [
        EventManagerComponent,
        CourseManagerComponent,
        CoachManagerComponent,
        LocationManagerComponent,
        OrganizationManagerComponent,
        EventAgendaComponent,
        EventRegistrationComponent
    ],
    imports: [
        CommonModule,
        DxButtonModule,
        DxDataGridModule,
        DxDraggableModule,
        DxFormModule,
        DxLoadPanelModule,
        DxListModule,
        DxPopupModule,
        DxSchedulerModule,
        DxScrollViewModule,
        DxTabsModule,
        DxTextAreaModule,
        ImpactDisciplesModule
    ]
})
export class EventsModule { }
