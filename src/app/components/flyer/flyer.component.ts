import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlyerService } from 'src/app/services/flyer.service';
import { RoomService } from 'src/app/services/room.service';
import { TalksService } from 'src/app/services/talks.service';
import Talk from 'src/app/entities/talk';
import Room from 'src/app/entities/room';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-flyer',
  templateUrl: './flyer.component.html',
  styleUrls: ['./flyer.component.css']
})
export class FlyerComponent implements OnInit {

  rooms: Room[];
  talks: Talk[];
  dates: Date[];
  conferenceId: string;
  currentRoom: string;

  constructor(private updates: SwUpdate, private route: ActivatedRoute, private flyerService: FlyerService, private roomService: RoomService,  private talksService: TalksService) { }

  ngOnInit() {
    this.conferenceId = this.route.snapshot.params['conferenceId'];
    console.log("INFO: conference id ", this.conferenceId);
    this.loadRooms();
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
    this.talksService.getFlyerForRoomAndDate(this.conferenceId, this.currentRoom, date).subscribe((result: Talk[]) => {
      this.talks = result;
    })
  }

}
