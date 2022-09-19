import { Injectable, NgZone } from '@angular/core';
import { gsap } from 'gsap';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MobileService {

  constructor(private router: Router, private ngZone: NgZone) { }

  mobileRoute(direction: 'in' | 'out', src?: string, id?: number) {
    if (direction == 'out') {
      const nl = gsap.timeline();
      nl.to('.line', {
        duration: 0.2,
        opacity: 0
      })
      nl.to('.image-list img', {
        duration: 0.5,
        ease: 'power2.in',
        stagger: {
          each: 0.025,
          from: id!-1
        },
        y: 80,
        opacity: 0,
        onComplete: () => {
          this.ngZone.run(() => {
            try {
              this.router.navigate(['collection', src])
            }
            catch(err) {
              // do nothing, this prevents logging of error to console
            }
          })
        }
      }, "<")
      nl.to('.heading h1', {
        duration: 0.4,
        display: 'none',
        y: '-100%'
      }, "<+=0.1")
      nl.set('.router-wrapper', {zIndex: 1})
    }
    else if (direction == 'in') {
      const itl = gsap.timeline();
      itl.set('.router-wrapper', {zIndex: -1})
      itl.set('.heading h1', {y: '100%', display: 'block'})
      itl.set('.line', {opacity: 1, height: 0})
  
      itl.to('.image-list img', {
        duration: 1.35,
        stagger: 0.07,
        ease: "expo.out",
        opacity: 1,
        y: 0,
        // delay: 0.1
      });
      itl.to('.line', {
        duration: 1.5,
        ease: 'expo.in',
        height: '100%'
      }, "<")
      itl.to('.heading h1', {
        duration: 0.9,
        ease: 'expo.out',
        y: 0
      }, "<+=0.35")
    }
  }
}
