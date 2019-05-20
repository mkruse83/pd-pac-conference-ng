import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TalksService } from 'src/app/services/talks.service';
import Talk from 'src/app/entities/talk';
import Room from 'src/app/entities/room';
import { AuthService } from 'src/app/services/auth.service';
import Slot from 'src/app/entities/slot';
import Speaker from 'src/app/entities/speaker';
import { CacheService } from 'src/app/services/cache.service';

@Component({
  selector: 'app-flyer',
  templateUrl: './flyer.component.html',
  styleUrls: ['./flyer.component.css']
})
export class FlyerComponent implements OnInit {

  rooms: Room[];
  talks: (Talk | Slot)[];
  dates: Date[];
  conferenceId: string;
  currentRoom: string;
  loggedIn: boolean;
  bookingTalk: Talk;

  constructor(private route: ActivatedRoute, private authService: AuthService, private talksService: TalksService, private cacheService: CacheService) { }

  ngOnInit() {
    this.conferenceId = this.route.snapshot.params['conferenceId'];
    this.loadRooms();
    this.authService.loggedIn.subscribe((loggedIn) => {
      this.loggedIn = loggedIn;
    });
  }

  loadRooms() {
    this.talksService.getRoomsForConference(this.conferenceId).subscribe((result: Room[]) => {
      this.rooms = result;
    });
  }

  getDates(event: Event, roomId: string) {
    this.talks = null;
    this.talksService.getDatesForRoom(this.conferenceId, roomId).subscribe((result: Date[]) => {
      this.currentRoom = roomId;
      this.dates = result;
    });
  }

  getFlyer(event: Event, date: Date) {
    this.talksService.getFlyerForRoomAndDate(this.conferenceId, this.currentRoom, date).subscribe((result: (Talk | Slot)[]) => {
      this.talks = result;
    })
  }

  bookSlot(event: Event, talk: Talk) {
    this.bookingTalk = new Talk({
      ...talk,
      speaker: new Speaker({})
    });
  }

  confirmBooking(event: Event) {
    const topics = this.bookingTalk.topics as any;
    this.talksService.confirmBooking(this.conferenceId, new Talk({
      ...this.bookingTalk,
      topics: topics.split(' ')
    })).subscribe((result: any) => {
      this.talks = null;
      this.bookingTalk = null;
      this.cacheService.clearCache(this.talksService.getUrl(this.conferenceId)).then(() => {
        this.loadRooms();
      })
    });
  }

}
