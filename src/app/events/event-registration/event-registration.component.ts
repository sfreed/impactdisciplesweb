import { AuthService } from './../../../../impactdisciplescommon/src/services/utils/auth.service';
import { Component, OnInit } from '@angular/core';
import { AppUser } from 'impactdisciplescommon/src/models/admin/appuser.model';
import { EventRegistrationModel } from 'impactdisciplescommon/src/models/domain/event-registration.model';
import { EventModel } from 'impactdisciplescommon/src/models/domain/event.model';
import { EventService } from 'impactdisciplescommon/src/services/event.service';

@Component({
  selector: 'app-event-registration',
  templateUrl: './event-registration.component.html',
  styleUrls: ['./event-registration.component.css']
})
export class EventRegistrationComponent implements OnInit{

  eventsList: EventModel[] = [];

  eventRegistration: EventRegistrationModel = new EventRegistrationModel();

  eventRegistrant: AppUser;

  emailEditorOptions = {
    valueChangeEvent: 'keyup',
  };

  constructor(private eventService: EventService, private authService: AuthService){

  }

  ngOnInit() {
    this.eventService.getAll().subscribe(events => {
      this.eventsList = events;
    });

    this.authService.getUser().subscribe(user => {
      this.eventRegistration.registrant = user;
      console.log(this.eventRegistration.registrant);
    });


  }
}
