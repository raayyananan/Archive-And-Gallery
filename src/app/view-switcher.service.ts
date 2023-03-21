import { Injectable, QueryList, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { gsap } from 'gsap';
import { Flip, CustomEase } from 'gsap/all';
import { delay } from 'rxjs';
import { thumbnailNumbers } from './collectionOrder';
import LocomotiveScroll from 'locomotive-scroll';

@Injectable({
  providedIn: 'root'
})
export class ViewSwitcherService {

  constructor(private ngZone: NgZone, private router: Router) {
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
  public imageViewState: number = 1;
  private linkState: 'frozen' | 'available' = 'available';
  private viewSwitchEvent: Event = new Event('viewswitch');

  private safeToRouteBetweenCollections: boolean = false;
  private switchedOnce: boolean = false;
  
  initialAnimationsComplete: boolean = false;
  scroll: any;


  setViewState(state: number) {
    this.viewState = state;
    this.setTransitionalViewState(state)

    if (this.viewState !== 4) {
      this.setImageViewState(state)
    }
    // document.dispatchEvent(this.viewSwitchEvent)
  }
  setTransitionalViewState(state: number) {
    this.transitionalViewState = state;
  }
  setImageViewState(state: number) {
    this.imageViewState = state;
  }
  setLinkState(state: 'frozen' | 'available') {
    this.linkState = state;
  }
  getViewState(): number {return this.viewState}
  getTransitionalViewState(): number {return this.transitionalViewState}
  getImageViewState(): number {return this.imageViewState}
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

  switchOnce() {
    setTimeout(() => {
      if (this.switchedOnce == false) {
        (document.querySelector('#v003') as HTMLElement).classList.add('emphasized');

        (document.querySelector('#v003') as HTMLElement).addEventListener('mouseenter', () => {
          this.switchedOnce = true;
          (document.querySelector('#v003') as HTMLElement).classList.remove('emphasized');
        })
      }
    }, 1000);
  }

  destroyDisconnectedSequences(view: number, tl: any, duration: number, ease: string) {
    if (view == 1) {
      gsap.set('.view03-container', {zIndex: -2})
      this.headingMove('out', tl);
      gsap.to('.column-background div', {
        duration: duration*0.7,
        ease: "expo.out",
        height: 0,
        stagger: 0.075,
        // display: 'none',
      })
      gsap.to('#v001 span', {duration: 0.9, skewX: 0})
      tl.set('.heading h1', {display: 'none'});
      tl.set('.cell', {display: 'none'});
    }
    else if (view == 2) {
      gsap.set('.view03-container', {zIndex: -2})
      gsap.to('#v002 span', {duration: 0.9, skewX: 0})
      tl.to('.collectionList.right .column-text-inner', {
        duration: 0.75,
        y: '-101%',
        stagger: {
          each: 0.006,
          from: 'start'
        },
        ease: "power2.out",
        display: 'none'
      })
      tl.to('.collectionList.left .column-text-inner', {
        duration: 0.75,
        y: '-101%',
        stagger: {
          each: 0.006,
          from: 'start'
        },
        ease: "power2.out",
        display: 'none'
      }, "<")
      tl.set('.view02-container', {display: 'none'});
      tl.set('app-collection-view .column-text-inner', {y: '101%'})
      // tl.set('.column-text-inner', {}, "<+=0.2")

    }
    else if (view == 3) {
      gsap.to('.nav .inner-link', {
        duration: 0.5,
        color: 'black',
        delay: 0.2,
        onStart: () => {
          document.documentElement.style.setProperty('--text-strikethrough', 'black');
        }
      })
      gsap.to('html', {
        duration: 0.5,
        background: 'rgb(245,245,245)',
        delay: 0.2
      })
      gsap.set('.view03-container', {zIndex: -2})
      gsap.to('#v003 span', {duration: 0.9, skewX: 0})
      tl.to('.view03-container .line', {
        ease: "power3.out",
        duration: 0.75,
        height: 0,
      }, 0)
      tl.to('.view03-container .horizontal-line', {
        ease: "power3.out",
        duration: 0.75,
        width: 0,
      }, 0)
      tl.to('#view03-title', {
        y: '-105%',
        duration: 0.4,
        ease: 'sine.in',
        display: 'none',
      }, "<")
      tl.set('.view03-container, .view03-text', {display: 'none'});
    }
    else if (view == 4) {
      gsap.set('.view03-container', {zIndex: -2})
      let detailBar = document.querySelector('.detail-bar') as HTMLElement;
      detailBar.style.zIndex = '0';
      gsap.to('#v003 span, #v002 span, #v001 span', {duration: 0.9, skewX: 0})
    }

  }

  switchView(viewNumber: number, bypass?: boolean): void {
    // console.log(`Current state: ${this.viewState}, Attempted call on: ${viewNumber}`)

    document.addEventListener('switchView', () => {return null})

    if (this.linkState != 'frozen' && this.viewState !== viewNumber) {


      const tl = gsap.timeline();
      this.setLinkState('frozen');

      let duration = 1.4, ease ="expo.out", stagger = 0.03;

      // destroy disconnected sequences to make space clean for new view
      const currentView = this.getViewState();
      if (currentView != 4) {
        if (this.switchedOnce == false) {
          this.ngZone.run(() => {
            this.switchedOnce = true;
            (document.querySelector('#v003') as HTMLElement).classList.remove('emphasized');
          });
        }
      }
      this.destroyDisconnectedSequences(currentView, tl, duration, ease)
      
      if (viewNumber == 1) {

        this.setTransitionalViewState(1);
        gsap.to('#v001 span', {duration: 0.9, skewX: "-15px"});
        
        
        (document.querySelectorAll('.cell') as NodeListOf<HTMLElement>).forEach((cell) => {cell.style.display = 'block'});
        (document.querySelectorAll('.heading .right, .heading .left') as NodeListOf<HTMLElement>).forEach((heading) => {heading.innerHTML = 'Archive & Gallery';})
        
        
        const images = document.querySelectorAll('.collection .thumbnail') as NodeListOf<HTMLElement>,
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
            delay: 0.08,
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
            delay: 0.08,
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
        gsap.to('#v002 span', {duration: 0.9, skewX: "-15px"});


        const images = document.querySelectorAll('.collection .thumbnail') as NodeListOf<HTMLElement>,
        imageContainer = document.querySelector('#image-container') as HTMLElement,
        view02container = document.querySelector('.view02-container') as HTMLElement;

        view02container.style.display = 'block';
        (document.querySelectorAll('app-collection-view .column-text-inner') as NodeListOf<HTMLElement>).forEach((li) => {li.style.display = 'block'})

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
          delay: 0.08,
        })

        tl.to('.view02-container .column-text-inner', {
          duration: 1,
          y: 0,
          stagger: 0.02,
          ease: "power3.out",
          onComplete: () => {
            this.setViewState(2);
            this.setLinkState('available');
          }
        }, "<")

      }

      else if (viewNumber == 3) {

        this.setTransitionalViewState(3);
        gsap.set('.view03-container', {zIndex: 3})
        gsap.to('#v003 span', {duration: 0.9, skewX: "-15px"});

        (document.querySelector('.view03-container') as HTMLElement).style.display = 'flex';
        (document.querySelector('.view03-text') as HTMLElement).style.display = 'grid';
        (document.querySelector('.image-bar') as HTMLElement).style.display = 'block';

        const images = document.querySelectorAll('.collection .thumbnail') as NodeListOf<HTMLElement>,
        bottomBar = document.querySelector('.image-bar') as HTMLElement;

        // bottomBar.classList.remove('scrollable');

        const state = Flip.getState('.collection .thumbnail', {props: "padding,filter"});
        Array.from(images)
          .slice()
          .reverse()
          .forEach((image) => {
            bottomBar.prepend(image)
          });
        this.scroll.update();
        this.scroll.start();
        Flip.from(state, {
          duration: duration, //1.75
          ease: ease, //power4.out
          absolute: true,
          stagger: {
            each: stagger, //0.017 
            from: "start"
          },
          delay: 0.08,
          onComplete: () => {
            // bottomBar.classList.add('scrollable');
            this.setViewState(3);
            this.setLinkState('available');
            // this.scroll.start();
            if ((document.querySelector('#delete-on-view03') as HTMLElement)) {
              (document.querySelector('#delete-on-view03') as HTMLElement).remove();
            }
            this.scroll.update();
            // this.scroll.scrollTo(-42.5 / 100 *document.documentElement.offsetWidth, {duration: 0})
          }
        }) 

        
        tl.to('.nav .inner-link', {
          duration: 0.5,
          color: 'white',
          delay: 0.2,
          onStart: () => {
            document.documentElement.style.setProperty('--text-strikethrough', 'white');
          }
        }, 0)
        tl.to('html', {
          duration: 0.5,
          background: 'black',
          delay: 0.2
        }, 0)
        tl.set('.view03-container .line', {display: 'block', height: 0}, ">-=0.4")
        tl.set('.view03-container .horizontal-line', {display: 'block', width: 0}, "<")
        tl.to('.view03-container .line', {
          duration: 2,
          ease: "expo.inOut",
          height: 32
        }, "<")
        tl.to('.view03-container .horizontal-line', {
          duration: 2,
          ease: "expo.inOut",
          width: 32
        }, "<")
        tl.set('#view03-title', {display: 'block', y: '101%', opacity: 1}, "<")
        tl.to('#view03-title', {
          y: 0,
          duration: 1.1,
          ease: "cubic",
        }, "<+=0.65")
        //0.230, 0.545, 0.085, 0.995
      }
    }

    return

  }

  route(url?: string, staggerFrom?: any): void {
    if (this.initialAnimationsComplete) {
      let firstElem = 'start';
      if (staggerFrom) {firstElem = staggerFrom}

      const tl = gsap.timeline();
      if (this.getTransitionalViewState() !== 4) {
        const images = document.querySelectorAll('.collection .thumbnail') as NodeListOf<HTMLElement>,
        detailBar = document.querySelector('.detail-bar') as HTMLElement;
  
        this.setLinkState('frozen');
        
        detailBar.style.zIndex = '3';
        let duration = 1.4, ease ="expo.out", stagger = 0.02;
        
        this.destroyDisconnectedSequences(this.getTransitionalViewState(), tl, duration, ease)
        
        this.setTransitionalViewState(4);
  
        const state = Flip.getState(images, {props: "padding,filter"})
        images.forEach((img) => {
          detailBar.appendChild(img)
        })
        Flip.from(state, {
          duration: duration,
          ease: ease,
          stagger: {
            each: stagger,
            from: staggerFrom
          },
          absolute: true,
          delay: 0.08,
          onComplete: () => {
            this.setViewState(4);
            this.setLinkState('available');

            setTimeout(() => {this.safeToRouteBetweenCollections = true}, 1600)
          }
        })
  
        gsap.to('.route-filler', {
          onStart: () => {
            if (url) {
              this.ngZone.run(() => {
                this.router.navigate(['collection', url])
              })
            }
          },
          delay: duration - 0 //0.4
        })
      }
      else if (this.getViewState() == 4 && this.safeToRouteBetweenCollections) {
        this.ngZone.run(() => {
          this.router.navigate(['collection', url])
        })
      }
    }
  }

  mousedown = false;
  dragPosition: number = 0;
  scrollStartPosition: number = 0;
  setView3MouseUp() {this.mousedown = false}
  setView3MouseDown(e: MouseEvent) {
    this.mousedown = true;
    this.dragPosition = e.clientX;
    this.scrollStartPosition = this.scroll.scroll.instance.scroll.x;
  }
  drag(e: MouseEvent) {
    if (this.mousedown) {
      const diff = this.dragPosition - e.clientX;
      // this.scroll.scroll.instance.scroll.x
      // this.scroll.scrollTo(this.scrollStartPosition + diff*1.2 , 
      //   {
      //     duration: 1000,
      //     easing: [0.22, 1, 0.36, 1],
      //     disableLerp: true,
      //   })

        // transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -1736, 0, 0, 1);
      // gsap.to('.image-bar', {
      //   transform: `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, ${-(this.scrollStartPosition + diff*1.2)}, 0, 0, 1)`,
      //   ease: "expo.out",
      //   duration: 1,
      //   onUpdate: () => {
      //     // this.scroll.scroll.instance.scroll.x = (this.scrollStartPosition + diff*1.2)
      //   },
      //   onComplete: () => {
      //     // this.scroll.scrollTo((this.scrollStartPosition + diff*1.2), {duration: 0, disableLerp: true})
      //   }
      // })
    }
  }

  initializeScrollTransform(): any { // for scrolling in view03

    // const view03con = (document.querySelector('.view03-container') as HTMLElement)
    gsap.set('.image-bar', {position: 'relative'});
    this.scroll = new LocomotiveScroll({
      el: document.querySelector('.image-bar') as HTMLElement,
              direction: 'horizontal',
              smooth: true,
              multiplier: 0.6,
              touchMultiplier: 3,
              gestureDirection: 'both',
              smartphone: {smooth: true},
              tablet: {breakpoint: 1}
            });
    this.scroll.update()
    let midpoint = window.innerWidth/2 - 14.4/100*window.innerHeight - 8;
    this.scroll.scrollTo(midpoint, {duration: 0, disableLerp: true})
    this.scroll.update()
    this.scroll.stop();
    
    let stl = gsap.timeline();
    let flag = true, timer: any = null;
    let c = 0;
    this.scroll.on('scroll', (data: any) => {
      if (this.getViewState() == 3) {
        c++;
        if (c > 1) {
          if (flag == true) {
            // animate to large
            gsap.to('.view03-container .line', {
              duration: 1,
              ease: "expo.out",
              height: 43
            })
            gsap.to('.view03-container .horizontal-line', {
              duration: 1,
              ease: "expo.out",
              width: 43
            })
            stl.to('#view03-title', {
              y: '-105%',
              duration: 0.4,
              ease: 'sine.in'
            })
            stl.set('#view03-title', {opacity: 0})
            flag = false;
          }
    
          if(timer !== null) {
            clearTimeout(timer);        
          }
          timer = setTimeout(() => {
            // animate to small
            const images = document.querySelectorAll('.thumbnail') as NodeListOf<HTMLElement>;
            let delta = (window.innerWidth/2 - 4) + data.delta.x, name: string | undefined = 'Archive & Gallery';

            for (let i = 0; i <= images.length - 2; i++) {
              if (images[i].offsetLeft < delta && images[i + 1].offsetLeft > delta) {
                name = images[i].dataset.name;
                (document.querySelectorAll('.collection img')[i] as HTMLElement).style.zIndex = `${this.z + 1}`;
      this.z += 1;
              }
              else if (images[i + 1].offsetLeft < delta) {
                name = images[i+1].dataset.name;
                (document.querySelectorAll('.collection img')[i+1] as HTMLElement).style.zIndex = `${this.z + 1}`;
              }
            }
            // console.log(delta)
            gsap.to('.view03-container .line', {
              duration: 1,
              ease: "expo.out",
              height: 32
            })
            gsap.to('.view03-container .horizontal-line', {
              duration: 1,
              ease: "expo.out",
              width: 32
            })
            stl.set('#view03-title', {y: '101%', opacity: 1, onComplete: () => {
              (document.querySelector('#view03-title') as HTMLElement).innerHTML = name as string;
            }})
            stl.to('#view03-title', {
              y: 0,
              duration: 0.9,
              ease: "cubic",
            })
            flag = true;
          }, 50);
        }
      }
  })

  window.addEventListener('resize', () => {this.scroll.update()})
  

    // 
    // const transformScroll = (event: any) => {

    //   // if (!event.deltaY) {
    //   //   return;
    //   // }
    //   if (!event.shiftKey) {
    //     event.currentTarget.scrollLeft += (event.deltaY + event.deltaX) / 4;
    //     event.preventDefault();
    //   }

    //   if (flag == true) {
    //     // animate to large
    //     gsap.to('.view03-container .line', {
    //       duration: 1,
    //       ease: "expo.out",
    //       height: 43
    //     })
    //     gsap.to('.view03-container .horizontal-line', {
    //       duration: 1,
    //       ease: "expo.out",
    //       width: 43
    //     })
    //     flag = false;
    //   }

    //   if(timer !== null) {
    //     clearTimeout(timer);        
    //   }
    //   timer = setTimeout(() => {
    //     // animate to small
    //     gsap.to('.view03-container .line', {
    //       duration: 1,
    //       ease: "expo.out",
    //       height: 32
    //     })
    //     gsap.to('.view03-container .horizontal-line', {
    //       duration: 1,
    //       ease: "expo.out",
    //       width: 32
    //     })
    //     flag = true;
    //   }, 50);

    // }
    // view03con.addEventListener('wheel', transformScroll)
    // return

    // bottomBars translateX cannot be higher than 0, nor lower than -width of bottomBar
    // const bottomBar = document.querySelector('.bottom-bar') as HTMLElement;
    
    // const scrollTransform = (deltaX: any, deltaY: any, target: HTMLElement): void => {
    //   const scrollableWidth = target.scrollWidth - target.clientWidth;
    //   let scroll = (deltaX + deltaY) * 0.25;
    //   let translateX = this.getTranslateValues(target).x;

    //   if (translateX >= 0 && scroll > 0) 
    //   {
    //     // allows only positive scroll
    //     // target.style.transform += `translateX(${-scroll}px)`;
    //     gsap.set(target, {x: "+="+(-scroll)})
    //   }
    //   else if (translateX < 0 && Number(-translateX) <= scrollableWidth) {
    //     // allows scrolling in any direction
    //     // target.style.transform += `translateX(${-scroll}px)`;
    //     gsap.set(target, {x: "+="+(-scroll)})
    //   }
    //   else if (Number(-translateX) > scrollableWidth && scroll < 0) {
    //     // allows only negative scroll
    //     // target.style.transform += `translateX(${-scroll}px)`;
    //     gsap.set(target, {x: "+="+(-scroll)})
    //   }
    //   // console.log(typeof(Number(-translateX)))
    //   // console.log(-translateX, scrollableWidth)

    //   return 
    // }

    // window.addEventListener('wheel', (event) => {
    //   if (this.getTransitionalViewState() === 3) {
    //     scrollTransform(event.deltaX, event.deltaY, bottomBar);
    //   }
    // });
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

  // getTranslateValues (element: HTMLElement): any {
  //   const style = window.getComputedStyle(element)
  //   const matrix: any = style['transform'] || style.webkitTransform;

  //   // No transform property. Simply return 0 values.
  //   if (matrix === 'none' || typeof matrix === 'undefined') {
  //     return {
  //       x: 0,
  //       y: 0,
  //       z: 0
  //     }
  //   }

  //   // Can either be 2d or 3d transform
  //   const matrixType = matrix.includes('3d') ? '3d' : '2d'
  //   const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ')

  //   // 2d matrices have 6 values
  //   // Last 2 values are X and Y.
  //   // 2d matrices does not have Z value.
  //   if (matrixType === '2d') {
  //     return {
  //       x: matrixValues[4],
  //       y: matrixValues[5],
  //       z: 0
  //     }
  //   }

  //   // 3d matrices have 16 values
  //   // The 13th, 14th, and 15th values are X, Y, and Z
  //   if (matrixType === '3d') {
  //     return {
  //       x: matrixValues[12],
  //       y: matrixValues[13],
  //       z: matrixValues[14]
  //     }
  //   }
  // }
}
