import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { gsap, Power2 } from 'gsap';
import { CustomEase } from 'gsap/all';
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

  gridState: 1 | 2 | 3 = 1;

  names = names;
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
      gsap.registerPlugin(CustomEase);
      CustomEase.create("cubic", "0.180, 0.480, 0.115, 1.000");
    })

    this.menuState = 'closed';

    document.addEventListener('keydown', (e) => {
      if (e.code == 'Digit1') {this.switchView(1)}
      else if (e.code == 'Digit2') {this.switchView(2)}
      else if (e.code == 'Digit3') {this.switchView(3)}
    })
  }

  abtl = gsap.timeline();
  duration = 0.6;

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
          ease: "cubic"
      }, "<")
      this.abtl.to('.about-nav', {
          duration: this.duration,
          y: -40,
          ease: "cubic"
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
            duration: this.duration + 0.4,
            y: '101%',
            stagger: 0.02,
            ease: "cubic",
        }, "<+=0")
      }
    }
    else if (menuAction == 'close') {
      // (document.querySelector('.image-container img') as HTMLElement).classList.add('faded');
      this.abtl.clear();
      this.abtl.play();
      this.abtl.to('.nav', {
        duration: this.duration,
        y: 0,
        ease: "cubic"
      }, '<')
      this.abtl.to('.about-nav', {
        duration: this.duration,
        y: 0,
        ease: "cubic"
      }, '<')
  
      if (this.menuState == 'open') {
        // close menu
        this.abtl.to('app-nav .column-text-inner', {
          duration: this.duration + 0.3,
          y: "101%",
          ease: "cubic",
        }, "<")
  
        this.abtl.to('.nav-area', {
          duration: this.duration-0.2,
          opacity: 0
        }, "<+=0.25")
        this.abtl.to('.about-nav a', {
          duration: this.duration-0.2,
          color: 'black',
        }, '<+=0.25')
  
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
      // grid.classList.remove('border');
    }
    return
  }
  
  

}
