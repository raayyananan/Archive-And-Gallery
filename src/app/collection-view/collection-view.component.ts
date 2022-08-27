import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, ViewChildren, QueryList, NgZone } from '@angular/core';
import { collectionOrder, names, URLify, thumbnailNumbers } from '../collectionOrder';
import { gsap } from 'gsap';
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

  constructor(private router: Router, private ngZone: NgZone, private viewSwitcherService: ViewSwitcherService, private loaderService: LoaderService) { }

  ngOnInit(): void {
  }

  @ViewChild('rightHeading') rightHeading!: ElementRef;
  @ViewChild('leftHeading') leftHeading!: ElementRef; // ViewChild selects #heading to be used in component template
  // because you are using an ElementRef which needs to be loaded from the template and can't be defined in the constructor, 
  // Typescript thinks heading is undefined - use ! to tell typescript that you are sure heading is not null or undefined
  @ViewChildren('images') images!: QueryList<any>;

  ngAfterViewInit(): void {
    this.loaderService.loaded.subscribe(value => {
      this.initialAnimations();
    })

    if (this.loaderService.loadedStatus == true) {
      this.initialAnimations();
    }

    let totalScrolled = 0;
    function transformScroll(event: any, target: HTMLElement): void {
      // have element width, total scrolled amount that adds or subtracts when scrolled
      // is total scrolled is less than zero or greater than element width, then no scroll applied

      let scroll = (event.deltaX + event.deltaY) * 0.45,
      scrollableWidth = target.scrollWidth - target.clientWidth;

      if (totalScrolled > 0 && totalScrolled <= scrollableWidth) 
      {
        target.style.transform += `translateX(${-scroll}px)`;
        totalScrolled += scroll;
        // console.log(`Scrolled ${scroll}px, Total scroll is ${totalScrolled}`)
      } 
      else if (totalScrolled <= 0 && scroll > 0) 
      {
        target.style.transform += `translateX(${-scroll}px)`;
        totalScrolled += scroll;
      }
      else if (totalScrolled > scrollableWidth && scroll < 0) {
        target.style.transform += `translateX(${-scroll}px)`;
        totalScrolled += scroll;
      }

      return 
    }
    const bottomBar = document.querySelector('.bottom-bar') as HTMLElement
    window.addEventListener('wheel', (event) => {
      if (this.viewSwitcherService.getTransitionalViewState() === 3) {
        transformScroll(event, bottomBar)
      }
    });
  }

  parseInt(data: any) {
    return parseInt(data);
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

  initialAnimations(): void {
    let itl = gsap.timeline(); // initial animations timeline
    let headingHeight = this.rightHeading.nativeElement.clientHeight;  
    
    this.viewSwitcherService.setLinkState('frozen');
    this.viewSwitcherService.setViewState(1);

    itl.set('.collection', {opacity: 1})
    itl.set('.heading', {opacity: 1})
    itl.from('.collection img', {
      duration: 1.75,
      stagger: {
          from: 0,
          amount: 1  // 1.7
      }, 
      delay: 0,
      ease: "power4.out",

      y: window.innerHeight + 10,
      opacity: -0.2,
    })

        // heading animation
      itl.from('.heading .left', {
          duration: 0.9,
          y: -headingHeight - 0,
          ease: "power3.out"
      }, "<+=2")
      itl.from('.heading .right', {
          duration: 0.9,
          y: +headingHeight + 0,
          ease: "power3.out",
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
              duration: 0.7,
              y: +headingHeight + 0,
              ease: "power2.out",
          })
      htl.to('.heading .right',
          {
              duration: 0.7,
              y: -headingHeight - 0,
              ease: "power2.out",
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
              ease: "power2.out",
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
              ease: "power2.out",
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
      y: '-1.5rem',
      stagger: -0.015,
      ease: "power2.out",
    })
    v2n.to('.collection img', {
      duration: 0.07,
      stagger: -0.07,
      opacity: 0,
      onComplete: () => this.ngZone.run(() => {
        this.router.navigate(['collection', url])
      })
    }, '<')
  }

  topImage(i: number, reset?: boolean) {
    this.viewSwitcherService.topImage(i, reset);
  }
}
