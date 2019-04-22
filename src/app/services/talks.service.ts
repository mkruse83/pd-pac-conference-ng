import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TalksService {

  constructor(private http: HttpClient) { }
  
  public getTalks(year: Date) {
    return this.http.get(environment.apiBaseUrl + '/talks/' + year.getFullYear() + '/' + year.getMonth());
  }
}
