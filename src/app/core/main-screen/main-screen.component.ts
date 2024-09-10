import { Component } from '@angular/core';
import { DxButtonTypes } from 'devextreme-angular/ui/button';
import { AuthService } from 'impactdisciplescommon/src/services/utils/auth.service';
import { TopNavService } from 'impactdisciplescommon/src/services/utils/top-nav.service';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent {
  eventManagerButtonOptions: DxButtonTypes.Properties = {
    text: 'Events Manager',
    onClick: () => {
      this.topNavService.navigate({ id: 0, name:'Events Manager', route:'events-manager', icon: 'home', level: 0})
    },
  };

  webManagerButtonOptions: DxButtonTypes.Properties = {
    text: 'Web Manager',
    onClick: () => {
      this.topNavService.navigate({ id: 0, name:'Web Manager', route:'web-manager', icon: 'toolbox', level: 0})
    },
  };

  subscriptionsManagerButtonOptions: DxButtonTypes.Properties = {
    text: 'Subscriptions Manager',
    onClick: () => {
      this.topNavService.navigate({ id: 0, name:'Subscriptions Manager', route:'subscriptions-manager', icon: 'toolbox', level: 0})
    },
  };

  requestsManagerButtonOptions: DxButtonTypes.Properties = {
    text: 'Requests Manager',
    onClick: () => {
      this.topNavService.navigate({ id: 0, name:'Requests Manager', route:'requests-manager', icon: 'toolbox', level: 0})
    },
  };

  adminManagerButtonOptions: DxButtonTypes.Properties = {
    text: 'Admin Manager',
    onClick: () => {
      this.topNavService.navigate({ id: 0, name:'Admin Manager', route:'admin-manager', icon: 'toolbox', level: 0})
    },
  };

  logOffButtonOptions: DxButtonTypes.Properties = {
    text: 'Log Off',
    onClick: () => {
      this.authService.logOut()
    },
  };

  constructor(public topNavService: TopNavService, private authService: AuthService){}

  tabClicked(e :any){
    this.topNavService.navigate(e.itemData)
  }
}
