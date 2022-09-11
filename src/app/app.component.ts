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
export class AppComponent implements AfterViewInit{
  title = "Rayyan's Archive & Gallery";
  

  constructor(private contexts: ChildrenOutletContexts, private ngZone: NgZone, private router: Router) {}

  ngAfterViewInit(): void {
    window.addEventListener('load', this.removeLoader); // if loaded, remove loader
    window.addEventListener('resize', () => {
      this.smallScreenDisplay();
    }); // if resized, check if viewport too small
    setTimeout(() => {this.smallScreenDisplay()}, 100 )

    
    
    // if (document.readyState === 'loading') {  // Loading hasn't finished yet
    //   document.addEventListener('DOMContentLoaded', () => {setTimeout(this.smallScreenDisplay, 300)});
    // } else {  // `DOMContentLoaded` has already fired
    //   this.smallScreenDisplay();
    // }


    setTimeout(() => {
      gsap.to('.loader .column-text-inner', {
        duration: 1.5,
        y: 0,
        ease: "power3.out"
      })
    }, 1500)
  }

  ngOnInit(): void {
    if(window.location.search.substring(1) !== "full=true") { // do not redirect if querystring is ?full=true
      if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/Blackberry/i) || navigator.userAgent.match(/WebOs/i)) { // detect mobile browser
        this.ngZone.run(() => {
          this.router.navigate(['mobile']);
        })
      }
    }
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
    // }, 5000)
    gsap.to('#loader', {
      duration: 0.3,
      opacity: 0,
      display: 'none',
    })
  }


  @ViewChild('smallViewport') smallViewport?: ElementRef;
  selectedText: Array<String> = ['', '']
  smallScreenDisplay(): void {
    const text = [
      [`Please view this website on a larger screen`, `Archive & Gallery is an interactive and animated website which is best experienced on a larger screen. So grab your laptop or an ipad and pull right up!`],
      [`Please rotate your device`, 'Your screen width is too small to view Archive & Gallery. Please rotate your device']
    ]
    // console.log(`${window.innerWidth} x ${window.innerHeight}`);
    if (window.innerWidth <= 915 || window.innerHeight <= 599) { // If true: Viewport too small 
      if (window.innerWidth <= 599 || window.innerHeight <= 915) { // If true: viewport too small even when rotated
        this.smallViewport?.nativeElement.classList.add('visible');
        this.selectedText = text[0];
      }
      else { // viewport large enough if rotated
        this.smallViewport?.nativeElement.classList.add('visible');
        this.selectedText = text[1];
      }
    } 
    else { // viewport not too small
      this.smallViewport?.nativeElement.classList.remove('visible');
    }
  }

}
