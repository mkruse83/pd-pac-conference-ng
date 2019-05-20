import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Conference } from '../entities/conference';
import { map, toArray, flatMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConferencesService {

  constructor(private http: HttpClient) { }

  public getConferencesOfYearAndTopic(year: Date, topic: string) : Observable<Conference[]>{
    let subscription = this.http.get(environment.apiBaseUrl + '/conferences/' + year.getUTCFullYear());
    if (topic && topic.trim() !== '') {
      subscription = this.http.get(environment.apiBaseUrl + '/conferences/' + year.getUTCFullYear() + '?topic=' + encodeURIComponent(topic));
    }
    return subscription.pipe(
      map((confs: any) => confs.conferences.map(conf => new Conference(conf))),
    )
  }
}
