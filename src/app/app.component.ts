import { Component, AfterViewInit, ViewChild, ElementRef, OnInit, NgZone } from '@angular/core';

import { Router } from '@angular/router';

import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { CollectionViewComponent } from './collection-view/collection-view.component';
import { fadeAnimation } from './animations';
import { gsap } from 'gsap';
  
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    fadeAnimation
  ],
})
export class AppComponent implements OnInit {
  title = "Rayyan's Archive & Gallery";
  

  constructor(private contexts: ChildrenOutletContexts, private ngZone: NgZone, private router: Router) {}

  ngOnInit(): void {
    if(window.location.search.substring(1) !== "full=true") { // do not redirect if querystring is ?full=true
      if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/Blackberry/i) || navigator.userAgent.match(/WebOs/i)) { // detect mobile browser
        this.ngZone.run(() => {
          this.router.navigate(['mobile']);
        })
      }
    }
    if (!navigator.userAgent.match(/iPhone/i) || !navigator.userAgent.match(/Android/i) || !navigator.userAgent.match(/Blackberry/i) || !navigator.userAgent.match(/WebOs/i)) { // detect mobile browser
      this.ngZone.run(() => {
        this.router.navigate(['']);
      })
    }
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

}
