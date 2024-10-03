import { Component } from '@angular/core';
import { Tab } from 'impactdisciplescommon/src/models/utils/tab.model';

@Component({
  selector: 'app-store-manager',
  templateUrl: './store-manager.component.html',
  styleUrls: ['./store-manager.component.css']
})
export class StoreManagerComponent {
  selectedIndex: number = 0;
  selectedTab: string = 'Products';

  tabs: Tab[] = [
    { id: 0, text: 'Products', template: 'Products' },
    { id: 1, text: 'Sales', template: 'Sales' },
    { id: 3, text: 'Coupons', template: 'Coupons' },
  ];

  selectTab(e) {
    this.selectedTab = e.itemData.template;
    this.selectedIndex = e.itemData.id;
  }
}
