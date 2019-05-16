import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) { }

  public getRoomsForConference(conferenceId: string) {
    const uuid = conferenceId.split('|')[0];
    const sortkey = conferenceId.split('|')[1];
    return this.http.get(environment.apiBaseUrl + '/conference/' + uuid + '/' + escape(sortkey) + '/rooms');
  }
}
