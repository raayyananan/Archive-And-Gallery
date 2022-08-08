import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, ViewChildren, QueryList, NgZone } from '@angular/core';
import { collectionOrder, names, URLify } from '../collectionOrder';
import { gsap } from 'gsap';
import { Router } from '@angular/router';
import { ViewSwitcherService } from '../view-switcher.service';

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

  constructor(private router: Router, private ngZone: NgZone, private viewSwitcherService: ViewSwitcherService) { }

  ngOnInit(): void {
    
  }

  @ViewChild('rightHeading') rightHeading!: ElementRef;
  @ViewChild('leftHeading') leftHeading!: ElementRef; // ViewChild selects #heading to be used in component template
  // because you are using an ElementRef which needs to be loaded from the template and can't be defined in the constructor, 
  // Typescript thinks heading is undefined - use ! to tell typescript that you are sure heading is not null or undefined
  @ViewChildren('images') images!: QueryList<any>;

  ngAfterViewInit(): void {
    setTimeout(() => {this.initialAnimations()}, 200)
  }

  navigate(url: string, id: number) {
    // first make all images disappear, then navigate to route
    let imagesBelow: HTMLElement[] = [], imagesAbove: HTMLElement[] = []
    this.images.forEach(image => {
      if (image.nativeElement.firstChild.dataset != undefined) {
        if (image.nativeElement.firstChild.dataset.srno > id) {imagesBelow.push(image.nativeElement)}
        else if (image.nativeElement.firstChild.dataset.srno <= id) {imagesAbove.push(image.nativeElement)}
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

  initialAnimations(): void {
    let itl = gsap.timeline(); // initial animations timeline
    let headingHeight = this.rightHeading.nativeElement.clientHeight;  
    
    this.viewSwitcherService.setLinkState('frozen');

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

  view02Navigate(url: string) {
    let v2n = gsap.timeline();
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
}
