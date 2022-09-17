import { Component, OnInit, AfterViewInit } from '@angular/core';
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

  constructor(private activatedRoute: ActivatedRoute, private loaderService: LoaderService, private router: Router) {
    // Create a new Observable that publishes only the NavigationStart event
    // this.navStart = router.events.pipe(
    //   filter(evt => evt instanceof NavigationStart)
    // ) as Observable<NavigationStart>;
    this.getImages(); // generally its not recommended to put initialization logic in the constructor for optimization purposes
  }

  getImages(): void {
    const urlname = this.activatedRoute.snapshot.paramMap.get('name');
    const collection = collections.find(imageCollection => imageCollection.url == urlname);
    this.collection = collection as Collection;
  }

  // ngOnInit(): void {
  //   this.navStart.subscribe((event) => {
  //     if (event.url == '/') {
  //       // pass
  //     } 
  //     else if (event.url.includes('collection')) {
  //       this.getImages()
  //     }
  //   })
  // }

  ngAfterViewInit(): void {
    this.loadImages()

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
    const images = document.querySelectorAll('.images img');
    // images.forEach(image => {
    //   image.addEventListener('load', () => {
    //     gsap.to(image, {
    //       duration: 0.75,
    //       x: 0,
    //       opacity: 1,
    //       delay: 0.3
    //     })
    //   })
    // })
    let loaded: number = 0;
    images.forEach(image => {
      image.addEventListener('load', () => {
        loaded += 1;
        if (loaded > 2) {
          gsap.to(images, {
            duration: 1.5,
            x: 0,
            opacity: 1,
            ease: "expo.out",
            stagger: 0.1,
            delay: 0.1
          })
        }
      })
    })
  }

}
