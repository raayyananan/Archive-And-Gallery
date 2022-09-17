import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Observable, filter } from 'rxjs';
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
  // navStart: Observable<NavigationStart>;

  @ViewChild('detailViewSection') detailViewSection!: ElementRef;
  dtl = gsap.timeline()

  constructor(private activatedRoute: ActivatedRoute, private loaderService: LoaderService, private router: Router) {
    // // Create a new Observable that publishes only the NavigationStart event
    // this.navStart = router.events.pipe(
    //   filter(evt => evt instanceof NavigationStart)
    // ) as Observable<NavigationStart>;

    // // get images and load them
    // this.getImages(); // generally its not recommended to put initialization logic in the constructor for optimization purposes
  }

  initialize(name: string) {
    const collection = collections.find(imageCollection => imageCollection.url == name);
    this.detailViewSection.nativeElement.innerHTML = '';
    const images = document.querySelectorAll('.detail-view-images img') as NodeListOf<HTMLElement>
    collection?.sources.forEach((src) => {
      if (images.length !== 0) {
        this.dtl.to('.detail-view-images img', {
          duration: 0,
          ease: "sine.in",
          // x: -30,
          onComplete: () => {
            this.detailViewSection.nativeElement.innerHTML += `<div style="height: 100%;display: flex;flex-flow: column nowrap;justify-content: center;"><img src="${src}" style="padding: 10px;box-sizing: border-box;height: 80%;display: inline-block; opacity: 1;"></div>`;
          }
        })
      }
      else {
        this.detailViewSection.nativeElement.innerHTML += `<div style="height: 100%;display: flex;flex-flow: column nowrap;justify-content: center;"><img src="${src}" style="padding: 10px;box-sizing: border-box;height: 80%;display: inline-block; opacity: 1;"></div>`;
      }
      this.loadImages();
    })
  }


  ngAfterViewInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.initialize(params["name"]);
    })

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

  loadImages(): void {
    const images = document.querySelectorAll('.detail-view-images img');
    let loaded: number = 0;
    images.forEach(image => {
      image.addEventListener('load', () => {
        loaded += 1;
        if (loaded > 2) {
          this.dtl.from(images, {
            duration: 1.5,
            x: -30,
            opacity: -0.1,
            ease: "expo.out",
            stagger: 0.1,
            delay: 0.3
          })
        }
      })
    })
  }

}
