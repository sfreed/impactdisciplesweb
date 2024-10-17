import { Component } from '@angular/core';
import { Tab } from 'impactdisciplescommon/src/models/utils/tab.model';

@Component({
  selector: 'app-page-manager',
  templateUrl: './page-manager.component.html',
  styleUrls: ['./page-manager.component.css']
})
export class PageManagerComponent {
  selectedIndex: number = 0;
  selectedTab: string = 'Pages';

  tabs: Tab[] = [
    { id: 1, text: 'Pages', template: 'Pages' },
    { id: 2, text: 'Cards', template: 'Cards' },
    { id: 3, text: 'Forms', template: 'Forms' },
    { id: 4, text: 'Macros', template: 'Macros' },
    { id: 5, text: 'Menu', template: 'Menu' },
    { id: 6, text: 'Splash Screens', template: 'Splash Screens' }
  ];

  selectTab(e) {
    this.selectedTab = e.itemData.template;
    this.selectedIndex = e.itemData.id;
  }
}
