import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConferencesComponent } from './components/conferences/conferences.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoggedinComponent } from './components/loggedin/loggedin.component';
import { FlyerComponent } from './components/flyer/flyer.component';
import { TopicsComponent } from './components/topics/topics.component';
import { TalksComponent } from './components/talks/talks.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'conferences', component: ConferencesComponent},
  {path: 'flyer/:conferenceId', component: FlyerComponent},
  {path: 'topics', component: TopicsComponent},
  {path: 'topics/:yearAndMonth', component: TopicsComponent},
  {path: 'topic/:yearAndMonth/:topic', component: TalksComponent},
  {path: 'loggedin', component: LoggedinComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
