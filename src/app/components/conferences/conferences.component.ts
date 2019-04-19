import {Component, OnInit} from '@angular/core';
import { ConferencesService } from 'src/app/services/conferences.service';

@Component({
  selector: 'app-claim-list',
  templateUrl: './conferences.component.html',
  styleUrls: ['./conferences.component.css']
})
export class ConferenceComponent implements OnInit {

  year: Date;
  years: Date[];
  conferences: Conferences;

  constructor(private conferenceService: ConferencesService) {}

  ngOnInit() {
    // this.conferenceService.getAll().subscribe(res => {
    //   this.claims = res;
    // })
    this.years = [];
    this.years.push(new Date(Date.UTC(2020, 0, 1, 0, 0, 0, 0)));
    this.years.push(new Date(Date.UTC(2019, 0, 1, 0, 0, 0, 0)));
    this.years.push(new Date(Date.UTC(2018, 0, 1, 0, 0, 0, 0)));
    this.years.push(new Date(Date.UTC(2017, 0, 1, 0, 0, 0, 0)));
  }

  loadConferences(event: Event) {
    this.conferenceService.getConferencesOfYear(this.year).subscribe((result: Conferences) => {
      this.conferences = result;
    })
  }
}

class Conferences {
  conferences: Conference[];
}

class Conference {
  id: String;
  name: String;
  from: Date;
  to: Date;
  topics: String[];
}
