import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoursesComponent } from './courses/courses.component';
import { LocationsComponent } from './locations/locations.component';
import { DxButtonModule, DxDataGridModule, DxDateBoxModule, DxDraggableModule, DxDropDownBoxModule, DxFileManagerModule, DxFormModule, DxListModule, DxLoadIndicatorModule, DxLoadPanelModule, DxLookupModule, DxNumberBoxModule, DxPopupModule, DxSchedulerModule, DxScrollViewModule, DxSelectBoxModule, DxSwitchModule, DxTabsModule, DxTagBoxModule, DxTextAreaModule, DxTextBoxModule, DxToolbarModule } from 'devextreme-angular';
import { OrganizationsComponent } from './organizations/organizations.component';
import { ImpactDisciplesModule } from "../../../impactdisciplescommon/src/impactdisciples.common.module";
import { ImpactFormsModule } from 'impactdisciplescommon/src/forms/forms.module';
import { CoachesComponent } from './coaches/coaches.component';
import { EventsComponent } from './events/events.component';
import { EventAttendeesComponent } from './events/event-attendees/event-attendees.component';
import { EventAgendaComponent } from './events/event-agenda/event-agenda.component';
import { EventsManagerComponent } from './events-manager.component';
import { SharedModule } from '../shared/shared.module';
import { RoomComponent } from './locations/room/room.component';
import { FAQComponent } from './events/questions-and-answers/faq.component';

@NgModule({
    declarations: [
      EventsManagerComponent,
      EventsComponent,
      CoursesComponent,
      CoachesComponent,
      LocationsComponent,
      OrganizationsComponent,
      EventAgendaComponent,
      EventAttendeesComponent,
      RoomComponent,
      FAQComponent
    ],
    imports: [
      CommonModule,
      SharedModule,
      FormsModule,
      ImpactFormsModule,
      DxButtonModule,
      DxDataGridModule,
      DxDateBoxModule,
      DxDraggableModule,
      DxFormModule,
      DxFileManagerModule,
      DxLookupModule,
      DxLoadPanelModule,
      DxListModule,
      DxNumberBoxModule,
      DxPopupModule,
      DxSchedulerModule,
      DxScrollViewModule,
      DxSwitchModule,
      DxTabsModule,
      DxTagBoxModule,
      DxTextAreaModule,
      DxTextBoxModule,
      DxToolbarModule,
      DxSelectBoxModule,
      DxDropDownBoxModule,
      DxLoadIndicatorModule,
      ImpactDisciplesModule
    ]
})
export class EventsManagerModule { }
