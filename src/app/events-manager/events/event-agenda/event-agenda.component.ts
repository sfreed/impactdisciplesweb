import { dateFromTimestamp } from './../../../../../impactdisciplescommon/src/utils/date-from-timestamp';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Query from 'devextreme/data/query';
import { DxSchedulerTypes } from 'devextreme-angular/ui/scheduler';
import { EventModel } from 'impactdisciplescommon/src/models/domain/event.model';
import { CourseModel } from 'impactdisciplescommon/src/models/domain/course.model';
import { CourseService } from 'impactdisciplescommon/src/services/course.service';
import { CoachService } from 'impactdisciplescommon/src/services/coach.service';
import { CoachModel } from 'impactdisciplescommon/src/models/domain/coach.model';
import { TrainingRoomModel } from 'impactdisciplescommon/src/models/domain/training-room.model';
import { LocationService } from 'impactdisciplescommon/src/services/location.service';

@Component({
  selector: 'app-event-agenda',
  templateUrl: './event-agenda.component.html',
  styleUrls: ['./event-agenda.component.css']
})
export class EventAgendaComponent implements OnInit{
  @Input('event') event: EventModel;
  @Output() onCloseWindow = new  EventEmitter<boolean>();

  draggingGroupName = 'appointmentsGroup';

  currentDate: Date;

  courses: CourseModel[] = [];
  coursesList: CourseModel[] = [];
  coaches: CoachModel[] = [];
  rooms: TrainingRoomModel[] = []

  constructor(private courseService: CourseService, private coachService: CoachService, private locationService: LocationService){}

  async ngOnInit(): Promise<void> {
    if(!this.event.agendaItems){
      this.event.agendaItems = [];
    }
    this.currentDate = dateFromTimestamp(this.event.startDate);

    this.courses = await this.courseService.getAll();

    this.coaches = await this.coachService.getAll();

    this.rooms = (await this.locationService.getById(this.event.location)).trainingrooms;
  }

  getCoachById = (id: string) => Query(this.coaches).filter(['id', '=', id]).toArray()[0];
  getCourseById = (id: string) => Query(this.courses).filter(['id', '=', id]).toArray()[0];

  onAppointmentAdd = (e: DxSchedulerTypes.AppointmentDraggingAddEvent) => {
    const index = this.courses.indexOf(e.fromData);

    if (index >= 0) {
      this.courses.splice(index, 1);
      this.event.agendaItems.push(e.itemData);
    }
  };

  onAppointmentRemove = (e: DxSchedulerTypes.AppointmentDraggingRemoveEvent) => {
    const index = this.event.agendaItems.indexOf(e.itemData);

    if (index >= 0) {
      this.event.agendaItems.splice(index, 1);
      this.courses.push(e.itemData);
    }
  };

  onAppointmentFormOpening = (data: DxSchedulerTypes.AppointmentFormOpeningEvent) => {
    if(data.appointmentData['isCourse']){
      this.setSingleSessionCourseForm(data);
    } else {
      this.setAgendaForm(data);
    }
  }

  setSingleSessionCourseForm(data: DxSchedulerTypes.AppointmentFormOpeningEvent){
    const that = this;
    const form = data.form;
    form.option().items = [{
      dataField: 'startDate',
      colSpan: 1,
      editorType: 'dxDateBox',
      editorOptions: {
        width: '100%',
        type: 'datetime'
      },
    }, {
      name: 'endDate',
      colSpan: 1,
      dataField: 'endDate',
      editorType: 'dxDateBox',
      editorOptions: {
        width: '100%',
        type: 'datetime',
      },
    }, {
      label: {
        text: 'Create Course?',
      },
      colSpan: 1,
      editorType: 'dxSwitch',
      dataField: 'isCourse',
      editorOptions: {
        switchedOnText: 'Yes',
        switchedOffText: 'No',
        onValueChanged({ value }) {
          if(!value){
            that.setAgendaForm(data);
          }
        }
      }
    }, {
      label: {
        text: 'Max Participants',
      },
      colSpan: 1,
      editorType: 'dxNumberBox',
      dataField: 'maxParticipants',
      editorOptions: {

      }
    },{
      label: {
        text: 'Course',
      },
      colSpan: 2,
      editorType: 'dxSelectBox',
      dataField: 'course',
      isRequired: true,
      editorOptions: {
        items: that.courses,
        displayExpr: 'title',
        valueExpr: 'id',
        value: data.appointmentData['course']? data.appointmentData['course']['id'] : '',
      },
    }, {
      label: {
        text: 'Coaches',
      },
      colSpan: 2,
      editorType: 'dxTagBox',
      dataField: 'coaches',
      isRequired: true,
      editorOptions: {
        items: that.coaches,
        displayExpr: 'fullname',
        valueExpr: 'id'
      },
    }, {
      label: {
        text: 'Room',
      },
      colSpan: 2,
      editorType: 'dxSelectBox',
      dataField: 'room',
      editorOptions: {
        items: that.rooms,
        displayExpr: 'name',
        valueExpr: 'id'
      },
    }];
    form.repaint();
  }

  setAgendaForm(data: DxSchedulerTypes.AppointmentFormOpeningEvent){
    const that = this;
    const form = data.form;
    form.option().colCount = 2;

    form.option().items = [{
      dataField: 'startDate',
      colSpan: 1,
      editorType: 'dxDateBox',
      editorOptions: {
        width: '100%',
        type: 'datetime'
      },
    }, {
      name: 'endDate',
      colSpan: 1,
      dataField: 'endDate',
      editorType: 'dxDateBox',
      editorOptions: {
        width: '100%',
        type: 'datetime',
      },
    }, {
      label: {
        text: 'Create Course?',
      },
      colSpan: 2,
      editorType: 'dxSwitch',
      dataField: 'isCourse',
      editorOptions: {
        switchedOnText: 'Yes',
        switchedOffText: 'No',
        onValueChanged({ value }) {
          if(value){
            that.setSingleSessionCourseForm(data)
          }
        }
      }
    }, {
      label: {
        text: 'Title',
      },
      colSpan:2,
      isRequired: true,
      editorType: 'dxTextBox',
      dataField: 'text',
    }, {
      label: {
        text: 'Description',
      },
      colSpan:2,
      isRequired: true,
      editorType: 'dxTextArea',
      dataField: 'description'
    }, {
      label: {
        text: 'Room',
      },
      colSpan: 2,
      editorType: 'dxSelectBox',
      dataField: 'room',
      editorOptions: {
        items: that.rooms,
        displayExpr: 'name',
        valueExpr: 'id'
      },
    }];
    form.repaint();
  }
}
