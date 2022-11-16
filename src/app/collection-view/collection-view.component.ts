import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, ViewChildren, QueryList, NgZone } from '@angular/core';
import { collectionOrder, names, URLify, thumbnailNumbers } from '../collectionOrder';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/all';
import { Router } from '@angular/router';
import { ViewSwitcherService } from '../view-switcher.service';
import { LoaderService } from '../loader.service';


@Component({
  selector: 'app-collection-view',
  templateUrl: './collection-view.component.html',
  styleUrls: ['./collection-view.component.scss']
})

// possibly change OnInit to AfterViewInit later
// this will prevent headingtimeline 'htl' from activating from initialtimeline 'itl'
// changing to AfterViewInit might prevent loader from working correctly
export class CollectionViewComponent implements OnInit {

  collection = collectionOrder;
  URLify = URLify;
  names = names;
  currentTitle: string = 'Archive & Gallery';

  constructor(private router: Router, private ngZone: NgZone, public viewSwitcherService: ViewSwitcherService, private loaderService: LoaderService) { }

  ngOnInit(): void {
  }

  @ViewChild('rightHeading') rightHeading!: ElementRef;
  @ViewChild('leftHeading') leftHeading!: ElementRef; // ViewChild selects #heading to be used in component template
  // because you are using an ElementRef which needs to be loaded from the template and can't be defined in the constructor, 
  // Typescript thinks heading is undefined - use ! to tell typescript that you are sure heading is not null or undefined
  @ViewChildren('images') images!: QueryList<any>;


  ngAfterViewInit(): void {
    this.widthHeightCheck();

    gsap.registerPlugin(CustomEase);
    CustomEase.create("cubic", "0.180, 0.480, 0.115, 1.000")

    this.loaderService.loaded.subscribe(value => {
      setTimeout(() => {this.initialAnimations(0.85);})
    })

    if (this.loaderService.loadedStatus == true) {
      setTimeout(() => {
        this.initialAnimations(0.2);
      })
    }

    this.viewSwitcherService.initializeScrollTransform();

    window.addEventListener('resize', this.widthHeightCheck)
  }
  
  parseInt(data: any) {
    return parseInt(data);
  }

  // onPan(e: any, direction: 'forwards' | 'backwards') {
  //   if (this.viewSwitcherService.getTransitionalViewState() == 3) {
  //     if (direction == 'forwards') {
  //       this.viewSwitcherService.buttonMoveX('forwards');
  //     }
  //     else if (direction == 'backwards') {
  //       this.viewSwitcherService.buttonMoveX('backwards');
  //     }
  //   }
  // }

  navigate(url: string,  number: number) {
      this.viewSwitcherService.route(url, number)
  }

  initialAnimations(delay: number): void {
    let itl = gsap.timeline(); // initial animations timeline
    let headingHeight = this.rightHeading.nativeElement.clientHeight;  
    
    this.viewSwitcherService.setLinkState('frozen');
    this.viewSwitcherService.setViewState(1);

    this.viewSwitcherService.toggleGrid();
    itl.set('.collection', {opacity: 1})
    itl.set('.heading', {opacity: 1})
    itl.from('.collection img', {
      duration: 1.25,
      stagger: {
          from: 0,
          amount: 1 // 1.7
      }, 
      ease: "expo.out",

      y: window.innerHeight + 10,
      opacity: -0.2,
    }, delay)

        // heading animation
      itl.from('.heading .left', {
          duration: 0.9,
          y: -headingHeight - 0,
          ease: "cubic"
      }, "<+=1.5")
      itl.from('.heading .right', {
          duration: 0.9,
          y: +headingHeight + 0,
          ease: "cubic",
          onComplete: () => {
            this.viewSwitcherService.setLinkState('available');
            this.viewSwitcherService.initialAnimationsComplete = true;
            this.ngZone.run(() => {
              this.viewSwitcherService.switchOnce();
            })
          }
      }, "<")
    
  }

  changeHeading(direction: 'in' | 'out', name?: string): void {
    const permanentTitle = 'Archive & Gallery';

    if (this.viewSwitcherService.getViewState() == 1 && this.viewSwitcherService.getLinkState() == 'available') { //&& this.viewSwitcherService.getLinkState() == 'available'
      let htl = gsap.timeline();
      let headingHeight = this.rightHeading.nativeElement.clientHeight
      // let headingHeight = (document.querySelector('.heading h1') as HTMLElement).clientHeight
      
  
      htl.to('.heading .left',
          {
              duration: 0.35,
              y: +headingHeight + 0,
              ease: "sine.out",
          })
      htl.to('.heading .right',
          {
              duration: 0.35,
              y: -headingHeight - 0,
              ease: "sine.out",
          },
          "<")
      
      
      htl.set('.heading .left',
          {
              y: -headingHeight - 0,
          })
      htl.set('.heading .right', {
              y: +headingHeight + 0,
          })
      
      htl.to('.heading .left',
          {
              duration: 0.7,
              y: '-0.7rem',
              ease: "cubic",
              onStart: () => {
                if (direction === 'in') {
                  this.leftHeading.nativeElement.innerHTML = name;
                }
                else {
                  this.leftHeading.nativeElement.innerHTML = permanentTitle;
                }
            }
          })
      htl.to('.heading .right',
          {
              duration: 0.7,
              y: '0.7rem', 
              ease: "cubic",
              onStart: () => {
                if (direction === 'in') {
                  this.rightHeading.nativeElement.innerHTML = name;
                }
                else {
                  this.rightHeading.nativeElement.innerHTML = permanentTitle;
                }
            }
          },"<")
    }
  }

  view02Navigate(url: string) {
    this.viewSwitcherService.route(url)
  }

  topImage(i: number, reset?: boolean) {
    this.viewSwitcherService.topImage(i, reset);
  }

  widthHeightCheck() {
    const rotate = document.querySelector('.please-rotate') as HTMLElement;
    if (window.innerHeight > window.innerWidth || window.innerWidth < 650) {
      rotate.style.display = 'flex';
    }
    else {
      if (rotate.style.display == 'flex') {
        rotate.style.display = 'none';
      }
    }
  }
}
