import { Component, OnInit } from '@angular/core';
import { ConferencesService } from 'src/app/services/conferences.service';
import { YearsService } from 'src/app/services/years.service';

@Component({
  selector: 'app-claim-list',
  templateUrl: './conferences.component.html',
  styleUrls: ['./conferences.component.css']
})
export class ConferencesComponent implements OnInit {

  year: Date;
  years: Date[];
  conferences: Conferences;

  constructor(
    private conferenceService: ConferencesService,
    private yearsService: YearsService,
  ) { }

  ngOnInit() {
    this.yearsService.getYears().subscribe((year) => {
      this.years.push(year);
    })
  }

  loadConferences(event: Event) {
    this.conferenceService.getConferencesOfYear(this.year).subscribe((result: Conferences) => {
      this.conferences = result;
    })
  }
}
