import { Injectable, QueryList } from '@angular/core';
import { gsap } from 'gsap';
import { Flip } from 'gsap/all';
import { delay } from 'rxjs';
import { thumbnailNumbers } from './collectionOrder';

@Injectable({
  providedIn: 'root'
})
export class ViewSwitcherService {

  constructor() {
    gsap.registerPlugin(Flip);
  }

  public viewState: number = 1;
  public transitionalViewState: number = 1;
  private linkState: 'frozen' | 'available' = 'available';
  private viewSwitchEvent: Event = new Event('viewswitch');

  setViewState(state: number) {
    this.viewState = state;
    this.setTransitionalViewState(state)
    document.dispatchEvent(this.viewSwitchEvent)
  }
  setTransitionalViewState(state: number) {
    this.transitionalViewState = state;
  }
  setLinkState(state: 'frozen' | 'available') {
    this.linkState = state;
  }
  getViewState(): number {return this.viewState}
  getTransitionalViewState(): number {return this.transitionalViewState}
  getLinkState() {return this.linkState}

  z = 5;
  topImage(index: number, reset?: boolean) {
    if (reset == true) {
      (document.querySelectorAll('.collection img') as NodeListOf<HTMLElement>).forEach((img) => {
        img.style.zIndex = '0';
      })
    } 
    else {
      (document.querySelectorAll('.collection img')[thumbnailNumbers[index]] as HTMLElement).style.zIndex = `${this.z + 1}`;
      this.z += 1;
    }
  }

  headingMove(direction: 'in' | 'out', timeline: any, timelinePlacementArg?: string | number, delay?: number) {
    let headingHeight = (document.querySelector('.heading .right') as HTMLElement).clientHeight;

    if (direction === 'out') {
      timeline.to('.heading .left',
      {
          duration: 0.6,
          y: +headingHeight + 0,
          ease: "power2.inOut",
      }, timelinePlacementArg)
      timeline.to('.heading .right',
      {
          duration: 0.6,
          y: -headingHeight - 0,
          ease: "power2.inOut",
      },
      "<")
    }
    else if (direction === 'in') {
      // make heading reappear

      timeline.set('.heading .left',
        {
          y: -headingHeight - 0,
        })
      timeline.set('.heading .right', 
        {
          y: +headingHeight + 0,
        })
      timeline.to('.heading .left',
      {
          duration: 0.9,
          y: "-0.7rem",
          ease: "power3.out",
          delay: delay
      }, timelinePlacementArg)
      timeline.to('.heading .right',
        {
            duration: 0.9,
            y: "0.7rem",
            ease: "power3.out",
        },
      "<")
    }
  }

  switchView(viewNumber: number, viewState?: number): void {
    // console.log(`Current state: ${this.viewState}, Attempted call on: ${viewNumber}`)

    document.addEventListener('switchView', () => {return null})

    if (this.linkState != 'frozen' && this.viewState !== viewNumber) {
      let headingHeight = (document.querySelector('.heading h1') as HTMLElement).clientHeight;
      let images = document.querySelectorAll('main.collection img') as NodeListOf<HTMLElement>;
      let duration = 1.5;   

      let tl = gsap.timeline();

      this.setLinkState('frozen');
            
      const destroyDisconnectedSequences = (view: number) => {

        if (view == 1) {
          this.headingMove('out', tl);
          tl.set('.heading h1', {display: 'none'});
        }
        else if (view == 2) {
          tl.to('.column-text-inner', {
            duration: 1.1,
            y: '-1.5rem',
            stagger: -0.01,
            ease: "power2.out",
          })
          tl.set('.view02-container', {display: 'none'});
          // tl.set('.column-text-inner', {}, "<+=0.2")
        }
        else if (view == 3) {}
      }

      // destroy disconnected sequences to make space clean for new view
      const currentView = this.getViewState();
      destroyDisconnectedSequences(currentView);
      
      if (viewNumber == 1) {

        this.setTransitionalViewState(1);
        
        const images = document.querySelectorAll('.collection img') as NodeListOf<HTMLElement>,
        imageCells = document.querySelectorAll('.image-cell') as NodeListOf<HTMLElement>;

        let d = 1.5, s = 0.02;
        if (this.getViewState() === 3) {
          d = 2, s = 0.025;
        }

        const state = Flip.getState(images, {props: "padding,filter"})
        images.forEach((image, i) => {
          imageCells[i].appendChild(image);
        });
        Flip.from(state, {
          duration: d,
          ease: "power4.out",
          absolute: true,
          stagger: {
            each: s,
            from: "center",
          }, // 0.017
          delay: 0.125,
          onComplete: () => {
            this.setViewState(1);
            this.setLinkState('available');
          }
        });

        setTimeout(() => {
          (document.querySelector('.heading .right') as HTMLElement).style.display = 'block';
          (document.querySelector('.heading .left') as HTMLElement).style.display = 'block';
          this.headingMove('in', gsap, undefined, 1);
        }, 0)
      }
  
      else if (viewNumber == 2) {

        this.setTransitionalViewState(2);


        const images = document.querySelectorAll('.collection img') as NodeListOf<HTMLElement>,
        imageContainer = document.querySelector('#image-container') as HTMLElement,
        view02container = document.querySelector('.view02-container') as HTMLElement;

        view02container.style.display = 'block';

        // let tl = gsap.timeline();

        const state = Flip.getState(images, {props: "padding,filter"});
        images.forEach((image) => {
          imageContainer?.appendChild(image);
        });
        Flip.from(state, {
          duration: 1.4,
          ease: "power3.out",
          absolute: true,
          stagger: {
            each: 0.015,
          },
          delay: 0.1,
        })

        tl.to('.view02-container .column-text-inner', {
          duration: 1,
          y: 0,
          stagger: 0.025,
          ease: "power3.out",
          onComplete: () => {
            this.setViewState(2);
            this.setLinkState('available');
          }
        }, "<")

      }

      else if (viewNumber == 3) {

        this.setTransitionalViewState(3);


        const images = document.querySelectorAll('.collection img') as NodeListOf<HTMLElement>,
        bottomBar = document.querySelector('.bottom-bar') as HTMLElement;

        // let tl = gsap.timeline();
        bottomBar.classList.remove('scrollable');

        const state = Flip.getState('.collection img', {props: "padding,filter"});
        images.forEach((image) => {
          bottomBar.appendChild(image)
        })
        Flip.from(state, {
          duration: 1.75,
          ease: "power4.out",
          absolute: true,
          stagger: {
            each: 0.017, 
            from: "start"
          },
          delay: 0.12,
          onComplete: () => {
            bottomBar.classList.add('scrollable');
            bottomBar.focus();
            this.setViewState(3);
            this.setLinkState('available');
          }
        })       
      }
    }

    return

  }
}
