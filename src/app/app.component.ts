import { Component, AfterViewInit, ViewChild } from '@angular/core'

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
export class AppComponent implements AfterViewInit{
  title = "Rayyan's Archive & Gallery";
  

  constructor(private contexts: ChildrenOutletContexts) {}

  ngAfterViewInit(): void {
    window.addEventListener('load', this.removeLoader);


    setTimeout(() => {
      gsap.to('.loader .column-text-inner', {
        duration: 1,
        y: 0,
        ease: "power3.out"
      })
    }, 1250)
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

  removeLoader() {
    // setTimeout(() => {
    //   gsap.to('#loader', {
    //     duration: 0.3,
    //     opacity: 0,
    //     display: 'none',
    //   })
    // }, 3000)
    gsap.to('#loader', {
      duration: 0.3,
      opacity: 0,
      display: 'none',
    })
  }

}
