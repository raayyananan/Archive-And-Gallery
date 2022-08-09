import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private activatedRoute: ActivatedRoute, private loaderService: LoaderService) {
    this.getImages(); // generally its not recommended to put initialization logic in the constructor for optimization purposes
  }

  getImages(): void {
    const urlname = this.activatedRoute.snapshot.paramMap.get('name');
    const collection = collections.find(imageCollection => imageCollection.url == urlname);
    this.collection = collection as Collection;
  }

  ngAfterViewInit(): void {
    this.loadImages()

    const imagesSection = document.querySelector('section.images') as HTMLElement;
    imagesSection.focus();

    function transformScroll(event: any) {
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
    images.forEach(image => {
      image.addEventListener('load', () => {
        gsap.to(image, {
          duration: 0.75,
          y: 0,
          x: 0,
          opacity: 1,
        })
      })
    })
  }

  loaded() {

  }
}
