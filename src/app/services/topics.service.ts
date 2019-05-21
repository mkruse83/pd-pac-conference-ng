import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import Talk from '../entities/talk';
import { Observable } from 'rxjs';


const compare = (a, b) => {
  if (a[0] > b[0]) {
    return 1;
  }
  if (b[0] > a[0]) {
    return -1;
  }
  return 0;
};

@Injectable({
  providedIn: 'root'
})
export class TopicsService {

  constructor(private http: HttpClient) { }

  public getTopics(yearAndMonth: string): Observable<string[][]> {
    return this.http.get(environment.apiBaseUrl + '/topics/' + yearAndMonth).pipe(
      map((response: any) => Object.keys(response.topics).map(key => [key, response.topics[key]])),
      map((topics: string[][]) => topics.sort(compare))
    );
  }

  public getTalksToTopic(yearAndMonth: string, topic: string): Observable<Talk[]> {
    return this.http.get(environment.apiBaseUrl + '/topics/' + yearAndMonth + '/topic/' + topic).pipe(
      map((data: any) => data.talks.map((talk: any) => new Talk(talk)))
    );
  }
}
