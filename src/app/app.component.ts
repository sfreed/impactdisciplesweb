import { Component, OnInit } from '@angular/core';
import { DxButtonTypes } from 'devextreme-angular/ui/button';
import { TopNavService } from './common/services/top-nav.service';
import { RouteItem } from './common/models/utils/route-item';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'impactdisciples';

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

  firebaseConfig = {
    apiKey: "AIzaSyDRfdv2XgpLQ-ll2oxpEEMyhtC75rzkP4c",
    authDomain: "impactdisciples-a82a8.firebaseapp.com",
    projectId: "impactdisciples-a82a8",
    storageBucket: "impactdisciples-a82a8.appspot.com",
    messagingSenderId: "562759240809",
    appId: "1:562759240809:web:7d6fa117db35b887b6a6f8",
    measurementId: "G-KJL13HB8DV"
  };

  // Initialize Firebase
  app = initializeApp(this.firebaseConfig);
  analytics = getAnalytics(this.app);
}
