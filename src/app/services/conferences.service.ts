import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConferencesService {

  constructor(private http: HttpClient) { }

  public getConferences() {
    return this.http.get(environment.apiBaseUrl + '/conferences')
  }
}
