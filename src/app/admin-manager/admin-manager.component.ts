import { Component } from '@angular/core';
import { Tab } from 'impactdisciplescommon/src/models/utils/tab.model';

@Component({
  selector: 'app-admin-manager',
  templateUrl: './admin-manager.component.html',
  styleUrls: ['./admin-manager.component.css']
})
export class AdminManagerComponent {
  selectedIndex: number = 0;
  selectedTab: string = 'Logs';

  tabs: Tab[] = [
    { id: 0, text: 'Logs', template: 'Logs' },
    { id: 1, text: 'Notifications', template: 'Notifications' },
    { id: 2, text: 'Users', template: 'Users' },
    { id: 3, text: 'Web Config', template: 'Web Config' },
    { id: 4, text: 'Email Templates', template: 'Email Templates' }
  ];

  selectTab(e) {
    this.selectedTab = e.itemData.template;
    this.selectedIndex = e.itemData.id;
  }
}
