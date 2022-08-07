import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionViewComponent } from './collection-view/collection-view.component';
import { DetailViewComponent } from './detail-view/detail-view.component';

const routes: Routes = [
  {path: '', component: CollectionViewComponent, data: { animation: 'homePage' }},
  {path: 'collection/:name', component: DetailViewComponent, data: { animation: 'detailPage' }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
