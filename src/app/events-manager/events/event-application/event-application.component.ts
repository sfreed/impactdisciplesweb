import { Component, Input, OnInit } from '@angular/core';
import { EventModel } from 'impactdisciplescommon/src/models/domain/event.model';

@Component({
  selector: 'app-event-application',
  templateUrl: './event-application.component.html',
  styleUrls: ['./event-application.component.css']
})
export class EventApplicationComponent implements OnInit {
  @Input('event') event: EventModel;

  constructor() { }

  ngOnInit() {
  }

}
