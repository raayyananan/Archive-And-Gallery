import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionViewComponent } from './collection-view/collection-view.component';
import { DetailViewComponent } from './detail-view/detail-view.component';
import { EmptyComponent } from './empty/empty.component';
import { MobileComponent } from './mobile/mobile.component';

const routes: Routes = [
  {path: '', component: EmptyComponent, data: { animation: 'homePage' }},
  {path: 'collection/:name', component: DetailViewComponent, data: { animation: 'detailPage' }},
  {path: 'collection/movile', component: MobileComponent, data: { animation: 'detailPage' }},
  {path: 'mobile', component: MobileComponent, data: {animation: 'mobilePage'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
