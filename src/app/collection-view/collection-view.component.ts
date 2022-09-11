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

  totalScrolled = 0;

  ngAfterViewInit(): void {
    this.widthHeightCheck();

    gsap.registerPlugin(CustomEase);
    CustomEase.create("cubic", "0.180, 0.480, 0.115, 1.000")

    this.loaderService.loaded.subscribe(value => {
      setTimeout(() => {this.initialAnimations(0.9);})
    })

    if (this.loaderService.loadedStatus == true) {
      setTimeout(() => {
        this.initialAnimations(0.2);
      })
    }

    this.viewSwitcherService.initializeScrollTransform();

    document.addEventListener("keydown", (e) => {
      if (this.viewSwitcherService.getTransitionalViewState() == 3) {
        if (e.code == 'ArrowRight') {
          this.viewSwitcherService.buttonMoveX('forwards', true);
        }
        else if (e.code == 'ArrowLeft') {
          this.viewSwitcherService.buttonMoveX('backwards', true);
        }
      }
    })

    window.addEventListener('resize', this.widthHeightCheck)
  }
  
  parseInt(data: any) {
    return parseInt(data);
  }

  onPan(e: any, direction: 'forwards' | 'backwards') {
    if (direction == 'forwards') {
      this.viewSwitcherService.buttonMoveX('forwards');
    }
    else if (direction == 'backwards') {
      this.viewSwitcherService.buttonMoveX('backwards');
    }
  }

  navigate(url: string, id: number, number: number) {
    if (this.viewSwitcherService.getViewState() === 1) {
          // first make all images disappear, then navigate to route
    const images = document.querySelectorAll('.collection .image-cell img') as NodeListOf<HTMLElement>;
    let imagesBelow: HTMLElement[] = [], imagesAbove: HTMLElement[] = []
    images.forEach(image => {
      if (image.dataset != undefined) {
        if (Number(image.dataset['srno']) > id) {imagesBelow.push(image)}
        else if (Number(image.dataset['srno']) <= id) {imagesAbove.push(image)}
      }
    })

    const cs = gsap.timeline()
    cs.to(imagesAbove, {
          duration: 0.9,
          stagger: {
              from: id,
              amount: 0.2125 // 1.7
          }, 
          delay: 0,
          ease: "power1.inOut",
          
          y: -window.innerHeight/1.4 - 10,
          opacity: -1,
          onComplete: function() {
              // tl.clear()
          }
      }) 
      cs.to(imagesBelow, {
          duration: 0.9,
          stagger: {
              from: id,
              amount: 0.2125 // 1.7
          }, 
          delay: 0,
          ease: "power1.inOut",
          
          y: window.innerHeight/1.4 + 10,
          opacity: -1,
          onComplete: function() {
              // tl.clear()
          }
      }, "<")
      
      // animate heading to disappear
      cs.to('.heading .left',
      {
        duration: 0.7,
        y: +this.rightHeading.nativeElement.clientHeight + 0,
        ease: "power2.out",
      }, "<")
      cs.to('.heading .right', // navigate at the end of this one 
      {
        duration: 0.7,
        y: -this.rightHeading.nativeElement.clientHeight - 0,
        ease: "power2.out",
        onComplete: () => this.ngZone.run(() => {
          this.router.navigate(['collection', url])
        })
      },
      "<")
      cs.to('.column-background', {duration: 0.35, opacity: 0}, "<+=0.35")
      cs.set('.heading .left, .heading .right', {opacity: 0, onComplete: () => {}})
      
      // now navigate to the given route
      // this.router.navigate(['collection', url])
    }
    else if (this.viewSwitcherService.getViewState() === 3) {
      const tl = gsap.timeline();
      const images = (document.querySelectorAll('.bottom-bar img') as NodeListOf<HTMLElement>);
      tl.to('.bottom-bar img', {
        duration: 0.5,
        ease: "power2.in",
        stagger: {
          each: 0.02,
          from: number
        },
        opacity: -0.1,
        y: '110%',
        delay: 0.04,
        onComplete: () => this.ngZone.run(() => {
          this.router.navigate(['collection', url])
        })
      })
    }
      
  }

  initialAnimations(delay: number): void {
    let itl = gsap.timeline(); // initial animations timeline
    let headingHeight = this.rightHeading.nativeElement.clientHeight;  
    
    this.viewSwitcherService.setLinkState('frozen');
    this.viewSwitcherService.setViewState(1);

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
          }
      }, "<")
    
  }

  changeHeading(direction: 'in' | 'out', name?: string): void {
    const permanentTitle = 'Archive & Gallery';

    if (this.viewSwitcherService.getViewState() == 1 && this.viewSwitcherService.getLinkState() == 'available') {
      let htl = gsap.timeline();
      let headingHeight = this.rightHeading.nativeElement.clientHeight
      // let headingHeight = (document.querySelector('.heading h1') as HTMLElement).clientHeight
      
  
      htl.to('.heading .left',
          {
              duration: 0.35,
              y: +headingHeight + 0,
              ease: "sine.in",
          })
      htl.to('.heading .right',
          {
              duration: 0.35,
              y: -headingHeight - 0,
              ease: "sine.in",
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
    let v2n = gsap.timeline();
    this.topImage(13, true); // make the last image come out on top and reset order of all images
    v2n.to('.column-text-inner', {
      duration: 1.1,
      y: '-100%',
      stagger: -0.015,
      ease: "power2.out",
    })
    v2n.to('.collection img', {
      duration: 0.07,
      stagger: -0.07,
      opacity: 0,
      display: 'none',
      onComplete: () => this.ngZone.run(() => {
        this.router.navigate(['collection', url])
      })
    }, '<')
  }

  topImage(i: number, reset?: boolean) {
    this.viewSwitcherService.topImage(i, reset);
  }

  widthHeightCheck() {
    const rotate = document.querySelector('.please-rotate') as HTMLElement;
    if (window.innerHeight > window.innerWidth) {
      rotate.style.display = 'flex';
    }
    else {
      if (rotate.style.display == 'flex') {
        rotate.style.display = 'none';
      }
    }
  }
}
