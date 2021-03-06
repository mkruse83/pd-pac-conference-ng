import {Component, OnInit} from '@angular/core';
import {ConferencesService} from 'src/app/services/conferences.service';
import {YearsService} from 'src/app/services/years.service';
import { Conference } from 'src/app/entities/conference';

@Component({
  selector: 'app-claim-list',
  templateUrl: './conferences.component.html',
  styleUrls: ['./conferences.component.css']
})
export class ConferencesComponent implements OnInit {

  year: Date;
  years: Date[];
  conferences: Conference[];

  constructor(
    private conferenceService: ConferencesService,
    private yearsService: YearsService,
  ) {
  }

  ngOnInit() {
    this.years = [];
    this.yearsService.getYears().subscribe((year) => {
      this.years.push(year);
    });
  }

  formatDate(date: Date) {
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDay();

  }

  loadConferences() {
    this.conferenceService.getConferencesOfYear(this.year).subscribe((result: Conference[]) => {
      this.conferences = result;
    });
  }
}
