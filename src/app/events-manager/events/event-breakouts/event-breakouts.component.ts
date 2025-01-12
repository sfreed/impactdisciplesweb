import { Component, Input, OnInit } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { CourseModel } from 'impactdisciplescommon/src/models/domain/course.model';
import { EventModel } from 'impactdisciplescommon/src/models/domain/event.model';
import { CourseService } from 'impactdisciplescommon/src/services/data/course.service';
import { EventRegistrationService } from 'impactdisciplescommon/src/services/data/event-registration.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-event-breakouts',
  templateUrl: './event-breakouts.component.html',
  styleUrls: ['./event-breakouts.component.css']
})
export class EventBreakoutsComponent implements OnInit {
  @Input('event') event: EventModel;

  datasource$: Observable<DataSource>;

  courses: CourseModel[] = []

  constructor(public service: EventRegistrationService, private courseService: CourseService) { }

  async ngOnInit() {
    let that = this;

    this.courses = await this.courseService.getAll();

    if(this.event?.id){
      this.datasource$ = this.service.streamAllByValue('eventId', this.event.id).pipe(
        map(
          (selectedCustomers) =>
            new DataSource({
              reshapeOnPush: true,
              pushAggregationTimeout: 100,
              store: new CustomStore({
                key: 'id',
                loadMode: 'raw',
                load: function (loadOptions: any) {
                  let breakoutStudents: BreakOutStudent[] = [];

                  selectedCustomers.forEach(customer => {
                    customer.trainingSessions?.forEach(session => {
                      let coursID = that.event.agendaItems.find(item => item.id == session).course;

                      let breakout: BreakOutStudent = new BreakOutStudent();
                      breakout.id = customer.email + session;
                      breakout.breakoutId = session;
                      breakout.breakoutName = that.courses.find(item => item.id == coursID).title;
                      breakout.firstName = customer.firstName;
                      breakout.lastName = customer.lastName;
                      breakout.email = customer.email;

                      breakoutStudents.push(breakout);
                    })
                  })
                  return breakoutStudents;
                }
              })
            })
        )
      );
    }
  }
}

export class BreakOutStudent{
  id: string;
  breakoutId: string;
  breakoutName: string;
  firstName: string;
  lastName: string;
  email: string;
}
