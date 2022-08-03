import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { collection } from '../collectionOrder';
import { gsap } from 'gsap';

@Component({
  selector: 'app-collection-view',
  templateUrl: './collection-view.component.html',
  styleUrls: ['./collection-view.component.scss']
})
export class CollectionViewComponent implements OnInit {

  collection = collection;
  currentTitle: string = 'Archive & Gallery';

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild('rightHeading') rightHeading!: ElementRef;
  @ViewChild('leftHeading') leftHeading!: ElementRef; // ViewChild selects #heading to be used in component template
  // because you are using an ElementRef which needs to be loaded from the template and can't be defined in the constructor, 
  // Typescript thinks heading is undefined - use ! to tell typescript that you are sure heading is not null or undefined

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
            // ease: Power1.easeInOut
        })
    htl.to('.heading .right',
        {
            duration: 0.7,
            y: -headingHeight - 0,
            ease: "power2.out",
            // ease: Power1.easeInOut
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
