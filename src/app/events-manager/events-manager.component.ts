import { Component } from '@angular/core';
import { Tab } from 'impactdisciplescommon/src/models/utils/tab.model';

@Component({
  selector: 'app-events-manager',
  templateUrl: './events-manager.component.html',
  styleUrls: ['./events-manager.component.css']
})
export class EventsManagerComponent {
  selectedIndex: number = 0;
  selectedTab: string = 'Events';

  tabs: Tab[] = [
    { id: 0, text: 'Events', template: 'Events' },
    { id: 1, text: 'Courses', template: 'Courses' },
    { id: 2, text: 'Coaches', template: 'Coaches' },
    { id: 3, text: 'Locations', template: 'Locations' },
    { id: 3, text: 'Organizations', template: 'Organizations' }
  ];

  selectTab(e) {
    this.selectedTab = e.itemData.template;
  }
}
