import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConferencesComponent } from './components/conferences/conferences.component';
import { TalksComponent } from './components/talks/talks.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoggedinComponent } from './components/loggedin/loggedin.component';
import { FlyerComponent } from './components/flyer/flyer.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'conferences', component: ConferencesComponent},
  {path: 'talks', component: TalksComponent},
  {path: 'loggedin', component: LoggedinComponent},
  {path: 'flyer/:conferenceId', component: FlyerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
