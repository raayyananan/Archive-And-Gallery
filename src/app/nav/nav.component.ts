import { Component, OnInit } from '@angular/core';
import { gsap, Power2 } from 'gsap';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  abtl = gsap.timeline();
  duration = 0.7;

  openMenu(): void {
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
  }

  closeMenu(): void {
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
  }

}
