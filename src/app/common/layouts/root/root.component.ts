import { Component, OnInit } from '@angular/core';
import { DxButtonTypes } from 'devextreme-angular/ui/button';
import { RouteItem } from '../../models/utils/route-item';
import { ActivatedRoute } from '@angular/router';
import { TopNavService } from '../../services/top-nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit{
  backButtonOptions: DxButtonTypes.Properties = {
    icon: 'back',
    onClick: () => {
      this.topNavService.back()  ;
    },
  };

  tabsWithIcon: RouteItem[];

  constructor(public topNavService: TopNavService, private route: ActivatedRoute) {
    this.tabsWithIcon = [
      { id: 0, name:'Home', route:'home', icon: 'home', level: 0},
      { id: 1, name:'Schedule', route:'schedule', icon: 'toolbox', level: 0},
      { id: 2, name:'Announcements', route:'announcements', icon: 'user', level: 0},
      { id: 3, name:'Menu', route:'menu', icon: 'menu', level: 0}
    ];
  }

  ngOnInit() {
    const filter = this.route.snapshot.queryParamMap.get('filter');
    console.log(filter); // Pepperoni
  }

  tabClicked(e :any){
    this.topNavService.navigate(e.itemData)
  }
}
