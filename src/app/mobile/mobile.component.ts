import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { mobileListOrder } from '../collectionOrder';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.scss']
})
export class MobileComponent implements OnInit {

  topList = mobileListOrder[0];
  bottomList = mobileListOrder[1];
  name = 'Fwabadooply';

  @ViewChild('heading') heading!: ElementRef;

  constructor(private loaderService: LoaderService) { }

  ngOnInit(): void {
  }

  nextHeadingEligible = false;
  onScroll() {
    const images = document.querySelectorAll('.image-list.top img') as NodeListOf<HTMLElement>,
    main = document.querySelector('#scroller') as HTMLElement;
    
    let scrolled = main.scrollLeft;
    for (let i = 0; i < 7; i++) {
      if (images[i].offsetLeft > scrolled) {
        let selectedImage = images[i], title = this.topList[i].name;
        this.heading.nativeElement.innerHTML = title;
        console.log(images[i].offsetLeft, scrolled);
        break    
           
      }
    }
  }

}
