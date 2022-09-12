//
//  LOADER SERVICE needs to be imported to all route-able components.
//
//  Loader service detects a "load" event and allows collection-view to call initialAnimations(), it needs to be able to detect 
//  this event regardless of which route the app starts at
//

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { gsap } from 'gsap';

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
    }, 2200)

    window.addEventListener('load', () => {
      this.loadedStatus = true;
      bothComplete()
    })

  }


  // waitForLoad() {

  //   // const thumbnails = document.querySelectorAll('img') as NodeListOf<HTMLImageElement>;
  //   // let loaderPercentage = 0;
  //   // let thumbnailCount = thumbnails.length, loadedCounter = 0;
  //   // let percentageIncrease = (100 / thumbnailCount);
  //   // let percentage = 0;

  //   // let incrementCounter = () => {
  //   //   loadedCounter++
          
  //   //   percentage += percentageIncrease;
  //   //   (document.querySelector('#percentage') as HTMLElement).innerHTML = `${Math.floor(percentage) + 1}%`;
  //   //   loaderPercentage = Math.floor(percentage) + 1
  
  //   //   if (loadedCounter >= thumbnailCount) {
  //   //       // remove loader
  //   //       console.log(`${loadedCounter} out of ${thumbnailCount} images loaded`);
  //   //       gsap.to('#loader', {
  //   //         duration: 0.3,
  //   //         opacity: 0,
  //   //         display: 'none',
  //   //         onComplete: () => {
  //   //           this.loadedStatus = true;
  //   //           this.loaded.next(this.loadedStatus)
  //   //         }
  //   //       })
  //   //   }
  //   // }

  //   // thumbnails.forEach(function(thumbnail, index){
  //   //   if (thumbnail.complete) {incrementCounter()}
  //   //   else {thumbnail.addEventListener( 'load', incrementCounter, false );}
  //   // })
  // }

}
