import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TalksService } from 'src/app/services/talks.service';
import Talk from 'src/app/entities/talk';
import Room from 'src/app/entities/room';
import { AuthService } from 'src/app/services/auth.service';
import Slot from 'src/app/entities/slot';
import Speaker from 'src/app/entities/speaker';
import { CacheService } from 'src/app/services/cache.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import Favorites from 'src/app/entities/favorites';

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
  favorites: Favorites;

  activeRoomId: string;
  activeDate: Date;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private talksService: TalksService,
    private cacheService: CacheService,
    private favoritesService: FavoritesService,
  ) { }

  ngOnInit() {
    this.conferenceId = this.route.snapshot.params['conferenceId'];
    this.loadRooms();
    this.authService.loggedIn.subscribe((loggedIn) => {
      this.loggedIn = loggedIn;
      this.loadFavorites();
    });
  }

  loadRooms() {
    this.talksService.getRoomsForConference(this.conferenceId).subscribe((result: Room[]) => {
      this.rooms = result;
    });
  }

  loadFavorites() {
    if (this.loggedIn) {
      this.favoritesService.getFavorites().subscribe((result: Favorites) => {
        this.favorites = result;
      });
    } else {
      this.favorites = new Favorites([]);
    }
  }

  getDates(event: Event, roomId: string) {
    this.talks = null;
    this.talksService.getDatesForRoom(this.conferenceId, roomId).subscribe((result: Date[]) => {
      this.activeRoomId = roomId;
      this.currentRoom = roomId;
      this.dates = result;
    });
  }

  getFlyer(event: Event, date: Date) {
    this.talksService.getFlyerForRoomAndDate(this.conferenceId, this.currentRoom, date).subscribe((result: (Talk | Slot)[]) => {
      this.activeDate = date;
      this.talks = result;
    })
  }

  bookSlot(event: Event, talk: Talk) {
    this.bookingTalk = new Talk({
      ...talk,
      speaker: new Speaker({})
    });
  }

  confirmBooking() {
    const topics = this.bookingTalk.topics as any;
    this.talksService.addTalkToConferce(this.conferenceId, new Talk({
      ...this.bookingTalk,
      topics: topics.split(' ')
    })).subscribe(() => {
      this.talks = null;
      this.bookingTalk = null;
      this.cacheService.clearCache(this.talksService.getTalksUrl(this.conferenceId)).then(() => {
        this.loadRooms();
      })
    });
  }

  deleteTalk(event: Event, talk: Talk) {
    this.talksService.deleteTalk(this.conferenceId, talk).subscribe(() => {
      this.talks = null;
      this.cacheService.clearCache(this.talksService.getTalksUrl(this.conferenceId)).then(() => {
        this.loadRooms();
      })
    });
  }

  toggleFavoriteTalk(event: Event, talk: Talk) {
    this.favoritesService.toggleFavoriteTalk(this.conferenceId, talk).subscribe(() => {
      this.talks = null;
      this.cacheService.clearCache(this.favoritesService.getFavoritesUrl()).then(() => {
        this.loadFavorites();
      })
    });
  }

  isFavorite(talk: Talk) {
    return this.favorites.isFavorite(this.conferenceId, talk)
  }
}
