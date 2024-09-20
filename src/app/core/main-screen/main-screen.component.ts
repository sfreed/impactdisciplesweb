import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DxButtonTypes } from 'devextreme-angular/ui/button';
import { AuthService } from 'impactdisciplescommon/src/services/utils/auth.service';
import { TopNavService } from 'impactdisciplescommon/src/services/utils/top-nav.service';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.scss']
})
export class MainScreenComponent {
  navigation: any[] = [
    { id: 0, text: "HOME", icon: "home", path:"" },
    { id: 1, text: "EVENTS MANAGER", icon: "event", path: "events-manager" },
    { id: 2, text: "WEB MANAGER", icon: "toolbox", path: "web-manager" },
    { id: 3, text: "SUBSCRIPTIONS MANAGER", icon: "message", path: "subscriptions-manager" },
    { id: 4, text: "REQUESTS MANAGER", icon: "belloutline", path: "requests-manager" },
    { id: 5, text: "ADMIN MANAGER", icon: "user", path: "admin-manager" },
    { id: 5, text: "STORE MANAGER", icon: "user", path: "store-manager" }
  ];
  isDrawerOpen: boolean = false;
  buttonOptions: any = {
      icon: "menu",
      onClick: () => {
          this.isDrawerOpen = !this.isDrawerOpen;
      }
  }

  logOffButtonOptions: DxButtonTypes.Properties = {
    text: 'Log Off',
    onClick: () => {
      this.authService.logOut()
    },
  };

  constructor(public topNavService: TopNavService, private authService: AuthService, private router: Router){}

  tabClicked(e :any){
    console.log(e)
    this.topNavService.navigate(e.itemData)
  }

  menuItemClicked(e){
    this.router.navigate(['/', e.itemData.path]);
  }
}
