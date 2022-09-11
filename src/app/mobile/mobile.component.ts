import { Component, ElementRef, AfterViewInit, ViewChild, NgZone } from '@angular/core';
import { imageList } from '../collectionOrder';
import { LoaderService } from '../loader.service';
import { Router } from '@angular/router';
import {gsap} from 'gsap';

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


  constructor(private loaderService: LoaderService, private router: Router, private ngZone: NgZone) { }

  ngAfterViewInit(): void {
    this.loaderService.loaded.subscribe(value => {
      setTimeout(() => {this.initialAnimations();}, 200)
    })

    if (this.loaderService.loadedStatus == true) {
      setTimeout(() => {
        this.initialAnimations();
      }, 75)
    }

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

  initialAnimations(): void {
    const itl = gsap.timeline()
    itl.to('.image-list img', {
      duration: 1.35,
      stagger: 0.07,
      ease: "expo.out",
      opacity: 1,
      y: 0
    });
    itl.to('.line', {
      duration: 1.5,
      ease: 'expo.in',
      height: '100%'
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

  navigate(src: string | undefined, id: number): void {
    const nl = gsap.timeline();
    console.log(src, id)
    nl.to('.line', {
      duration: 0.2,
      opacity: 0
    })
    nl.to('.image-list img', {
      duration: 0.5,
      ease: 'power2.in',
      stagger: {
        each: 0.025,
        from: id-1
      },
      y: 80,
      opacity: 0,
      onComplete: () => {
        this.ngZone.run(() => {
          this.router.navigate(['collection', src])
        })
      }
    }, "<")
    nl.to(this.heading.nativeElement, {
      duration: 0.4,
      display: 'none',
      y: '-100%'
    }, "<+=0.1")
  }
}
