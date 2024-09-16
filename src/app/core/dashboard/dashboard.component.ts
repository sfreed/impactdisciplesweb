import { EventRegistrationService } from 'impactdisciplescommon/src/services/event-registration.service';
import { Component, OnInit } from '@angular/core';
import { WhereFilterOperandKeys } from 'impactdisciplescommon/src/dao/firebase.dao';
import { EventService } from 'impactdisciplescommon/src/services/event.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  eventsList: EventData[] = [];

  constructor(private eventService: EventService, private eventRegistrationService: EventRegistrationService){}

  async ngOnInit(): Promise<void> {
    const currentDate = new Date();

    await this.eventService.queryAllByValue('startDate', WhereFilterOperandKeys.moreOrEqual, currentDate).then(events => {

      events.forEach(event => {
        let eventData: EventData = new EventData();
        eventData.arg = event.eventName;
        this.eventRegistrationService.queryStreamAllByValue('eventId',  WhereFilterOperandKeys.equal, event.id).subscribe(registrations => {
            eventData.val = registrations.length;
            this.eventsList.push(eventData);
        })

      })
    })
  }
}

export class EventData {
  arg: string;
  val: number;
}
