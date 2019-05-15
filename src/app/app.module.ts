import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ConferencesComponent } from './components/conferences/conferences.component';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { TalksComponent } from './components/talks/talks.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoggedinComponent } from './components/loggedin/loggedin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlyerComponent } from './flyer/flyer.component';

// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

@NgModule({
  declarations: [
    AppComponent,
    ConferencesComponent,
    MenuComponent,
    FooterComponent,
    TalksComponent,
    WelcomeComponent,
    LoggedinComponent,
    FlyerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.serviceWorkerEnabled }),
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
