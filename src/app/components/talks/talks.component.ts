import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { YearsService } from 'src/app/services/years.service';
import { TalksService } from 'src/app/services/talks.service';
import MonthDisplay from '../../entities/monthDisplay';

@Component({
  selector: 'app-talks',
  templateUrl: './talks.component.html',
  styleUrls: ['./talks.component.css']
})
export class TalksComponent implements OnInit {

  year: Date;
  years: Date[];
  month: number;
  months: MonthDisplay[];
  talks: Talks;

  constructor(
    private talksService: TalksService,
    private yearsService: YearsService,
  ) { }

  ngOnInit() {
    this.years = [];
    this.yearsService.getYears().subscribe((year) => {
      this.years.push(year);
    })
    this.months = [];
    for (let i = 0; i <= 11; i++) {
      const date = new Date();
      date.setMonth(i);
      const mom = moment(date);
      this.months.push(new MonthDisplay(i, mom.format('MMMM')));
    }
  }

  loadTalks(event: Event) {
    const date = new Date(this.year);
    date.setMonth(this.month);
    this.talksService.getTalks(date).subscribe((result: Talks) => {
      this.talks = result;
    })
  }
}
