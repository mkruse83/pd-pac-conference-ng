import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FlyerService {

  constructor(private http: HttpClient) { }

  public getFlyerForConference(conferenceId: string, roomId : string) {
    const uuid = conferenceId.split('|')[0];
    const sortkey = conferenceId.split('|')[1];
    return this.http.get(environment.apiBaseUrl + '/conference/' + uuid + '/' + escape(sortkey) + '/room/' + escape(roomId) + '/flyer');
  }
}
