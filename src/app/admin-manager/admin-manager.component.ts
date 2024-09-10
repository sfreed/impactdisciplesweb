import { Component } from '@angular/core';
import { Tab } from 'impactdisciplescommon/src/models/utils/tab.model';

@Component({
  selector: 'app-admin-manager',
  templateUrl: './admin-manager.component.html',
  styleUrls: ['./admin-manager.component.css']
})
export class AdminManagerComponent {
  selectedIndex: number = 0;
  selectedTab: string = 'Coupons';

  tabs: Tab[] = [
    { id: 0, text: 'Coupons', template: 'Coupons' },
    { id: 1, text: 'Logs', template: 'Logs' },
    { id: 2, text: 'Notifications', template: 'Notifications' },
    { id: 3, text: 'Users', template: 'Users' },
    { id: 3, text: 'Web Config', template: 'Web Config' }
  ];

  selectTab(e) {
    this.selectedTab = e.itemData.template;
  }
}
