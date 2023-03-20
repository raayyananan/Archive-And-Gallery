import { Component, ElementRef, AfterViewInit, ViewChild, NgZone } from '@angular/core';
import { imageList } from '../collectionOrder';
import { LoaderService } from '../loader.service';
import { Router } from '@angular/router';
import {gsap, CustomEase} from 'gsap/all';
import { MobileService } from '../mobile.service';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.scss']
})
export class MobileComponent implements AfterViewInit {

  imageList = imageList;
  name = 'Archive & Gallery';

  @ViewChild('heading') heading!: ElementRef;
  @ViewChild('main') main!: ElementRef;

  previousImage: number = -1;
  currentImage: number = 0;
  i?: number;

  tl = gsap.timeline();


  constructor(private loaderService: LoaderService, private router: Router, private ngZone: NgZone, private mobileService: MobileService) { }

  ngAfterViewInit(): void {
    this.loaderService.loaded.subscribe(value => {
      setTimeout(() => {this.initialAnimations(0.9);})
    })

    if (this.loaderService.loadedStatus == true) {
      setTimeout(() => {
        this.initialAnimations(0.1);
      })
    }

    gsap.registerPlugin(CustomEase);
    CustomEase.create("cubic", "0.180, 0.480, 0.115, 1.000");

    let timer: any = null;
    this.main.nativeElement.addEventListener('scroll', () => {
        // console.log('asjkd')
        if(timer !== null) {
          clearTimeout(timer);        
        }
        timer = setTimeout(() => {
          const images = document.querySelectorAll('.image-list img') as NodeListOf<HTMLElement>
          let i = this.getCurrentSelection(this.main.nativeElement, images)
          this.animation(images, this.currentImage)
        }, 200);
    }, false);
  }

  initialAnimations(delay: number): void {
    const itl = gsap.timeline()
    itl.to('.image-list img', {
      duration: 1.35,
      stagger: 0.07,
      ease: "expo.out",
      opacity: 1,
      y: 0
    }, delay);
    itl.to('.line', {
      duration: 1.5,
      ease: 'expo.inOut',
      height: 32
    }, "<")
    itl.to('.horizontal-line', {
      duration: 1.5,
      ease: 'expo.inOut',
      width: 32
    }, "<")
    itl.to(this.heading.nativeElement, {
      duration: 0.9,
      ease: 'expo.out',
      y: 0
    }, "<+=0.35")
  }


  getCurrentSelection(scrollElement: HTMLElement, listOfElements: NodeListOf<HTMLElement>): any {
    let scrolled = scrollElement.scrollLeft;
    for (let i = 0; i < 16; i++) { // should be i < 8
      if (listOfElements[i+1].offsetLeft > scrolled + window.innerWidth/2) {
        this.currentImage = i;
        if (this.currentImage != this.previousImage) {
          // now animate
          this.i = i;
          return i
        }
        else {
          // do nothing 
        }
        break               
      }
    }
    return false
  }

  onScroll() {
    const images = document.querySelectorAll('.image-list img') as NodeListOf<HTMLElement>;
    if (this.getCurrentSelection(this.main.nativeElement, images) !== false) {
      let i = this.getCurrentSelection(this.main.nativeElement, images);
      this.previousImage = i;

      if (this.tl.isActive() == false) {
        this.animation(images, i)
      }
    }

    return
  }

  animation (images: NodeListOf<HTMLElement>, i: number) {
    let selectedImage = images[i], title = this.imageList[i].name;

    this.tl.to(this.heading.nativeElement, {
      duration: 0.3,
      ease: "power1.in",
      y: '-100%',
      onComplete: () => {
        this.heading.nativeElement.innerHTML = title;
      }
    })
    this.tl.set(this.heading.nativeElement, {y: '100%'})
    this.tl.to(this.heading.nativeElement, {
      duration: 0.6,
      ease: 'expo.out',
      y: 0,
      onStart: () => {
      }
    })
  }

  navigate(direction: 'in' | 'out', src: string | undefined, id: number): void {
    this.mobileService.mobileRoute(direction, src, id)
  }
}
