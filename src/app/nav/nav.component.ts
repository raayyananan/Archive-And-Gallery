import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { gsap, Power2 } from 'gsap';
import { Observable, filter } from 'rxjs';
import { names } from '../collectionOrder';
import { ViewSwitcherService } from '../view-switcher.service';

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
  greyscale: boolean = true;
  viewState: number = 1;

  constructor(private router: Router, public viewSwitcherService: ViewSwitcherService) {
    // Create a new Observable that publishes only the NavigationStart event
    this.navStart = router.events.pipe(
      filter(evt => evt instanceof NavigationStart)
    ) as Observable<NavigationStart>;
  }

  ngOnInit(): void {
    this.navStart.subscribe((event) => {
      if (event.url == '/') {
        this.routeMenu('close')
      } 
      else if (event.url.includes('collection') || event.url.includes('about')) {
        this.routeMenu('open')
      }
    })

    this.menuState = 'closed';
  }

  abtl = gsap.timeline();
  duration = 0.7;

  routeMenu(menuAction: 'open' | 'close', openMenu?: boolean): void {
    if (menuAction == 'open') {
        
      this.abtl.clear();
      this.abtl.play();
      this.abtl.set('app-nav .column-text-inner', {
          y: 0,
      })
      // this.abtl.set('.image-container img', {opacity: 1})
      this.abtl.to('.nav', {
          duration: this.duration,
          y: -40,
          ease: Power2.easeOut
      }, "<")
      this.abtl.to('.about-nav', {
          duration: this.duration,
          y: -40,
          ease: Power2.easeOut
      }, "<")

      if (openMenu) {
        // open menu
        this.menuState = 'open';
        this.abtl.set('.nav-area', {display: 'block'}, "<");
        this.abtl.to('.nav-area', {
          duration: this.duration,
          opacity: 1,
        }, "<")
        this.abtl.to('.about-nav a', {
          color: 'white',
          duration: this.duration
        }, '<')
        
        this.abtl.from('app-nav .column-text-inner', {
            duration: this.duration + 0.5,
            y: '3rem',
            stagger: 0.03,
            ease: "power3.out",
        }, "<+=0")
      }
    }
    else if (menuAction == 'close') {
      this.abtl.clear();
      this.abtl.play();
      this.abtl.to('.nav', {
        duration: this.duration,
        y: 0,
        ease: Power2.easeOut
      }, '<')
      this.abtl.to('.about-nav', {
        duration: this.duration,
        y: 0,
        ease: Power2.easeOut
      }, '<')
  
      if (this.menuState == 'open') {
        // close menu
        this.abtl.to('app-nav .column-text-inner', {
          duration: this.duration + 0.4,
          y: "3rem",
          ease: Power2.easeOut,
        }, "<")
  
        this.abtl.to('.nav-area', {
          duration: this.duration,
          opacity: 0
        }, "<")
        this.abtl.to('.about-nav a', {
          color: 'black',
          duration: this.duration
        }, '<')
  
        this.abtl.set('.nav-area', {display: 'none'});
        this.abtl.set('app-nav .column-text-inner', {y: 0});
        this.menuState = 'closed';
      }
    }
  }

  switchView(viewNumber: number): void {
    this.viewSwitcherService.switchView(viewNumber, this.viewState);
    // this.viewSwitcherService.setViewState(viewNumber); // not needed for now as viewState is checked within switchView()
    // viewState MUST be set after calling switchView() as switchView() checks for viewState before running
  }

  toggleGrayscale() {
    this.greyscale = !this.greyscale;

    if (this.greyscale) {
      document.querySelector('.collection')?.classList.add('grayscale')
    } else {document.querySelector('.collection')?.classList.remove('grayscale')}
  }
  

}
