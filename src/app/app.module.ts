import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ConferenceComponent } from './components/conferences/conferences.component';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
@NgModule({
  declarations: [
    AppComponent,
    ConferenceComponent,
    MenuComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.serviceWorkerEnabled })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
