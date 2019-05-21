import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, filter, flatMap, distinct, toArray } from 'rxjs/operators';
import { Observable } from 'rxjs';
import Talk from '../entities/talk';
import Room from '../entities/room';
import Slot from '../entities/slot';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TalksService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  public getTalksUrl(conferenceId: string): string {
    const partkey = conferenceId.split('|')[0];
    const sortkey = conferenceId.split('|')[1];
    return environment.apiBaseUrl + '/conference/' + escape(partkey) + '/' + escape(sortkey) + '/talks';
  }

  public getTalkUrl(conferenceId: string): string {
    const partkey = conferenceId.split('|')[0];
    const sortkey = conferenceId.split('|')[1];
    return environment.apiBaseUrl + '/admin/conference/' + escape(partkey) + '/' + escape(sortkey) + '/talk';
  }

  private getTalksForConference(conferenceId: string): Observable<(Talk | Slot)[]> {
    return this.http.get(this.getTalksUrl(conferenceId)).pipe(
      map((obj: any) => {
        const talks = obj.talks;
        return talks.map(talk => {
          if (talk.speaker && talk.name && talk.topics) {
            return new Talk(talk);
          } else {
            return new Slot(talk);
          }
        })
      })
    );
  }

  public getRoomsForConference(conferenceId: string): Observable<Room[]> {
    return this.getTalksForConference(conferenceId).pipe(
      map((talks: (Talk | Slot)[]) => {
        const rooms = {};
        talks.map(talk => talk.room).forEach(room => rooms[room.nameInLocation] = room);
        return <Room[]>Object.values(rooms);
      })
    )
  }

  public getDatesForRoom(conferenceId: string, roomId: string): Observable<Date[]> {
    return this.getTalksForConference(conferenceId).pipe(
      flatMap(talks => talks),
      filter((talk: (Talk | Slot)) => talk.room.nameInLocation === roomId),
      map(talk => new Date(talk.from.getFullYear(), talk.from.getMonth(), talk.from.getDate(), 0, 0, 0)),
      distinct((date: Date) => date.getTime()),
      toArray(),
    )
  }

  public getFlyerForRoomAndDate(conferenceId: string, roomId: string, date: Date): Observable<(Talk | Slot)[]> {
    return this.getTalksForConference(conferenceId).pipe(
      flatMap(talks => talks),
      filter((talk: (Talk | Slot)) => talk.room.nameInLocation === roomId &&
        new Date(talk.from.getFullYear(), talk.from.getMonth(), talk.from.getDate(), 0, 0, 0).getTime() === date.getTime()),
      toArray()
    );
  }

  public getTalks(year: Date) {
    return this.http.get(environment.apiBaseUrl + '/talks/' + year.getFullYear() + '/' + year.getMonth());
  }

  public confirmBooking(conferenceId: string, talk: Talk) {
    if (!this.auth.token) {
      throw new Error("cannot invoke without auth");
    }

    const options = {
      headers: {
        'X-Auth': this.auth.token
      }
    };

    const body = {
      ...talk
    };
    delete body.id;
    return this.http.post(this.getTalkUrl(conferenceId), body, options);
  }

  public deleteTalk(conferenceId: string, talk: Talk) {
    const options = {
      headers: {
        'X-Auth': this.auth.token
      },
      body: talk
    };
    return this.http.delete(this.getTalkUrl(conferenceId), options);
  }
}
