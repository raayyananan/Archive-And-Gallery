import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { gsap, Power2 } from 'gsap';
import { Observable, filter } from 'rxjs';
import { names } from '../collectionOrder'

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

  constructor(private router: Router) {
    // Create a new Observable that publishes only the NavigationStart event
    this.navStart = router.events.pipe(
      filter(evt => evt instanceof NavigationStart)
    ) as Observable<NavigationStart>;
  }

  ngOnInit(): void {
    this.navStart.subscribe((event) => {
      console.log(event.url)
      if (event.url == '/') {
        this.closeRouteMenu()
      } 
      else if (event.url.includes('collection') || event.url.includes('about')) {
        this.openRouteMenu()
      }
    })

    this.menuState = 'closed';
  }

  abtl = gsap.timeline();
  duration = 0.7;

  openRouteMenu(openMenu?: boolean): void {


    this.abtl.clear();
    this.abtl.play();
    this.abtl.set('.column-text-inner', {
        y: 0,
    })
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
      
      this.abtl.from('.column-text-inner', {
          duration: this.duration + 0.5,
          y: '3rem',
          stagger: 0.03,
          ease: "power3.out",
      }, "<+=0")
    }
  }

  closeRouteMenu(): void {
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
      this.abtl.to('.column-text-inner', {
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
      this.abtl.set('.column-text-inner', {y: 0});
      this.menuState = 'closed';
    }
  }

  

}
