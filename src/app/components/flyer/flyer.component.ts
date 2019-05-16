import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlyerService } from 'src/app/services/flyer.service';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-flyer',
  templateUrl: './flyer.component.html',
  styleUrls: ['./flyer.component.css']
})
export class FlyerComponent implements OnInit {

  rooms: Room[];
  talks: Talk[];
  conferenceId: string;

  constructor(private route: ActivatedRoute, private flyerService: FlyerService, private roomService: RoomService) { }

  ngOnInit() {
    this.conferenceId = this.route.snapshot.params['conferenceId'];
    console.log("INFO: conference id ", this.conferenceId);
    this.loadRooms();
  }

  loadRooms() {
    this.roomService.getRoomsForConference(this.conferenceId).subscribe((result: Room[]) => {
      this.rooms = result;
    });;
  }

  getFlyer(even: Event, nameInLocation: string) {
    this.flyerService.getFlyerForConference(this.conferenceId, nameInLocation).subscribe((result: Talk[]) => {
      this.talks = result;
    })
  }

}
