import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConferencesService {

  constructor(private http: HttpClient) { }

  public getConferencesOfYearAndTopic(year: Date, topic: string) {
    if (topic && topic.trim() !== '') {
      return this.http.get(environment.apiBaseUrl + '/conferences/' + year.getUTCFullYear() + '?topic=' + encodeURIComponent(topic));
    }
    return this.http.get(environment.apiBaseUrl + '/conferences/' + year.getUTCFullYear());
  }
}
