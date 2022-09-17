import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { collections, Collection } from '../collectionOrder';
import { gsap } from 'gsap';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss']
})
export class DetailViewComponent implements AfterViewInit {

  collection!: Collection;

  @ViewChild('detailViewSection') detailViewSection!: ElementRef;

  constructor(private activatedRoute: ActivatedRoute, private loaderService: LoaderService, private router: Router) {
    // // Create a new Observable that publishes only the NavigationStart event
    // this.navStart = router.events.pipe(
    //   filter(evt => evt instanceof NavigationStart)
    // ) as Observable<NavigationStart>;

    this.activatedRoute.params.subscribe((params) => {
      this.initialize(params["name"]);
    })
  }

  ngAfterViewInit(): void {

    const imagesSection = document.querySelector('section.images') as HTMLElement;
    imagesSection.focus();

    function transformScroll(event: any) {
      if (window.innerWidth <= 650) {
        return
      }
      if (!event.deltaY) {
        return;
      }
    
      event.currentTarget.scrollLeft += event.deltaY + event.deltaX;
      event.preventDefault();
    }
    imagesSection.addEventListener('wheel', transformScroll);

  }

  initializationCount = 0;
  initialize(name: string | null) {
    this.initializationCount += 1;
    const tl = gsap.timeline();
    const collection = collections.find(imageCollection => imageCollection.url == name);
    // let images = document.querySelectorAll('.detail-view-images img') as NodeListOf<HTMLElement>;

    if (this.initializationCount == 1) {
      this.collection = collection!;
      setTimeout(() => {    
        tl.to('.detail-view-images img', {
          duration: 0.75,
          x: 0,
          opacity: 1,
          ease: "power3.out",
          stagger: 0.05,
        })
      }, 250);
    }
    else {
      tl.to('.detail-view-images img', {
        duration: 0.4,
        x: -30,
        opacity: 0,
        ease: "sine.in",
        onComplete: () => {
          this.collection = collection!;
          setTimeout(() => {    
            tl.to('.detail-view-images img', {
              duration: 0.75,
              x: 0,
              opacity: 1,
              ease: "power3.out",
              stagger: 0.05,
            })
          }, 150);
        }
      })
    }
  }
}
