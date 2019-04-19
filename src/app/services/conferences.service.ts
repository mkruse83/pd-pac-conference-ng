import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConferencesService {

  constructor(private http: HttpClient) { }

  public getConferencesOfYear(year: Date) {
    return this.http.get(environment.apiBaseUrl + '/conferences/' + year.getUTCFullYear())
  }
}
