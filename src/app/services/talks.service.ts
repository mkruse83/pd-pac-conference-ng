import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, filter, flatMap, distinct, toArray } from 'rxjs/operators';
import { Observable } from 'rxjs';
import Talk from '../entities/talk';
import Room from '../entities/room';

@Injectable({
  providedIn: 'root'
})
export class TalksService {

  constructor(private http: HttpClient) { }

  private getTalksForConference(conferenceId: string): Observable<Talk[]> {
    const uuid = conferenceId.split('|')[0];
    const sortkey = conferenceId.split('|')[1];
    return this.http.get(environment.apiBaseUrl + '/conference/' + uuid + '/' + escape(sortkey) + '/talks').pipe(
      map((obj: any) => {
        const talks = obj.talks;
        return talks.map(talk => new Talk(talk))
      })
    );
  }

  public getRoomsForConference(conferenceId: string): Observable<Room[]> {
    return this.getTalksForConference(conferenceId).pipe(
      map((talks: Talk[]) => {
        const rooms = {};
        talks.map(talk => talk.room).forEach(room => rooms[room.nameInLocation] = room);
        return <Room[]>Object.values(rooms);
      })
    )
  }

  public getDatesForRoom(conferenceId: string, roomId: string): Observable<Date[]> {
    return this.getTalksForConference(conferenceId).pipe(
      flatMap(talks => talks),
      filter((talk: Talk) => talk.room.nameInLocation === roomId),
      map(talk => new Date(talk.from.getFullYear(), talk.from.getMonth(), talk.from.getDate(), 0, 0, 0)),
      distinct((date: Date) => date.getTime()),
      toArray(),
    )
  }

  public getFlyerForRoomAndDate(conferenceId: string, roomId: string, date: Date): Observable<Talk[]> {
    return this.getTalksForConference(conferenceId).pipe(
      flatMap(talks => talks),
      filter((talk: Talk) => talk.room.nameInLocation === roomId &&
        new Date(talk.from.getFullYear(), talk.from.getMonth(), talk.from.getDate(), 0, 0, 0).getTime() === date.getTime()),
      toArray()
    );
  }

  public getTalks(year: Date) {
    return this.http.get(environment.apiBaseUrl + '/talks/' + year.getFullYear() + '/' + year.getMonth());
  }
}
