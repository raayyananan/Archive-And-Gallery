import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HammerModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { CollectionViewComponent } from './collection-view/collection-view.component';
import { DetailViewComponent } from './detail-view/detail-view.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    CollectionViewComponent,
    DetailViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HammerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
