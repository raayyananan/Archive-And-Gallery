//
//  LOADER SERVICE needs to be imported to all route-able components.
//
//  Loader service detects a "load" event and allows collection-view to call initialAnimations(), it needs to be able to detect 
//  this event regardless of which route the app starts at
//

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { gsap } from 'gsap';
import { collections } from './collectionOrder';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  // subject: Observable<boolean>;

  loaded = new Subject();
  loadedStatus: boolean = false;
  animationComplete: boolean = false;
  
  constructor() {

    let bothComplete = () => {
      if (this.loadedStatus && this.animationComplete) {
        this.loaded.next(this.loadedStatus)
      }
    }

    setTimeout(() => {
      this.animationComplete = true;
      bothComplete()
    }, 2200) //2200

    window.addEventListener('load', () => {
      this.loadedStatus = true;
      bothComplete()

      collections.forEach((collection, i) => {
        // collection.sources.forEach((src, i) => {

        // })
        for (let x = 0; x < 4; x++) {
          let img = new Image();
          img.src = collection.sources[x];
          img.onload = () => {console.log('loaded')}
        }
      })
    })
  }
}
