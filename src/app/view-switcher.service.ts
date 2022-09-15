import { Injectable, QueryList } from '@angular/core';
import { gsap } from 'gsap';
import { Flip, CustomEase } from 'gsap/all';
import { delay } from 'rxjs';
import { thumbnailNumbers } from './collectionOrder';

@Injectable({
  providedIn: 'root'
})
export class ViewSwitcherService {

  constructor() {
    gsap.registerPlugin(Flip);
    gsap.registerPlugin(CustomEase);

    // CustomEase.create("cubic", "0.180, 0.480, 0.115, 1.000");
    // CustomEase.create("cubic", "00.070, 0.780, 0.000, 1.000");
    // CustomEase.create("cubic", "M0,0,C0.084,0.61,0.214,0.802,0.28,0.856,0.356,0.918,0.374,1,1,1");
    CustomEase.create("cubic", "M0,0,C0.084,0.61,0.026,0.703,0.172,0.906,0.218,0.97,0.29,0.99,1,1");
    CustomEase.create("custom", "M0,0 C0.076,0.553 0.06,0.704 0.184,0.834 0.302,0.957 0.29,0.99 1,1 ");
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
        img.style.zIndex = '';
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

      let tl = gsap.timeline();
      this.setLinkState('frozen');

      let duration = 1.4, ease ="expo.out", stagger = 0.03;
            
      const destroyDisconnectedSequences = (view: number) => {

        if (view == 1) {
          this.headingMove('out', tl);
          gsap.to('.column-background div', {
            duration: duration*0.7,
            ease: ease,
            height: 0,
            stagger: 0.075,
            // display: 'none',
          })
          tl.set('.heading h1', {display: 'none'});
        }
        else if (view == 2) {
          tl.to('app-collection-view .column-text-inner', {
            duration: 1.1,
            y: '-101%',
            stagger: -0.01,
            ease: "power2.out",
          })
          tl.set('.view02-container', {display: 'none'});
          tl.set('app-collection-view .column-text-inner', {y: '101%'})
          // tl.set('.column-text-inner', {}, "<+=0.2")
        }
        else if (view == 3) {
          tl.to('.arrows-container .arrows', {
            duration: 0.25,
            opacity: 0
          }, "<")
          tl.set('.view03-container', {display: 'none'});
          tl.set('.bottom-bar', {display: 'none'});
          tl.set('.arrows-container .arrows', {opacity: 1})
        }
      }

      // destroy disconnected sequences to make space clean for new view
      const currentView = this.getViewState();
      destroyDisconnectedSequences(currentView);
      
      if (viewNumber == 1) {

        this.setTransitionalViewState(1);
        
        const images = document.querySelectorAll('.collection img') as NodeListOf<HTMLElement>,
        imageCells = document.querySelectorAll('.image-cell') as NodeListOf<HTMLElement>;

        const state = Flip.getState(images, {props: "padding,filter"})
        images.forEach((image, i) => {
          imageCells[i].appendChild(image);
        });
        if (currentView === 3) {
          Flip.from(state, {
            duration: duration, // 1.75
            ease: ease,
            absolute: true,
            stagger: {
              each: stagger,
              from: "start",
            }, // 0.017
            delay: 0.075,
            onComplete: () => {
              this.setViewState(1);
              this.setLinkState('available');
            }
          });
        }
        else {
          Flip.from(state, {
            duration: duration, //1.7
            ease: ease,
            absolute: true,
            stagger: {
              each: stagger,
              from: "end",
            }, // 0.017
            delay: 0.12,
            onComplete: () => {
              this.setViewState(1);
              this.setLinkState('available');
            }
          });
        }

        gsap.to('.column-background div', {
          duration: duration*0.7,
          stagger: 0.075,
          ease: "expo.inOut",
          // delay: duration/5,
          // display: 'grid',
          height: '100vh',
        })


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
          duration: duration, //1.5
          ease: ease,
          absolute: true,
          stagger: {
            each: stagger, //0.015
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

        (document.querySelector('.view03-container') as HTMLElement).style.display = 'flex';
        (document.querySelector('.bottom-bar') as HTMLElement).style.display = 'flex';

        const images = document.querySelectorAll('.collection img') as NodeListOf<HTMLElement>,
        bottomBar = document.querySelector('.bottom-bar') as HTMLElement;

        // bottomBar.classList.remove('scrollable');

        const state = Flip.getState('.collection img', {props: "padding,filter"});
        images.forEach((image) => {
          bottomBar.appendChild(image)
        })
        Flip.from(state, {
          duration: duration, //1.75
          ease: ease, //power4.out
          absolute: true,
          stagger: {
            each: stagger, //0.017 
            from: "start"
          },
          delay: 0.12,
          onComplete: () => {
            // bottomBar.classList.add('scrollable');
            bottomBar.focus();
            this.setViewState(3);
            this.setLinkState('available');
          }
        })       
        //0.230, 0.545, 0.085, 0.995
      }
    }

    return

  }

  getTranslateValues (element: HTMLElement): any {
    const style = window.getComputedStyle(element)
    const matrix: any = style['transform'] || style.webkitTransform;

    // No transform property. Simply return 0 values.
    if (matrix === 'none' || typeof matrix === 'undefined') {
      return {
        x: 0,
        y: 0,
        z: 0
      }
    }

    // Can either be 2d or 3d transform
    const matrixType = matrix.includes('3d') ? '3d' : '2d'
    const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ')

    // 2d matrices have 6 values
    // Last 2 values are X and Y.
    // 2d matrices does not have Z value.
    if (matrixType === '2d') {
      return {
        x: matrixValues[4],
        y: matrixValues[5],
        z: 0
      }
    }

    // 3d matrices have 16 values
    // The 13th, 14th, and 15th values are X, Y, and Z
    if (matrixType === '3d') {
      return {
        x: matrixValues[12],
        y: matrixValues[13],
        z: matrixValues[14]
      }
    }
  }

  initializeScrollTransform(): any { // for scrolling in view03

    // bottomBars translateX cannot be higher than 0, nor lower than -width of bottomBar
    const bottomBar = document.querySelector('.bottom-bar') as HTMLElement;
    
    const scrollTransform = (deltaX: any, deltaY: any, target: HTMLElement): void => {
      const scrollableWidth = target.scrollWidth - target.clientWidth;
      let scroll = (deltaX + deltaY) * 0.15;
      let translateX = this.getTranslateValues(target).x;

      if (translateX >= 0 && scroll > 0) 
      {
        // allows only positive scroll
        // target.style.transform += `translateX(${-scroll}px)`;
        gsap.set(target, {x: "+="+(-scroll)})
      }
      else if (translateX < 0 && Number(-translateX) <= scrollableWidth) {
        // allows scrolling in any direction
        // target.style.transform += `translateX(${-scroll}px)`;
        gsap.set(target, {x: "+="+(-scroll)})
      }
      else if (Number(-translateX) > scrollableWidth && scroll < 0) {
        // allows only negative scroll
        // target.style.transform += `translateX(${-scroll}px)`;
        gsap.set(target, {x: "+="+(-scroll)})
      }
      // console.log(typeof(Number(-translateX)))
      // console.log(-translateX, scrollableWidth)

      return 
    }

    window.addEventListener('wheel', (event) => {
      if (this.getTransitionalViewState() === 3) {
        scrollTransform(event.deltaX, event.deltaY, bottomBar);
      }
    });
  }

  buttonMoveX(direction: 'forwards' | 'backwards', button?: boolean, target?: HTMLElement) {
    const bottomBar = document.querySelector('.bottom-bar') as HTMLElement;
    target = bottomBar;
    const scrollableWidth = target.scrollWidth - target.clientWidth;
    let translateX = Number(this.getTranslateValues(target).x);
    let ease = "cubic", dr = 1.5, factor = 1.5;
    let movement = (document.querySelector('.bottom-bar img') as HTMLElement).offsetWidth * factor;

    if (button == true) {
      dr = 1, factor = 2;
      movement = (document.querySelector('.bottom-bar img') as HTMLElement).offsetWidth * factor;
    }

    const tl = gsap.timeline()

    if (translateX >= 0 && direction == 'forwards') {
      tl.to(bottomBar, {
        duration: dr,
        ease: ease,
        x: "-="+movement
      })
    }
    else if (translateX < 0 && (-translateX + movement) <= scrollableWidth) {
      if (direction == 'forwards') {
        tl.to(bottomBar, {
          duration: dr,
          ease: ease,
          x: "-="+movement
        })
      }
      else if (direction == 'backwards') {
        if ((translateX + movement) >= 0) {
          tl.to(bottomBar, {
            duration: dr,
            ease: ease,
            x: 0
          })
        }
        else {
          tl.to(bottomBar, {
            duration: dr,
            ease: ease,
            x: "+="+movement
          })
        }
      }
    }
    else if ((-translateX + movement) >= scrollableWidth && direction == 'backwards') {
      tl.to(bottomBar, {
        duration: dr,
        ease: ease,
        x: "+="+movement
      })
    }
    //edge cases
    else if ((-translateX + movement) >= scrollableWidth && direction == 'forwards') {
      tl.to(bottomBar, {
        duration: dr,
        ease: ease,
        x: -scrollableWidth
      })
    }

      
  }

  gridState: 1 | 2 | 3 = 2;
  getGridState(): number {return this.gridState}
  toggleGrid(): void {
    const grid = document.querySelector('.column-background') as HTMLElement;
    if (this.gridState == 1) { // background
      this.gridState = 2;
      grid.classList.remove('background');
      grid.classList.add('border');
    }
    else if (this.gridState == 2) { // border
      this.gridState = 3;
      grid.classList.remove('background');
      grid.classList.remove('border');
    } 
    else if (this.gridState == 3) { // plain
      this.gridState = 1;
      grid.classList.add('background');
      grid.classList.remove('border');
    }
    return
  }
}
