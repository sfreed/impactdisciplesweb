import { EventService } from 'impactdisciplescommon/src/services/event.service';
import { dateFromTimestamp } from './../../../../../impactdisciplescommon/src/utils/date-from-timestamp';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Query from 'devextreme/data/query';
import { DxSchedulerTypes } from 'devextreme-angular/ui/scheduler';
import { EventModel } from 'impactdisciplescommon/src/models/domain/event.model';
import { ToastrService } from 'ngx-toastr';
import { CourseModel } from 'impactdisciplescommon/src/models/domain/course.model';
import { CourseService } from 'impactdisciplescommon/src/services/course.service';
import { CoachService } from 'impactdisciplescommon/src/services/coach.service';
import { CoachModel } from 'impactdisciplescommon/src/models/domain/coach.model';

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

  constructor(private eventService: EventService, private courseService: CourseService, private coachService: CoachService,
    private toastrService: ToastrService){}

  async ngOnInit(): Promise<void> {
    if(!this.event.agendaItems){
      this.event.agendaItems = [];
    }
    this.currentDate = dateFromTimestamp(this.event.startDate);

    this.courses = await this.courseService.getAll();

    this.coaches = await this.coachService.getAll();
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
      this.setCourseForm(data);
    } else {
      this.setAgendaForm(data);
    }
  }

  setCourseForm(data: DxSchedulerTypes.AppointmentFormOpeningEvent){
    const that = this;
    const form = data.form;
    form.option().items = [{
      label: {
        text: 'Create Course?',
      },
      colSpan: 2,
      editorType: 'dxSwitch',
      dataField: 'isCourse',
      editorOptions: {
        onValueChanged({ value }) {
          if(value){
            that.setCourseForm(data)
          } else {
            that.setAgendaForm(data);
          }
        }
      }
    },{
      label: {
        text: 'Course',
      },
      editorType: 'dxSelectBox',
      dataField: 'course',
      editorOptions: {
        items: that.courses,
        displayExpr: 'title',
        valueExpr: 'id',
        value: data.appointmentData['course']? data.appointmentData['course']['id'] : '',
      },
    }, {
      label: {
        text: 'Coach',
      },
      editorType: 'dxSelectBox',
      dataField: 'coach',
      editorOptions: {
        items: that.coaches,
        displayExpr: 'fullname',
        valueExpr: 'id',
        value: data.appointmentData['coach']?data.appointmentData['coach']['id'] : '',
      },
    }, {
      dataField: 'startDate',
      editorType: 'dxDateBox',
      editorOptions: {
        width: '100%',
        type: 'datetime'
      },
    }, {
      name: 'endDate',
      dataField: 'endDate',
      editorType: 'dxDateBox',
      editorOptions: {
        width: '100%',
        type: 'datetime',
      },
    }];
    form.repaint();
  }

  setAgendaForm(data: DxSchedulerTypes.AppointmentFormOpeningEvent){
    const that = this;
    const form = data.form;

    form.option().items = [{
      label: {
        text: 'Create Course?',
      },
      colSpan: 2,
      editorType: 'dxSwitch',
      dataField: 'isCourse',
      editorOptions: {
        onValueChanged({ value }) {
          if(value){
            that.setCourseForm(data)
          } else {
            that.setAgendaForm(data);
          }
        }
      }
    },{
      label: {
        text: 'Title',
      },
      colSpan:2,
      editorType: 'dxTextBox',
      dataField: 'text',
    }, {
      label: {
        text: 'Description',
      },
      colSpan:2,
      editorType: 'dxTextArea',
      dataField: 'description',
    }, {
      dataField: 'startDate',
      editorType: 'dxDateBox',
      editorOptions: {
        width: '100%',
        type: 'datetime'
      },
    }, {
      name: 'endDate',
      dataField: 'endDate',
      editorType: 'dxDateBox',
      editorOptions: {
        width: '100%',
        type: 'datetime',
      },
    }];
    form.repaint();
  }

  saveAgenda(){
    this.eventService.update(this.event.id, this.event).then(event => {
      this.toastrService.success('Event Saved!');
      this.onCloseWindow.emit(false);
    })
  }
}
