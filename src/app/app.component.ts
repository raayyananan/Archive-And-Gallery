import { Component, HostBinding } from '@angular/core';
import {
  animation, trigger, animateChild, group,
  transition, animate, style, query
} from '@angular/animations';

import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { fadeAnimation } from './animations';
  
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    fadeAnimation
  ],
})
export class AppComponent {
  title = "Rayyan's Archive & Gallery";

  constructor(private contexts: ChildrenOutletContexts) {}

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
