import { Injectable, QueryList } from '@angular/core';
import { gsap } from 'gsap';

@Injectable({
  providedIn: 'root'
})
export class ViewSwitcherService {

  constructor() { }

  private rightHeading = document.querySelector('.heading h1');
  private viewState: number = 1;
  private linkState: 'frozen' | 'available' = 'available';

  setViewState(state: number) {
    this.viewState = state;
  }
  setLinkState(state: 'frozen' | 'available') {
    this.linkState = state;
  }

  switchView(viewNumber: number, viewState?: number): void {
    // console.log(`Current state: ${this.viewState}, Attempted call on: ${viewNumber}`)

    if (this.linkState != 'frozen' && this.viewState !== viewNumber) {
      let headingHeight = (document.querySelector('.heading h1') as HTMLElement).clientHeight;
      let images = document.querySelectorAll('main.collection img') as NodeListOf<HTMLElement>;
      let duration = 1.5;   
      
      if (viewNumber == 1) {
        let ls = gsap.timeline();
        this.linkState = 'frozen';
  
  
        ls.set('.column-text-inner', {
          y: 0,
        })
  
        ls.to('.column-text-inner', {
          duration: 1.1,
          y: '-1.5rem',
          stagger: -0.0075,
          ease: "power2.out",
        })
        ls.set('.column-text-inner', {}, "<+=0.2")
  
        images.forEach((img) => {
            let margin = 0
            let b = img.offsetTop;
            let horizontalMovement = window.innerWidth - (img.offsetLeft + img.offsetWidth/2) - margin - (window.innerWidth/4);
            let verticalMovement = (b + img.clientHeight/2 - margin) - (window.innerHeight/2);
            
            ls.to(img, {
                duration: duration*1.3,
                y: 0,
                x : 0,
                scale: 1,
                filter: 'none',
                ease: "power3.out",
            }, "<")
        })
  
        // make heading reappear
        ls.set('.heading .right, .heading .left', {opacity: 1});
        ls.set('.heading .left',
          {
              y: -headingHeight - 0,
          })
        ls.set('.heading .right', {
              y: +headingHeight + 0,
          })
        ls.to('.heading .left',
        {
            duration: 0.9,
            y: '-0.7rem',
            ease: "power3.out",
        })
        ls.to('.heading .right',
          {
              duration: 0.9,
              y: '0.7rem',
              ease: "power3.out",
              onComplete: () => {
                this.viewState = 1;
                this.linkState = 'available';
              }
          },
        "<")
        ls.set('.view02-container', {display: 'none'}, ">+=0.1");
      }
  
      else if (viewNumber == 2) {
        let ls = gsap.timeline();
        this.linkState = 'frozen';
  
        ls.set('.view02-container', {display: 'block'}, 0);
  
        // make heading disappear
        ls.to('.heading .left',
          {
              duration: 0.7,
              y: +headingHeight + 0,
              ease: "power2.out",
          })
        ls.to('.heading .right',
          {
              duration: 0.7,
              y: -headingHeight - 0,
              ease: "power2.out",
          },
        "<")
        
        // calculate the translation needed for each image to go to desired position, then translate it 
        images.forEach((img, index) => {
            let margin = 0
            let b = img.offsetTop;
            let horizontalMovement = window.innerWidth - (img.offsetLeft + img.offsetWidth/2) - margin - (window.innerWidth/2);
            let verticalMovement = (b + img.clientHeight/2 - margin) - (window.innerHeight/2);
  
            ls.to(img, {
                duration: duration*1.3,
                y: -verticalMovement,
                x : horizontalMovement,
                scale: 2.5,
                filter: 'grayscale(1)',
                ease: "power3.out",
            }, "<")
        })
        ls.set('.heading .right, .heading .left', {opacity: 0});
        ls.to('.column-text-inner', {
          duration: 1.4,
          y: 0,
          stagger: 0.035,
          ease: "power3.out",
          onComplete: () => {
            this.viewState = 2;
            this.linkState = 'available';
          }
        }, -0.25)
  
        window.addEventListener('resize', () => {
          // calculate the translation needed for each image to go to desired position, then translate it
          if (this.viewState == 2) {
            images.forEach((img, index) => {
              gsap.set(img, {
                y: 0,
                x : 0,
                scale: 1,
              })
      
              let margin = 0
              let b = img.offsetTop;
              let horizontalMovement = window.innerWidth - (img.offsetLeft + img.offsetWidth/2) - margin - (window.innerWidth/2);
              let verticalMovement = (b + img.clientHeight/2 - margin) - (window.innerHeight/2);
  
              gsap.set(img, {
                  // duration: duration*1.5,
                  y: -verticalMovement,
                  x : horizontalMovement,
                  scale: 2.5,
                  filter: 'grayscale(1)',
                  // ease: "power2.inOut",
              })
          })
          } 
        })
      }
    }

  }
}
