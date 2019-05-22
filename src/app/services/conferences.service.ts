import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Conference } from '../entities/conference';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConferencesService {

  constructor(private http: HttpClient) { }

  public getConferencesOfYear(year: Date) : Observable<Conference[]>{
    return this.http.get(environment.apiBaseUrl + '/conferences/' + year.getUTCFullYear()).pipe(
      map((confs: any) => confs.conferences.map(conf => new Conference(conf))),
    );
  }
}
