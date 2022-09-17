import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Observable, filter } from 'rxjs';
import { collections, Collection } from './collectionOrder';


@Injectable({
  providedIn: 'root'
})
export class DetailService {

  navStart: Observable<NavigationStart>
  urlname?: string | null;
  collection?: Collection;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.navStart = router.events.pipe(
      filter(evt => evt instanceof NavigationStart)
    ) as Observable<NavigationStart>;

    this.navStart.subscribe((event) => {
      if (event.url.includes('collection')) {
        this.urlname = this.activatedRoute.snapshot.paramMap.get('name');
        this.collection = collections.find(imageCollection => imageCollection.url == this.urlname);
      }
    })
  }

  
}
