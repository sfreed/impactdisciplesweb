import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoursesComponent } from './courses/courses.component';
import { LocationsComponent } from './locations/locations.component';
import { DxButtonModule, DxDataGridModule, DxDraggableModule, DxFileManagerModule, DxFormModule, DxListModule, DxLoadPanelModule, DxNumberBoxModule, DxPopupModule, DxSchedulerModule, DxScrollViewModule, DxTabsModule, DxTextAreaModule, DxTextBoxModule } from 'devextreme-angular';
import { OrganizationsComponent } from './organizations/organizations.component';
import { ImpactDisciplesModule } from "../../../impactdisciplescommon/src/impactdisciples.common.module";
import { ImpactFormsModule } from 'impactdisciplescommon/src/forms/forms.module';
import { CoachesComponent } from './coaches/coaches.component';
import { EventsComponent } from './events/events.component';
import { EventAttendeesComponent } from './events/event-attendees/event-attendees.component';
import { EventAgendaComponent } from './events/event-agenda/event-agenda.component';
import { EventsManagerComponent } from './events-manager.component';

@NgModule({
    declarations: [
      EventsManagerComponent,
      EventsComponent,
      CoursesComponent,
      CoachesComponent,
      LocationsComponent,
      OrganizationsComponent,
      EventAgendaComponent,
      EventAttendeesComponent
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
export class EventsManagerModule { }
