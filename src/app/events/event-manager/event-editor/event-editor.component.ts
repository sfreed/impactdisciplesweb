import { Component, Input, OnInit } from '@angular/core';
import { DxButtonTypes } from 'devextreme-angular/ui/button';
import { CoachModel } from 'impactdisciplescommon/src/models/domain/coach.model';
import { CourseModel } from 'impactdisciplescommon/src/models/domain/course.model';
import { EventModel } from 'impactdisciplescommon/src/models/domain/event.model';
import { LocationModel } from 'impactdisciplescommon/src/models/domain/location.model';
import { OrganizationModel } from 'impactdisciplescommon/src/models/domain/organization.model';
import { TrainingSessionModel } from 'impactdisciplescommon/src/models/domain/training-session.model';
import { CoachService } from 'impactdisciplescommon/src/services/coach.service';
import { CourseService } from 'impactdisciplescommon/src/services/course.service';
import { LocationService } from 'impactdisciplescommon/src/services/location.service';
import { OrganizationService } from 'impactdisciplescommon/src/services/organization.service';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.css']
})
export class EventEditorComponent implements OnInit {
  @Input('event') event: EventModel;

  organizations: OrganizationModel[];

  locations: LocationModel[];

  coaches: CoachModel[];

  courses: CourseModel[];

  selectedTrainingSession: TrainingSessionModel;

  addSessionButtonOptions: DxButtonTypes.Properties = {
    icon: 'add',
    text: 'Add Session',
    onClick: () => {
      this.selectedTrainingSession = new TrainingSessionModel();
    },
  };

  saveSessionButtonOptions: DxButtonTypes.Properties = {
    icon: 'save',
    text: 'Save Session',
    onClick: () => {
      this.event.trainingSessions.push(this.selectedTrainingSession);

      console.log(this.event);
    },
  };

  cancelSessionButtonOptions: DxButtonTypes.Properties = {
    icon: 'cancel',
    text: 'Cancel Session',
    onClick: () => {
      this.selectedTrainingSession = null;
    },
  };

  constructor(private organizationService: OrganizationService, private locationService: LocationService, private coachService: CoachService,
    private courseService: CourseService
  ){}

  async ngOnInit(): Promise<void> {
    if(!this.event.trainingSessions){
      this.event.trainingSessions = [];
    }
    this.organizations = await this.organizationService.getAll();

    this.locations = await this.locationService.getAll();

    this.coaches = await this.coachService.getAll();

    this.courses = await this.courseService.getAll();
  }

  getTrainingSessionDisplayName(e: TrainingSessionModel){
    return e.name;
  }
}
