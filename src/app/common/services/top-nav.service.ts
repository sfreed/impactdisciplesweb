import { Injectable, OnInit } from '@angular/core';
import { Stack } from '../models/utils/stack';
import { Router } from '@angular/router';
import { RouteItem } from '../models/utils/route-item';

@Injectable({
  providedIn: 'root'
})
export class TopNavService {

  stack: Stack<RouteItem>;

  constructor(private router: Router) {
    this.stack = new Stack<RouteItem>();

    if(this.stack.size() == 0){
      this.navigate({ id: 0, name:'Home', route:'home', icon: 'home', level: 0});
    }
  }

  navigate(routeItem: RouteItem){
    if(this.stack.peek()?.level == 0){
      this.stack.pop();
    }

    console.log(routeItem)
    this.stack.push(routeItem);

    this.router.navigate([routeItem.route])
  }

  back(){
    if(this.stack.peek()?.level != 0){
      this.stack.pop();
    }

    this.router.navigate([this.stack.peek()])
  }

  current(){
    return this.stack.peek()
  }

}
