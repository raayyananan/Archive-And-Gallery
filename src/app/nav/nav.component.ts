import { Component, OnInit, NgZone, AfterViewInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { gsap, Power2 } from 'gsap';
import { CustomEase } from 'gsap/all';
import { Observable, filter } from 'rxjs';
import { names } from '../collectionOrder';
import { ViewSwitcherService } from '../view-switcher.service';
import { LoaderService } from '../loader.service';
import { MobileService } from '../mobile.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  // the router will be used to find the url, navbar changes depending on what the url is 
  // no url shows standard navbar, /about and /collection show routerLink="/" navbar
  // open navigation section shows nav-open navbar
  // different navbars are shown through classes assigned to the navbar-container, with different translateY-values

  navStart: Observable<NavigationStart>
  menuState!: 'open' | 'closed'; 
  // menuClosed is initial state, menuOpen is menuOpen, routeOpen is when application has routed

  names = names;
  viewState: number = 1;
  detailView: boolean = false;
  mobile!: boolean;

  constructor(private router: Router, public viewSwitcherService: ViewSwitcherService, private ngZone: NgZone, private loaderService: LoaderService, private mobileService: MobileService) {
    // Create a new Observable that publishes only the NavigationStart event
    this.navStart = router.events.pipe(
      filter(evt => evt instanceof NavigationStart)
    ) as Observable<NavigationStart>;

    if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/Blackberry/i) || navigator.userAgent.match(/WebOs/i)) {
      this.mobile = true;
    } else {
      this.mobile = false;
    }
  }

  ngOnInit(): void {
    this.navStart.subscribe((event) => {
      if (event.url == '/' || event.url == '') {
        this.routeMenu('close')
        if (this.mobile) {
          this.navigateHome()
        }
        else {
          this.viewSwitcherService.switchView(this.viewSwitcherService.getImageViewState());
        }
        this.detailView = false;
      } 
      else if (event.url.includes('collection') || event.url.includes('about')) {
        this.routeMenu('open')
        if (this.mobile) {
          this.mobileService.mobileRoute('out')
        }
        else {
          this.viewSwitcherService.route();
        }
        this.detailView = true;
      }
    })

    gsap.registerPlugin(CustomEase);
    CustomEase.create("cubic", "0.180, 0.480, 0.115, 1.000");

    setTimeout(() => {
      gsap.to('.loader .column-text-inner', {
        duration: 1,
        y: 0,
        ease: "expo.out"
      })
    }, 500)

    this.loaderService.loaded.subscribe(value => {
      this.removeLoader()
    })

    // if (this.loaderService.loadedStatus == true) {
    //   setTimeout(() => {
    //     this.initialAnimations(0.2);
    //   })
    // }

    this.menuState = 'closed';

    // document.addEventListener('keydown', (e) => {
    //   if (e.code == 'Digit1') {this.switchView(1)}
    //   else if (e.code == 'Digit2') {this.switchView(2)}
    //   else if (e.code == 'Digit3') {this.switchView(3)}
    // })
  }

  ngAfterViewInit() {
    // const divs = (document.querySelectorAll(".aboutheading h1 div, .aboutheading h2, .bio div, .collections li, .tools li, .contact li") as NodeListOf<HTMLElement>);
    // divs.forEach((div) => {spanify(div)})
    // function spanify(element: HTMLElement): void {
    //   const words = element.outerText.split(" ");
    //   const wordsDiv = element
  
    //   wordsDiv.innerHTML = ""
    //   words.map((el) => {
    //     wordsDiv.innerHTML += `<div class="column-text-outer" style="display: inline-block"><div class="column-text-inner">${el}</div></div> `
    //   })
    //   return
    // }
  }

  abtl = gsap.timeline();
  duration = 0.6;

  removeLoader() {
    const tl = gsap.timeline()
    tl.to('#loader', {
      duration: 0.75,
      opacity: 0,
    })
    tl.to('#loader', {
      duration: 1.4,
      height: 0,
      ease: "expo.inOut",
      display: 'none',
    }, "<")
    tl.from('.transition', {
      duration: 1.4,
      stagger: -0.09,
      ease: 'expo.inOut',
      height: '100%',
      display: 'none'
    }, "<")
    let nav;
    if (!this.detailView) {
      nav = '.nav .inner-link'
    } else {
      nav = '.about-nav'
    }
    tl.from(nav, {
      duration: 0.9, // 1.4
      delay: 0.7,
      ease: 'expo.out',
      y: -45,
      // stagger: 0.07 // this property is generally enabled
    }, "<+=0.5")
  }

  routeMenu(menuAction: 'open' | 'close', openMenu?: boolean): void {
    if (menuAction == 'open') {
      this.abtl.clear();
      this.abtl.play();
      // this.abtl.set('.nav-area .column-text-inner', {
      //     y: 0,
      // })
      // this.abtl.set('.image-container img', {opacity: 1})
      this.abtl.to('.nav .inner-link', {
          duration: this.duration*1.25,
          y: -45,
          ease: "expo.out",
          // stagger: 0.035
          delay: 0.08,
      }, "<")
      this.abtl.to('.about-nav .inner-link', {
          duration: this.duration*1.25,
          y: -45,
          ease: "expo.out",
          // stagger: 0.035,
          // delay: 0.035
      }, "<")

      if (openMenu && (this.viewSwitcherService.getLinkState() == 'available' || this.viewSwitcherService.getTransitionalViewState() != 4)) { //&& this.viewSwitcherService.getLinkState() == 'available'
        // open menu
        this.menuState = 'open';
        this.abtl.set('.nav-area', {display: 'grid'}, "<");
        this.abtl.set('.column .center .i', {y: '101%'}, "<")
        this.abtl.to('.nav-area', {
          duration: 0.4,
          opacity: 1,
        }, "<") 
        this.abtl.fromTo('.nav-area .column', {
          opacity: 0,
        }, {
          opacity: 1,
          duration: 0.8,
        }, "<+=0.3")  
        this.abtl.to('.column .center .i', {
          y: 0,
          duration: 1.3,
          ease: "expo.out"
        }, "<+=0.5")
        // this.abtl.from('.nav-area .aboutheading .column-text-inner', {
        //   duration: this.duration + 0.4,
        //   y: '101%',
        //   stagger: 0.045,
        //   ease: "cubic",
        // }, "<+=0.1")
        // this.abtl.to('.nav-area .image img', {
        //   duration: this.duration,
        //   opacity: 1,
        // }, "<+=0.35") 
        // this.abtl.from('.nav-area .text-container .column-text-inner', {
        //   duration: this.duration + 0.4,
        //   y: '101%',
        //   stagger: 0.008,
        //   ease: "cubic",
        // }, "<+=0.1")    
      }
    }
    else if (menuAction == 'close') {
      // (document.querySelector('.image-container img') as HTMLElement).classList.add('faded');
      this.abtl.clear();
      this.abtl.play();
      this.abtl.to('.about-nav .inner-link', {
        duration: this.duration*1.25,
        y: 0,
        ease: "power3.out",
        // stagger: 0.035,
      }, '<')
      this.abtl.to('.nav .inner-link', {
        duration: this.duration*1.25,
        y: 0,
        ease: "power3.out",
        // stagger: 0.035,
        // delay: 0.035,
      }, '<')
  
      if (this.menuState == 'open') {
        // close menu
        // this.abtl.to('.nav-area .column-text-inner', {
        //   duration: this.duration + 0.3,
        //   y: "101%",
        //   ease: "cubic",
        //   delay: 0.1
        // }, "<")
        // this.abtl.to('.nav-area .image img', {
        //   duration: this.duration*0.5,
        //   opacity: 0,
        // }, "<")   
  
        this.abtl.to('.nav-area .column', {
          opacity: 0,
          duration: 0.3
        }, "<")
        this.abtl.to('.nav-area', {
          duration: this.duration-0.2,
          opacity: 0,
          display: 'none'
        }, "<+=0.25")
  
        this.abtl.set('.nav-area', {});
        // this.abtl.set('.nav-area .column-text-inner', {y: 0});
        this.menuState = 'closed';
      }
    }
  }

  switchView(viewNumber: number): void {
    this.viewSwitcherService.switchView(viewNumber);
    // this.viewSwitcherService.setViewState(viewNumber); // not needed for now as viewState is checked within switchView()
    // viewState MUST be set after calling switchView() as switchView() checks for viewState before running
  }

  navigateHome() {
    let path: string;
    if (!this.mobile) { // detect mobile browser
      path = '';
      this.router.navigate([path])
      const state = this.viewSwitcherService.getImageViewState();
      this.viewSwitcherService.switchView(state);
    }
    if (this.mobile) {
      path = '';
      if (this.detailView) {
        gsap.to('.detail-view-images img', {
          duration: 0.2,
          opacity: 0,
          // y: -15,
          onComplete: () => { this.ngZone.run(() => {
            this.router.navigate([path])
            this.mobileService.mobileRoute('in')
          }) }
        })
      }
    }
  }
  
  

}
