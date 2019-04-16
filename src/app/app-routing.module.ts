import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConferenceComponent } from './components/conferences/conferences.component';

const routes: Routes = [
  // {path: '', component: ConferenceComponent},
  {path: 'conferences', component: ConferenceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
