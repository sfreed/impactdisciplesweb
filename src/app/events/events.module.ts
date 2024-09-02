import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventManagerComponent } from './event-manager/event-manager.component';
import { CourseManagerComponent } from './course-manager/course-manager.component';
import { CoachManagerComponent } from './coach-manager/coach-manager.component';
import { LocationManagerComponent } from './location-manager/location-manager.component';
import { DxButtonModule, DxDataGridModule, DxDraggableModule, DxFileManagerModule, DxFormModule, DxListModule, DxLoadPanelModule, DxNumberBoxModule, DxPopupModule, DxSchedulerModule, DxScrollViewModule, DxTabsModule, DxTextAreaModule, DxTextBoxModule } from 'devextreme-angular';
import { OrganizationManagerComponent } from './organization-manager/organization-manager.component';
import { ImpactDisciplesModule } from "../../../impactdisciplescommon/src/impactdisciples.common.module";
import { EventAgendaComponent } from './event-manager/event-agenda/event-agenda.component';
import { ImpactFormsModule } from 'impactdisciplescommon/src/forms/forms.module';

@NgModule({
    declarations: [
        EventManagerComponent,
        CourseManagerComponent,
        CoachManagerComponent,
        LocationManagerComponent,
        OrganizationManagerComponent,
        EventAgendaComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ImpactFormsModule,
        DxButtonModule,
        DxDataGridModule,
        DxDraggableModule,
        DxFormModule,
        DxFileManagerModule,
        DxLoadPanelModule,
        DxListModule,
        DxNumberBoxModule,
        DxPopupModule,
        DxSchedulerModule,
        DxScrollViewModule,
        DxTabsModule,
        DxTextAreaModule,
        DxTextBoxModule,
        ImpactDisciplesModule
    ]
})
export class EventsModule { }
